import { Check, Loader2, X } from 'lucide-react'
import React, { useState } from 'react'
import { format } from 'date-fns'

const LeaveHistory = ({ leaves = [], isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id)
    if (onUpdate) {
      await onUpdate(id, status)
    }
    setProcessing(null)
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              {isAdmin && <th className="px-6 py-3.5">Employee</th>}
              <th className="px-6 py-3.5">Types</th>
              <th className="px-6 py-3.5">Dates</th>
              <th className="px-6 py-3.5">Reason</th>
              <th className="px-6 py-3.5">Status</th>
              {isAdmin && <th className="px-6 py-3.5 text-center">Action</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">
                  No leave applications found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const leaveId = leave._id || leave.id
                return (
                  <tr key={leaveId} className="hover:bg-slate-50/50 transition-colors">
                    {isAdmin && (
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {leave.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {leave.startDate && format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {leave.endDate && format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={leave.reason}>
                      {leave.reason}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          leave.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-600"
                            : leave.status === "REJECTED"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 text-center">
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(leaveId, "APPROVED")}
                              disabled={!!processing}
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => handleStatusUpdate(leaveId, "REJECTED")}
                              disabled={!!processing}
                              className="p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaveHistory