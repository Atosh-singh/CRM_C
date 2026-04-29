const mongoose = require("mongoose");
const { Role } = require("../../models/Role");
const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator");

const createRole = async (req, res) => {
  try {
    let { name, description, permissions } = req.body;

    // ===============================
    // ✅ VALIDATION
    // ===============================
    if (!name || !permissions || !Array.isArray(permissions)) {
      return res.status(400).json({
        message: "Name and permissions are required"
      });
    }

    // 🔧 Normalize name
    name = name.trim().toUpperCase();

    // ===============================
    // 🔥 CHECK ACTIVE ROLE (BLOCK)
    // ===============================
    const existingActive = await Role.findOne({
      name,
      removed: false
    });

    if (existingActive) {
      return res.status(409).json({
        message: "Role already exists"
      });
    }

    // ===============================
    // 🔥 CHECK SOFT DELETED (RESTORE)
    // ===============================
    const existingDeleted = await Role.findOne({
      name,
      removed: true
    });

    if (existingDeleted) {
      existingDeleted.removed = false;
      existingDeleted.enabled = true;

      // ✅ Update permissions also on restore
      if (permissions.length > 0) {
        const validPermissions = await Permission.find({
          _id: { $in: permissions }
        });

        if (validPermissions.length !== permissions.length) {
          return res.status(400).json({
            message: "Invalid permissions detected"
          });
        }

        existingDeleted.permissions = validPermissions.map(p => p.name);
      }

      if (description !== undefined) {
        existingDeleted.description = description;
      }

      await existingDeleted.save();

      await clearCache("roles");
      await clearCache("users");

      return res.status(200).json({
        success: true,
        data: existingDeleted,
        message: "Role restored successfully"
      });
    }

    // ===============================
    // ✅ VALIDATE PERMISSIONS (NEW ROLE)
    // ===============================
    const validPermissions = await Permission.find({
      _id: { $in: permissions }
    });

    if (validPermissions.length !== permissions.length) {
      return res.status(400).json({
        message: "One or more permissions are invalid"
      });
    }

    const permissionNames = validPermissions.map(p => p.name);

    // ===============================
    // ✅ CREATE NEW ROLE
    // ===============================
    const role = await Role.create({
      name,
      description,
      permissions: permissionNames
    });

    await clearCache("roles");
    await clearCache("users");

    return res.status(201).json({
      success: true,
      data: role
    });

  } catch (error) {
    console.error("Create Role Error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { createRole };