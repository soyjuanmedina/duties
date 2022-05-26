var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var dutySchema = new Schema({
  id: { type: String },
  name: { type: String }
});

module.exports = mongoose.model("Duty", tvshowSchema);