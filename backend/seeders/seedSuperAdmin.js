const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const connectDB = require('../config/db');

dotenv.config({ path: "./.env" });

connectDB()

const seedSuperAdmin = async () => {
  try {
    const SuperAdminEmail = process.env.SPR_ADMIN_EMAIL || "superadmin@gmail.com";
    const SuperAdminPassword = process.env.SPR_ADMIN_PASSWORD || "111";
    const SuperAdminName = process.env.SPR_ADMIN_NAME || "superadmin";
    const existingSuperAdmin = await User.findOne({ email: SuperAdminEmail });
    if (existingSuperAdmin) {
      console.log("Ya existe el superadmin");
      if (existingSuperAdmin.role !== "SuperAdmin") {
        existingSuperAdmin.role = "SuperAdmin";
        await existingSuperAdmin.save();
        console.log("Se actualizo el role del usuario superadmin");
      }
    }
    await User.create({
      name: SuperAdminName,
      email: SuperAdminEmail,
      password: SuperAdminPassword,
      role: "SuperAdmin",
    });
    console.log("SuperAdmin creado");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedSuperAdmin();
