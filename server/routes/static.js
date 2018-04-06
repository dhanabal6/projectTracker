const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config.js');

const User = require('../model/User');

const projectData = [
  {
    _id: '5a322d56b393fa87c241a741',
    name: 'KnowyourEnglish',
    description:
      'In nostrud nostrud amet elit minim consectetur officia mollit nulla do anim officia occaecat. Consequat laborum velit mollit eu in et cillum ipsum voluptate nulla officia amet esse. Fugiat reprehenderit est labore duis aliquip qui laboris eiusmod sit id aliqua pariatur dolor esse. In voluptate laborum enim tempor sit aliquip laboris do officia.\r\n',
    userList: ['Marie Huff', 'Phelps Tillman', 'Emilia Koch'],
    totalPoints: 50,
    completedPoints: 20
  },
  {
    _id: '5a322d56f78ed219e42398de',
    name: 'Elearning Course',
    description:
      'Ad do Lorem tempor adipisicing id consectetur exercitation labore. Elit sit cillum irure ex. Eiusmod elit ullamco voluptate tempor est velit aute.\r\n',
    userList: ['Key Tran', 'Concepcion Landry', 'Hurley Collins'],
    totalPoints: 40,
    completedPoints: 15
  }
];

const peopleData = [
  {
    _id: '5a32335b7b8333babf130285',
    name: 'Tiffany Dawson',
    emailId: 'tiffanydawson@golistic.com',
    designation: 'Tester',
    profileImage: 'http://placehold.it/32x32',
    skillSet: ['ut', 'ullamco', 'irure', 'deserunt']
  },
  {
    _id: '5a32335b7010ae90d54a2f16',
    name: 'Lowery Barrett',
    emailId: 'lowerybarrett@golistic.com',
    designation: 'BackEnd Developer',
    profileImage: 'http://placehold.it/32x32',
    skillSet: ['mollit', 'veniam']
  },
  {
    _id: '5a32335b4b255aaab3cdbe54',
    name: 'Espinoza Robertson',
    emailId: 'espinozarobertson@golistic.com',
    designation: 'UIDesigner',
    profileImage: 'http://placehold.it/32x32',
    skillSet: ['fugiat', 'aliquip', 'velit']
  }
];

const taskData = [
  {
    _id: '5a322d56adfce18e47a51140',
    projectId: '5a322d56b393fa87c241a741',
    name: 'Check and Fix Bug',
    description:
      'Commodo cupidatat minim aliqua ad labore labore. Amet aute exercitation ex nulla ad. Nisi velit officia nulla aliqua veniam. Laborum dolore consequat magna voluptate anim labore mollit exercitation eu id minim non nulla. Non culpa incididunt nostrud veniam fugiat sint elit et quis nostrud sint cupidatat eu.\r\n',
    points: 8,
    status: 'active',
    assignedTo: 'dhanab'
  },
  {
    _id: '5a322d5642d4c67f96a9fb99',
    projectId: '5a322d56f78ed219e42398de',
    name: 'Css Updates',
    description:
      'Ea ex exercitation voluptate laboris consequat. Excepteur esse pariatur sit do in sunt non eiusmod deserunt voluptate reprehenderit aliqua. Laboris irure non ipsum ea. Et esse in ipsum ea commodo incididunt incididunt voluptate minim aute cillum laboris.\r\n',
    points: 1,
    status: 'progess',
    assignedTo: 'dhanaball'
  }
];

const timesheetData = [
  {
    _id: '5a32335b4b255aaab3cdbe54',
    projectName: 'sampleProject',
    taskName: 'sampleTask',
    spendTime: 20,
    taskCompletion: 20
  },
  {
    _id: '5a32335b7b8333babf130285',
    projectName: 'sampleProject1',
    taskName: 'sampleTask1',
    spendTime: 40,
    taskCompletion: 30
  }
];

const reportData = [
  {
    projectName: 'sampleProject',
    taskCount: 20,
    completeTaskCount: 10,
    pointsCount: 10,
    completePointsCount: 5,
    status: '50%'
  },
  {
    projectName: 'sampleProject1',
    taskCount: 20,
    completeTaskCount: 18,
    pointsCount: 20,
    completePointsCount: 18,
    status: '80%'
  }
];

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send({ _id: 'guest' });
  } else {
    next();
    return;
  }
};

router.get('/api', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

router.get('/api/register', (req, res) => {
  res.send({ reg: 'data' });
});

router.post('/api/register', (req, res, next) => {
  console.log('register...');
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  const user = new User({
     name: req.body.name,
     emailId: req.body.emailId,
     password: req.body.password
   });
  user.save((error) => {
    req.logIn(user, (error) => {
      res.send(user);
    });
  });
});

router.post('/api/login', (req, res, next) => {
  console.log('logging in...');
  const users = User(req.body);
  const err = users.joiValidate(req.body);
  if (err) throw err;
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send('Not a User');
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send(user);
    });
  })(req, res, next);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (!err) {
      res
        .status(200)
        .clearCookie('connect.sid', { path: '/' })
        .json({ status: 'Success' });
    } else {
      res.send(err);
    }
  });
});

router.get('/api/projects', (req, res) => {
  res.send(projectData);
});

router.post('/api/projects', (req, res) => {
  const project = new Project(req.body);
  const err = project.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.get('/api/people', (req, res) => {
  res.send(peopleData);
});

router.post('/api/people', (req, res) => {
  const people = new People(req.body);
  const err = people.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.get('/api/timesheet', (req, res) => {
  res.send(timesheetData);
});

router.post('/api/timesheet', (req, res) => {
  const timesheet = new Timesheet(req.body);
  const err = timesheet.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.get('/api/reports', (req, res) => {
  res.send(reportData);
});

router.get('/api/:projectId', (req, res) => {
  res.send(taskData);
});

router.post('/api/:projectId', (req, res) => {
  const tasks = new Task(req.body);
  const err = tasks.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.post('/api/projects/:projectId', (req, res) => {
  const projects = Project(req.body);
  const err = projects.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.post('/api/people/:peopleId', (req, res) => {
  const people = People(req.body);
  const err = people.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.post('/api/timesheet/:timesheetId', (req, res) => {
  const timesheet = Timesheet(req.body);
  const err = timesheet.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

router.post('/api/:projectId/:taskId', (req, res) => {
  const tasks = Task(req.body);
  const err = tasks.joiValidate(req.body);
  if (err) throw err;
  res.send({ data: 'sending' });
});

module.exports = router;
