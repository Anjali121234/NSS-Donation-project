import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function seedAdmin() {
     await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "admin",
  });

  if (existingAdmin) {
    console.log(" Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@123",
    10
  );

  await User.create({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log(" Admin user created");
  process.exit(0);

}
