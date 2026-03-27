const { Car } = require("../../models/Car");
const { clearCache } = require("../../utils/cacheInvalidator"); // ✅ ADD

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    await car.deleteOne();

    await clearCache("cars"); // ✅ ADD
await clearCache("dashboard"); // ✅ ADD

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
