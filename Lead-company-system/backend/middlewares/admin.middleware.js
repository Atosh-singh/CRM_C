const { User } = require("../models/User");

const adminMiddleware = (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const roleName = req.user.role?.toUpperCase();

    if (roleName === "SUPER_ADMIN" || roleName === "ADMIN") {
      return next();
    }

    return res.status(403).json({
      message: "Admin access required"
    });

  } catch (error) {

    console.error("Admin Middleware Error:", error);

    return res.status(500).json({
      message: "Internal Server Error"
    });

  }
};

module.exports = adminMiddleware;
