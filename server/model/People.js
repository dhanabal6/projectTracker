const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const peopleSchema = new Schema({
  name: String,
  emailId: String,
  designation: String,
  profileImage: String,
  skillSet: [String]
},
{ timestamps: true }
);

peopleSchema.methods.joiValidate = (obj) => {
  const schema = {
    name: Joi.string().min(6).max(30).required(),
    emailId: Joi.string().email().required(),
    designation: Joi.string(),
    profileImage: Joi.any(),
    skillSet: Joi.array().items(Joi.string())
  };
  const { error, value } = Joi.validate(obj, schema);
  return error;
};

module.exports = mongoose.model('People', peopleSchema);