const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const projectSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    name: String,
    description: String,
    totalPoints: Number,
    completedPoints: Number,
    userList: [String]
  },
  { timestamps: true }
);

projectSchema.statics.getProjects = function(userId){
  return this.aggregate([
    { $match: {
            userId: userId
        }},
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'projectId',
        as: 'data'
      }
    },
    {
      $project: {
        name: '$$ROOT.name',
        description:'$$ROOT.description',
        userList: '$$ROOT.userList',
        tasks: '$data',
      }
    }
  ]);
};

projectSchema.statics.getReports = function(userId){
  return this.aggregate([
    { $match: {
            userId: userId
        }},
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'projectId',
        as: 'tasks'
      }
    },
    // {$unwind: '$tasks'},
    // {$group :{
    //  "_id":'$_id',
    //  "pointsCount": {$sum: '$tasks.points'}
    // }},

    // {$unwind: '$tasks'},
    //     {$group: {"_id": "$tasks", "taskCount": {$sum: '$tasks.points'}}},
    // {$group: {"_id":null,"tasks_details":{$push:{"taskName":'$_id',
    //    "taskCount":"$taskCount"}} }},

    {
      $project: {
        'name': '$$ROOT.name',
        'taskCount': {$size: "$tasks"},
        // 'pointsCount': {}
         tasks: '$tasks',
        // }
        // sampleTask: '$tasks'
      }
    }
  ]);
};
projectSchema.statics.getTimesheet = function(userId){
  return this.aggregate([
    { $match: {
            userId: userId,
        }},
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'projectId',
        as: 'data'
      }
    },
    {
      $project: {
        name: '$$ROOT.name',
        tasks: '$data',
      }
    }
  ]);
};

projectSchema.methods.joiValidate = (obj) => {
  const schema = {
    userId: Joi.any(),
    name: Joi.string().min(6).max(30).required(),
    description: Joi.string().min(6).max(3000),
    totalPoints: Joi.number(),
    completedPoints: Joi.number(),
    userList: Joi.array().items(Joi.string())
  };
  const { error, value } = Joi.validate(obj, schema);
  return error;
};

module.exports = mongoose.model('Project', projectSchema);
