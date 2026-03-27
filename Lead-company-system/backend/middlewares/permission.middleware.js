const { User } = require("../models/User");

const permissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    try {

      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      // 🚀 SUPER_ADMIN bypass
      if (req.user.role === "SUPER_ADMIN") {
        return next();
      }

      // 🚀 ADMIN bypass
      if (req.user.role === "ADMIN") {
        return next();
      }

      // 🔐 Permission check
      if (!req.user.permissions || !req.user.permissions.includes(requiredPermission)) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      next();

    } catch (error) {

      console.error("Permission Middleware Error:", error);

      return res.status(500).json({
        message: "Internal Server Error"
      });

    }
  };
};

module.exports = permissionMiddleware;
