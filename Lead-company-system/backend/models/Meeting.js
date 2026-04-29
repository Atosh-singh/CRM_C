const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },

    title: String,
    description: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    startTime: Date,
    endTime: Date,

    meetLink: String,

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true },
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = { Meeting };
