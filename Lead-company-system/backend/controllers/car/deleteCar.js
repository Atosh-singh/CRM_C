const cloudinary = require("../../config/cloudinary");
const { Car } = require("../../models/Car");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    // ✅ DELETE IMAGE FROM CLOUDINARY
    if (car.image_public_id) {
      await cloudinary.uploader.destroy(car.image_public_id);
    }

    // ✅ DELETE VIDEO FROM CLOUDINARY
    if (car.video_public_id) {
      await cloudinary.uploader.destroy(car.video_public_id, {
        resource_type: "video"
      });
    }

    await car.deleteOne();

    await clearCache("cars");
    await clearCache("dashboard");

    res.status(200).json({
      success: true,
      message: "Car permanently deleted"
    });

  } catch (error) {
    console.error("Delete Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { deleteCar };