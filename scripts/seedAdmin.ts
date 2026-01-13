import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

async function seedAdmin() {
  await connect();

  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin seeded");
}

seedAdmin();
