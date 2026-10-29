import React, { useState } from 'react'
import Loading from '../Loading'
import { X } from 'lucide-react'

// ✅ FIX 1: Corrected prop name to onClose
const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  // ✅ FIX 2: Added 'const' declaration
  const [loading, setLoading] = useState(false)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  // ✅ FIX 3: Removed space before [0]
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Add leave submission API call here
    setTimeout(() => {
      setLoading(false)
      if (onSuccess) onSuccess()
      if (onClose) onClose()
    }, 1000)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ----- HEADER ----- */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Apply for Leave</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Submit your leave request for approval
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ----- FORM BODY ----- */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Leave Type
            </label>
            <select name="type" required className="w-full">
              <option value="">Select leave type</option>
              <option value="ANNUAL">Annual Leave</option>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input type="date" name="startDate" min={minDate} required className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Date
              </label>
              <input type="date" name="endDate" min={minDate} required className="w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              rows={3}
              required
              placeholder="State your reason for leave..."
              className="w-full resize-none"
            />
          </div>

          {/* ----- ACTIONS ----- */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal