const mongoose = require("mongoose");
const leadService = require("../../services/lead.service");
const { clearCache } = require("../../utils/cacheInvalidator");

const removeLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Lead ID",
      });
    }

    const result = await leadService.softDeleteLead(id);
    await clearCache("leads"); // ✅

    if (!result) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "✅ Lead soft deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { removeLead };
