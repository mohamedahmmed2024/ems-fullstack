import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/departments.js";


const employeeSchema = new mongoose.Schema({
    userId: 
    {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true, unique: true},

    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    email: {type: String, required: true },
    phone: {type: String, required: true },
    position: {type: String, required: true },
    basicSalary: {type: Number, default: 0 },
    allowances: {type: Number, default: 0 },
    deductions: {type: Number, default: 0 },
    employmentStatus: {type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE"},
    joinDate: {type: Date, required: true},
    isDeleed: {type: Boolean, default: false},
    bio: {type: String, default: ""},
    depatment: {typw: String, enum: DEPARTMENTS}
        
}, {timestamps: true})

const Employee = mongoose.models.Employee || mongoose.model("EmpLoyee", employeeSchema)
export default Employee;