import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets"
import { Plus, Search, X } from "lucide-react"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeForm from "../components/EmployeeForm"

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedDept, setSelectedDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setEmployees(dummyEmployeeData.filter((emp)=> (selectedDept ? emp.department === selectedDept : emp)))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [selectedDept])

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees])

  const filtered = employees.filter((emp) => {
    const matchesSearch = `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesDept = selectedDept ? emp.department === selectedDept : true

    return matchesSearch && matchesDept
  })

  return (
    <div className="animate-fade-in">
      {/*------- Header ---------*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/*------- Search Bar & Department Dropdown ---------*/}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="Search employees..."
            className="w-full pl-10"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="max-w-40"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/*------- Employee Cards Grid ---------*/}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          No employees found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((emp) => (
            <EmployeeCard 
              key={emp.id} 
              employee={emp}
              onDelete={fetchEmployees} 
              onEdit={(e) => setEditEmployee(e)} 
            />
          ))}
        </div>
      )}

      {/*------- Create Employee Modal ---------*/}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" 
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0"> 
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Add New Employee</h2>
                <p className="text-sm text-slate-500 mt-0.5">Create a user account and employee profile</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {/* Add form components here */}
              <EmployeeForm 
                onSuccess={()=>{
                  setShowCreateModal(false);
                  fetchEmployees();
                }} onCancel={()=> setShowCreateModal(false)} />
              
          
            </div>
          </div>
        </div>
      )}

      {/*------- Edit Employee Modal ---------*/}
      {editEmployee && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" 
          onClick={() => setEditEmployee(null)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0"> 
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Edit Employee</h2>
                <p className="text-sm text-slate-500 mt-0.5">Update employee details</p>
              </div>
              <button 
                onClick={() => setEditEmployee(null)} 
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {/* Add edit form components here */}
             
                <EmployeeForm initialData={editEmployee}
                onSuccess={()=>{
                  setEditEmployee(null);
                  fetchEmployees();
                }} onCancel={()=> setEditEmployee(null)} />
            
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees