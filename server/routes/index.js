const express = require("express");
const router = express.Router();
const passport = require("passport");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Project = require("../model/Project");
const Task = require("../model/Task");
const People = require("../model/People");
const Timesheet = require("../model/Timesheet");
const User = require("../model/User");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send({ _id: "guest" });
  } else {
    next();
    return;
  }
};

router.get("/api/dummycall", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER,Content-Type,Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.send();
});

router.get("/api/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/api", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

router.get("/api/register", (req, res) => {
  res.send({ reg: "data" });
});

router.post("/api/register", (req, res, next) => {
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  const user = new User({
    name: req.body.name,
    emailId: req.body.emailId,
    password: req.body.password
  });
  user.save(error => {
    req.logIn(user, error => {
      res.send(user);
    });
  });
});

router.post("/api/login", (req, res, next) => {
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send({error: "Incorrect UserName and Password"});
    }
    req.logIn(user, err => {
      if (err) return next(err);
      return res.send(user);
    });
  })(req, res, next);
});

router.get("/api/logout", (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (!err) {
      res.send({ message: "Logout SuccessFully" });
      // res
      //   .status(200)
      //   .clearCookie("connect.sid", { path: "/" })
      //   .json({ status: "Success" });
    } else {
      res.send(err);
    }
  });
});

router.get("/api/forgotPassword", (req, res) => {
  res.send({
    user: req.user
  });
});

router.post("/api/forgotPassword", (req, res, next) => {
  async.waterfall(
    [
      done => {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString("hex");
          done(err, token);
        });
      },
      (token, done) => {
        User.findOne({ emailId: req.body.emailId }, (err, user) => {
          if (!user) {
            return res.send({error:"No account with that email address exists."});
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save(error => {
            done(error, token, user);
          });
        });
      },
      (token, user, done) => {
        const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "dhanabal.kurinjie@gmail.com",
            pass: "dhana11503198"
          }
        });
        const mailOptions = {
          to: user.emailId,
          from: "jaffersathick306@gmail.com",
          subject: "Project Tracker Password Reset",
          text:
            "Hi " +
            user.name +
            ",\n" +
            "You are receiving this because you (or someone else) have requested the reset of the password for your Project Tracker account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/resetPassword/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
            "Thanks, " +
            "\n" +
            "Project Tracker"
        };
        smtpTransport.sendMail(mailOptions, err => {
          res.send({message: "Send Link in Your Mail Address Please Check Your Mail"});
          done(err);
        });
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
});

router.get("/api/resetPassword/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    (err, user) => {
      if (!user) {
        console.log("Password reset token is invalid or has expired.");
        return res.send({error:"user already exists"});
      }
      res.send({
        user: req.user
      });
    }
  );
});

router.post("/api/resetPassword/:token", (req, res) => {
  async.waterfall(
    [
      done => {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          (err, user) => {
            if (!user) {
              return res.send(
                {error:"Password reset token is invalid or has expired."}
              );
            }
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(e => {
              req.logIn(user, error => {
                done(error, user);
              });
            });
          }
        );
      },
      (user, done) => {
        const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "dhanabal.kurinjie@gmail.com",
            pass: "dhana11503198"
          }
        });
        const mailOptions = {
          to: user.emailId,
          from: "jaffersathick306@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello " +
            user.name +
            ",\n\n" +
            "This is a confirmation that the password for your Project Tracker account " +
            user.emailId +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, err => {
          done(err);
          res.send({message:"Success! Your password has been changed."});
        });
      }
    ],
    (err, next) => {
      if (err) return next(err);
    }
  );
});

router.post("/api/projects", isLoggedIn, (req, res) => {
  req.body.userId = req.user._id;
  const project = new Project(req.body);
  const err = project.joiValidate(req.body);
  if (err) throw err;
  project.save((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

router.get("/api/projects", isLoggedIn, async (req, res) => {
  const allProjects = await Project.getProjects(req.user._id);
  res.send(allProjects);
});

router.post("/api/projects/:projectId", isLoggedIn, (req, res) => {
  const projects = Project(req.body);
  const err = projects.joiValidate(req.body);
  if (err) throw err;
  Project.findOneAndUpdate(
    { _id: req.params.projectId },
    req.body,
    { upsert: true, new: true, runValidators: true },
    (error, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ projectUpdateData: data });
      }
    }
  );
});

router.get("/api/people", (req, res) => {
  People.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/api/people", (req, res) => {
  const people = new People(req.body);
  const err = people.joiValidate(req.body);
  if (err) throw err;
  people.save((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

router.post("/api/people/:peopleId", (req, res) => {
  const people = People(req.body);
  const err = people.joiValidate(req.body);
  if (err) throw err;
  People.findOneAndUpdate(
    { _id: req.params.peopleId },
    req.body,
    { upsert: true, new: true, runValidators: true },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

router.get("/api/timesheet", isLoggedIn, async (req, res) => {
  const date = req.query.date;
  await Timesheet.find(
    { _id: req.user._id, [`timesheet.${date}`]: { $exists: true } },
    { [`timesheet.${date}`]: 1 },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.post("/api/timesheet", isLoggedIn, async (req, res) => {
  req.body._id = req.user._id;
  const userid = req.user._id;
  const userDate = Object.keys(req.body.timesheet);
  /*body date*/
  let bodyDate;
  userDate.forEach(each => {
    bodyDate = each;
  });
  await Timesheet.findOne({ _id: userid }, (err, doc) => {
    if (err) return res.send(err);
    if (!doc) {
      const timesheet = new Timesheet(req.body);
      timesheet.save((error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    } else if (doc) {
      const docData = doc.timesheet;
      let dataKeys = docData
        .map(o => {
          return Object.keys(o);
        })
        .reduce((prev, curr) => {
          return prev.concat(curr);
        })
        .filter((col, i, arr) => {
          return arr.indexOf(col) == i;
        });
      const docDate = dataKeys.find(val => {
        return val == bodyDate;
      });
      if (docDate != bodyDate) {
        const bodyData = req.body.timesheet;
        Timesheet.update(
          { _id: doc._id },
          {
            $push: {
              timesheet: bodyData
            }
          }
        ).exec((error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        });
      } else {
        const bodyOrgData = req.body.timesheet[bodyDate];
        let values = docData.find(val => {
          return val[docDate];
        });
        const bodyfindData = values[docDate];
        const dataKey = `timesheet.${docDate}`;
        const queryKey = `timesheet.$.${docDate}`;
        Timesheet.update(
          { _id: doc._id, [dataKey]: bodyfindData },
          {
            $push: { [queryKey]: { $each: bodyOrgData } }
          }
        ).exec((error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        });
      }
    }
  });
});

router.get("/api/projectData", isLoggedIn, async (req, res) => {
  const allTimesheet = await Project.getTimesheet(req.user._id).exec(
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.post(
  "/api/timesheet/:timesheetIndex/:timesheetId",
  isLoggedIn,
  async (req, res) => {
    const dataTimesheet = req.body.timesheet;
    let date;
    Object.keys(dataTimesheet).map((val, index) => {
      date = val;
    });
    let data;
    dataTimesheet[date].map(value => {
      data = value;
    });
    const randomStr = Math.random()
      .toString(36)
      .slice(-8);
    const timesheetIndex = req.params.timesheetIndex;
    const timesheetId = req.params.timesheetId;
    await Timesheet.update(
      {
        _id: req.user._id,
        [`timesheet.${date}.timesheetId`]: timesheetId
      },
      {
        $set: {
          [`timesheet.$.${date}.${timesheetIndex}.timesheetId`]: randomStr,
          [`timesheet.$.${date}.${timesheetIndex}.projectName`]: data.projectName,
          [`timesheet.$.${date}.${timesheetIndex}.taskName`]: data.taskName,
          [`timesheet.$.${date}.${timesheetIndex}.spendTime`]: data.spendTime,
          [`timesheet.$.${date}.${timesheetIndex}.taskCompletion`]: data.taskCompletion
        }
      },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      }
    );
  }
);

router.get("/api/reports", isLoggedIn, async (req, res) => {
  const allProjects = await Project.getReports(req.user._id);
  res.send(allProjects);
});

router.get("/api/:projectId", (req, res) => {
  Task.find({ projectId: req.params.projectId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/api/:projectId", isLoggedIn, (req, res) => {
  const task = new Task({
    projectId: req.params.projectId,
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    status: req.body.status,
    assignedTo: req.body.assignedTo
  });
  const err = task.joiValidate(req.body);
  if (err) throw err;
  task.save((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send({ taskData: data });
    }
  });
});

router.post("/api/task/:taskName", isLoggedIn, (req, res) => {
  const taskname = req.params.taskName;
  const spendtime = req.body.spendTime;
  const taskcompletion = req.body.taskCompletion;
  const date = req.body.date;
  if (req.body.formId == "new") {
    Task.update(
      { name: taskname },
      {
        $push: {
          timeLog: {
            userId: req.user._id,
            spendTime: spendtime,
            taskCompletion: taskcompletion,
            date: date
          }
        }
      },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          console.log(data);
          // res.send(data);
        }
      }
    );
  } else {
    Task.update(
      { name: taskname, "timeLog.date": date },
      {
        $set: {
          "timeLog.$.spendTime": spendtime,
          "timeLog.$.taskCompletion": taskcompletion,
          "timeLog.$.date": date
        }
      },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          console.log(data);
          // res.send(data);
        }
      }
    );
  }
});

router.post("/api/:projectId/:taskId", isLoggedIn, (req, res) => {
  const tasks = Task(req.body);
  const err = tasks.joiValidate(req.body);
  if (err) throw err;
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { upsert: true, new: true, runValidators: true },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send({ taskUpdateData: data });
      }
    }
  );
});

module.exports = router;
