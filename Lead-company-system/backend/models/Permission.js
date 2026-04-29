const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {

      removed: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    name: {
      type: String,
      required: true,
      unique: true, // auto index
      trim: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = { Permission };
