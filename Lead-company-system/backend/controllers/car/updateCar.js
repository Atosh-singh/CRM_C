const cloudinary = require("../../config/cloudinary");
const { Car } = require("../../models/Car");
const { CarType } = require("../../models/CarType");
const slugify = require("slugify");
const { clearCache } = require("../../utils/cacheInvalidator");

const updateCar = async (req, res) => {
  try {
    const { name, carType, ...rest } = req.body;

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    // ✅ HANDLE NAME + SLUG
    if (name) {
      const slug = slugify(name.trim(), { lower: true });

      const exists = await Car.findOne({
        _id: { $ne: car._id },
        slug
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Car with this name already exists"
        });
      }

      car.name = name.trim();
      car.slug = slug;
    }

    // ✅ HANDLE CAR TYPE
    if (carType) {
      const type = await CarType.findOne({
        slug: carType.toLowerCase()
      });

      if (!type) {
        return res.status(400).json({
          success: false,
          message: "Invalid car type"
        });
      }

      car.carType = type._id;
    }

    // ✅ HANDLE IMAGE UPDATE
    if (req.files?.image) {
      // delete old
      if (car.image_public_id) {
        await cloudinary.uploader.destroy(car.image_public_id);
      }

      car.image = req.files.image[0].path;
      car.image_public_id = req.files.image[0].filename;
    }

    // ✅ HANDLE VIDEO UPDATE
    if (req.files?.video) {
      if (car.video_public_id) {
        await cloudinary.uploader.destroy(car.video_public_id, {
          resource_type: "video"
        });
      }

      car.video = req.files.video[0].path;
      car.video_public_id = req.files.video[0].filename;
    }

    // ✅ OTHER FIELDS
    Object.assign(car, rest);

    await car.save();

    await clearCache("cars");
    await clearCache("dashboard");

    res.status(200).json({
      success: true,
      data: car
    });

  } catch (error) {
    console.error("Update Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { updateCar };