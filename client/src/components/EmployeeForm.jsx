import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from "../assets/assets"

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const isEditMode = !!initialData

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">
      {/* Personal Information */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input 
              name="firstName" 
              required 
              defaultValue={initialData?.firstName} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input 
              name="lastName" 
              required 
              defaultValue={initialData?.lastName} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input 
              name="phone" 
              required 
              defaultValue={initialData?.phone} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Join Date</label>
            <input 
              type="date" 
              name="joinDate" 
              required 
              defaultValue={
                initialData?.joinDate 
                  ? new Date(initialData.joinDate).toISOString().split("T")[0] 
                  : ""
              } 
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 font-medium">Bio (Optional)</label>
            <textarea 
              name="bio" 
              defaultValue={initialData?.bio} 
              rows={3} 
              className="resize-none" 
              placeholder="Brief description..."
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Detail
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div>
            <label className="block mb-2 font-medium">Department</label>
            {/* ✅ FIXED: Changed initialdepartment to initialData */}
            <select name="department" defaultValue={initialData?.department || ""}>
              <option value="">Select Department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Position</label>
            <input 
              name="position" 
              required 
              defaultValue={initialData?.position} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Basic Salary</label>
            <input 
              type="number" 
              name="basicSalary" 
              required 
              min="0" 
              step="0.01" 
              defaultValue={initialData?.basicSalary || 0} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Allowances</label>
            <input 
              type="number" 
              name="allowances" 
              min="0" 
              step="0.01" 
              required 
              defaultValue={initialData?.allowances || 0} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Deductions</label>
            <input 
              type="number" 
              name="deductions" 
              min="0" 
              step="0.01" 
              required 
              defaultValue={initialData?.deductions || 0} 
            />
          </div>
          {isEditMode && (
            <div>
              <label className="block mb-2 font-medium">Status</label>
              <select name="employmentStatus" defaultValue={initialData?.employmentStatus || "ACTIVE"}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Account Setup */}
      {!isEditMode && (
        <div className="card p-5 sm:p-6">
          <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
            Account Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
            <div>
              <label className="block mb-2 font-medium">Email Address</label>
              <input type="email" name="email" required placeholder="john@example.com" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input type="password" name="password" required placeholder="••••••••" />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel || (() => navigate(-1))}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving..." : isEditMode ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm