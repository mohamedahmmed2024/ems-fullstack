import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt';

const TEMPORARY_PASSWORD = "admin123";

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        if (!ADMIN_EMAIL) {
            console.error("Missing ADMIN_EMAIL env variable");
            process.exit(1);
        }

        await connectDB();

        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("User already exists as role:", existingAdmin.role);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(TEMPORARY_PASSWORD, 10);
        
        const admin = await User.create({
            email: ADMIN_EMAIL,
            password: hashedPassword, // Fixed typo: passwprd -> password
            role: "ADMIN",  
        });

        console.log("Admin user created");
        console.log("\nemail:", admin.email);
        console.log("password:", TEMPORARY_PASSWORD); // Fixed typo in string: passsword -> password
        console.log("\nChange the password after login.");

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1); // Added exit code on failure
    }
}

registerAdmin();