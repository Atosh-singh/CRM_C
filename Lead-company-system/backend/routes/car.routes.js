const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  createCar,
  getCars,
  updateCar,
  deleteCar
} = require("../controllers/car/index");

const authMiddleware = require("../middlewares/auth.middleware");
const permissionMiddleware = require("../middlewares/permission.middleware");
const cache = require("../middlewares/cache.middleware");

// ✅ CREATE (Image + Video)
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("CREATE_CAR"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  createCar
);

// GET
router.get(
  "/",
  authMiddleware,
  permissionMiddleware("VIEW_CAR"),
  cache(300, "cars"),
  getCars
);

// ✅ UPDATE (Image + Video)
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("UPDATE_CAR"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  updateCar
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("DELETE_CAR"),
  deleteCar
);

module.exports = router;