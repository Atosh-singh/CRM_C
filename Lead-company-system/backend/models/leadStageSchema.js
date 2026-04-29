const mongoose = require("mongoose");


const leadStageSchema = new mongoose.Schema({


    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
  name: String,
  order: Number
});

const LeadStageSchema = mongoose.model("LeadStageSchema", leadStageSchema);

module.exports = {
    LeadStageSchema
}