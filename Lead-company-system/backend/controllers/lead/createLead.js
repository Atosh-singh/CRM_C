const leadService = require("../../services/lead.service");
const { clearCache } = require("../../utils/cacheInvalidator");

const createLead = async (req, res) => {
  try {
    let { name, phone, car, website } = req.body;

    // 🛡 Honeypot protection
    if (website) {
      return res.status(400).json({
        success: false,
        message: "Spam detected"
      });
    }

    name = name?.trim();
    phone = phone?.trim();

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone required"
      });
    }

    // 📱 Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

    // 🔥 Just pass raw data to service
    const lead = await leadService.createLead({
      name,
      phone,
      car
    });
    await clearCache("leads"); // ✅

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead
    });

  } catch (error) {

    if (error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createLead };
