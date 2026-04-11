export interface Vehicle {
  name: string;
  priceRaw: string;
  mileage: string;
  fuelType: string;
  imageSrc: string;
  category: 'HATCHBACK' | 'SUV' | 'SEDAN';
  link?: string;
  isPremium?: boolean;
  specs?: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    safety: string[];
    bootSpace: string;
  };
}

export const VEHICLES: Vehicle[] = [
  {
    name: "Jimny",
    priceRaw: "₹12.74 Lakh",
    mileage: "16.94 km/l",
    fuelType: "Petrol",
    imageSrc: "/jimny_car.png",
    category: "SUV",
    link: "/catalog/jimny",
    specs: {
      engine: "1.5L K-Series Petrol",
      power: "101 hp @ 6000 rpm",
      torque: "134.2 Nm @ 4000 rpm",
      transmission: "5MT / 4AT",
      safety: ["6 Airbags", "Brake Limited Slip Differential", "Hill Hold Control", "ISOFIX"],
      bootSpace: "208 L"
    }
  },
  {
    name: "Grand Vitara",
    priceRaw: "₹10.70 Lakh",
    mileage: "27.97 km/l",
    fuelType: "Strong Hybrid",
    imageSrc: "/hero_car_bg.png",
    category: "SUV",
    link: "/catalog/grand-vitara",
    isPremium: true,
    specs: {
      engine: "1.5L Intelligent Hybrid",
      power: "114.1 hp (Combined)",
      torque: "122 Nm (Engine) + 141 Nm (Motor)",
      transmission: "e-CVT",
      safety: ["6 Airbags", "TPMS", "360 View Camera", "Disc Brakes (All Wheels)"],
      bootSpace: "265 L (Strong Hybrid)"
    }
  },
  {
    name: "Ciaz",
    priceRaw: "₹9.40 Lakh",
    mileage: "20.65 km/l",
    fuelType: "Smart Hybrid",
    imageSrc: "/hero_car_bg.png",
    category: "SEDAN",
    link: "/catalog/ciaz",
    isPremium: true,
    specs: {
      engine: "1.5L K15 Smart Hybrid",
      power: "103 hp @ 6000 rpm",
      torque: "138 Nm @ 4400 rpm",
      transmission: "5MT / 4AT",
      safety: ["Dual Airbags", "ESP with Hill Hold", "ABS with EBD"],
      bootSpace: "510 L"
    }
  },
  {
    name: "Dzire",
    priceRaw: "₹6.57 Lakh",
    mileage: "31.12 km/kg",
    fuelType: "Petrol/CNG",
    imageSrc: "/dzire_car.png",
    category: "SEDAN",
    specs: {
      engine: "1.2L DualJet Petrol",
      power: "89 hp @ 6000 rpm",
      torque: "113 Nm @ 4400 rpm",
      transmission: "5MT / AGS",
      safety: ["Dual Airbags", "ABS with EBD", "ISOFIX"],
      bootSpace: "378 L"
    }
  },
  {
    name: "Baleno",
    priceRaw: "₹6.66 Lakh",
    mileage: "30.61 km/kg",
    fuelType: "MT CNG",
    imageSrc: "/baleno_car.png",
    category: "HATCHBACK",
    isPremium: true,
    specs: {
      engine: "1.2L DualJet Smart Hybrid",
      power: "88.5 hp @ 6000 rpm",
      torque: "113 Nm @ 4400 rpm",
      transmission: "5MT / AGS",
      safety: ["6 Airbags", "HUD Display", "ABS with EBD"],
      bootSpace: "318 L"
    }
  },
  {
    name: "Swift",
    priceRaw: "₹6.49 Lakh",
    mileage: "24.80 km/l",
    fuelType: "Petrol",
    imageSrc: "/swift_car.png",
    category: "HATCHBACK",
    isPremium: true,
    specs: {
      engine: "1.2L K-Series DualJet",
      power: "89 hp @ 6000 rpm",
      torque: "113 Nm @ 4400 rpm",
      transmission: "5MT / AGS",
      safety: ["Dual Airbags", "Reverse Parking Sensors", "ABS with EBD"],
      bootSpace: "268 L"
    }
  },
  {
    name: "Fronx",
    priceRaw: "₹7.51 Lakh",
    mileage: "21.50 km/l",
    fuelType: "Turbo Petrol",
    imageSrc: "/jimny_car.png",
    category: "SUV",
    link: "/catalog/fronx",
    isPremium: true,
    specs: {
      engine: "1.0L Turbo BoosterJet",
      power: "99 hp @ 5500 rpm",
      torque: "147.6 Nm @ 2000 rpm",
      transmission: "5MT / 6AT",
      safety: ["6 Airbags", "360 View Camera", "Head-up Display"],
      bootSpace: "308 L"
    }
  }
];
