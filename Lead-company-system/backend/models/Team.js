const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },

    name: {
      type: String,
      required: true,
      trim: true,
    },

  // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    // 🔹 Team Lead (NOW VALID ✅)
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // 🔹 Car Types (Already in your system)
    carTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarType"
      }
    ],

    // 🔹 Round Robin Pointer (IMPORTANT FOR LEAD ASSIGNMENT)
    lastAssignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // 🔹 Assignment Strategy
    assignmentType: {
      type: String,
      enum: ["ROUND_ROBIN", "LOAD_BALANCED", "MANUAL"],
      default: "ROUND_ROBIN"
    },

    // 🔹 Max Leads Per User (🔥 VERY USEFUL WITH activeLeads)
    maxLeadsPerUser: {
      type: Number,
      default: 10
    },

    // 🔹 Team Priority (used when multiple teams match a lead)
    priority: {
      type: Number,
      default: 0
    },

    // 🔹 Audit Fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true },
);
const Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
