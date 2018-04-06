const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const taskSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project'
    },
    name: String,
    description: String,
    points: Number,
    status: String,
    assignedTo: String,
    timeLog: [{
     userId:{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    spendTime: {
      type: Number,
      ref: 'Timesheet'
    },
    date: {
     type: String,
     ref: 'Timesheet'
    }
    }
    ]
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.methods.joiValidate = (obj) => {
  const schema = {
    name: Joi.string().min(6).max(30).required(),
    projectId: Joi.string(),
    description: Joi.string().min(6).max(3000),
    points: Joi.number(),
    status: Joi.string(),
    assignedTo: Joi.string()
  };
  const { error, value } = Joi.validate(obj, schema);
  return error;
};

module.exports = mongoose.model('Task', taskSchema);