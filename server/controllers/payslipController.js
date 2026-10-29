import Employee from "../models/Employee.js";
import payslip from "../models/payslip.js"; 

// POST /api/payslips - Create payslip
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

    if (!employeeId || !month || !year || basicSalary === undefined) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const netSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const payslip = await payslip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    });

    return res.status(201).json({ success: true, data: payslip });
  } catch (error) {
    console.error("Error creating payslip:", error);
    return res.status(500).json({ error: "Failed to create payslip" });
  }
};

// GET /api/payslips - Get payslips
export const getPayslip = async (req, res) => {
  try {
    const session = req.session || {};
    const isAdmin = session.role === "ADMIN";

    if (isAdmin) {
      // ✅ Fixed: Sort before await & removed duplicate map loop
      const payslips = await payslip.find()
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const data = payslips.map((p) => {
        const obj = p.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });

      return res.json({ data });
    } else {
      if (!session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const employee = await Employee.findOne({ userId: session.userId });
      if (!employee) return res.status(404).json({ error: "Employee profile not found" });

      // ✅ Fixed: Chained .sort() before awaiting query, fixed 'createedAt' typo
      const payslips = await Payslip.find({ employeeId: employee._id }).sort({
        createdAt: -1,
      });

      return res.json({ data: payslips });
    }
  } catch (error) {
    console.error("Error fetching payslips:", error);
    return res.status(500).json({ error: "Failed to fetch payslips" });
  }
};

// GET /api/payslips/:id - Get payslip by ID
export const getPayslipById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id)
      .populate("employeeId")
      .lean();

    if (!payslip) return res.status(404).json({ error: "Payslip not found" });

    const result = {
      ...payslip,
      id: payslip._id.toString(),
      employee: payslip.employeeId,
    };

    return res.json(result);
  } catch (error) {
    console.error("Error fetching payslip by ID:", error);
    return res.status(500).json({ error: "Failed to fetch payslip" });
  }
};