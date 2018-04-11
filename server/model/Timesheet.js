const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const timesheetSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    timesheet: [Schema.Types.Mixed]
  },
  { _id:false }
  );

// timesheetSchema.statics.getTimesheets = function(userId, date) {
//   console.log(userId);
//   console.log(date);
//   return this.aggregate([
//     {
//       $match: {
//         _id: userId
//       }
//     },
//     {
//       $project: {
//         timesheet: {
//           $filter: {
//             input: "$timesheet",
//             as: "item",
//             cond:{ eq: [`$$item.${date}`, true]}
//           }
//         }
//       }
//     }
//   ]);
// };

timesheetSchema.methods.joiValidate = obj => {
  const schema = {
    userId: Joi.any(),
    projectName: Joi.string()
      .min(6)
      .max(30)
      .required(),
    taskName: Joi.string()
      .min(6)
      .max(30)
      .required(),
    spendTime: Joi.number(),
    taskCompletion: Joi.number()
  };
  const { error, value } = Joi.validate(obj, schema);
  return error;
};

timesheetSchema.index({
  created: 1
});

module.exports = mongoose.model("Timesheet", timesheetSchema);
