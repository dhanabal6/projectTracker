const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const router = require("./routes/index");
const staticRouter = require("./routes/static");

const isRouter = true;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (isRouter == true) {
  app.use("/", router);
} else {
  app.use("/", staticRouter);
}

const User = require("./model/User");
passport.use(
  new LocalStrategy(
    {
      usernameField: "emailId",
      passwordField: "password"
    },
    (emailId, password, done) => {
      User.findOne({ emailId: emailId }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect emailId." });
        user.comparePassword(password, (err, isMatch) => {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.set("port", process.env.PORT || 3001);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
