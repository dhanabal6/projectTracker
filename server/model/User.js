const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  name: String,
  emailId: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
},
{ timestamps: true }
);

userSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.joiValidate = (obj) => {
  const schema = {
    name: Joi.string().min(6).max(30),
    emailId: Joi.string().email().required(),
    password: Joi.string()
  };
  const { error, value } = Joi.validate(obj, schema);
  return error;
};

module.exports = mongoose.model('User', userSchema);