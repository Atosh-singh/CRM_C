const { Car } = require("../../models/Car");
const { CarType } = require("../../models/CarType");
const slugify = require("slugify");
const { clearCache } = require("../../utils/cacheInvalidator");

const createCar = async (req, res) => {
  try {
    const {
      name,
      carType,
      price,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      engine,
      showroom
    } = req.body;

    // ✅ Cloudinary files
    const image = req.files?.image?.[0]?.path || null;
    const image_public_id = req.files?.image?.[0]?.filename || null;

    const video = req.files?.video?.[0]?.path || null;
    const video_public_id = req.files?.video?.[0]?.filename || null;

    if (!name || !carType || !price || !fuelType || !transmission) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const type = await CarType.findOne({
      slug: carType.toLowerCase(),
      enabled: true
    });

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Invalid car type"
      });
    }

    const slug = slugify(name.trim(), { lower: true });

    const existing = await Car.findOne({ slug });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Car already exists"
      });
    }

    const car = await Car.create({
      name: name.trim(),
      slug,
      carType: type._id,
      price,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      engine,
      showroom,

      // ✅ Save Cloudinary data
      image,
      image_public_id,
      video,
      video_public_id
    });

    await clearCache("cars");
    await clearCache("dashboard");

    res.status(201).json({
      success: true,
      data: car
    });

  } catch (error) {
    console.error("Create Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { createCar };