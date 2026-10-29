import { format } from 'date-fns'
import { Download } from 'lucide-react'
import React from 'react'

const PayslipList = ({ payslips = [], isAdmin }) => {
  const safePayslips = Array.isArray(payslips) ? payslips : []

  return (
    <div className="card overflow-hidden bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table-modern w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              {isAdmin && <th className="px-6 py-3.5">Employee</th>}
              <th className="px-6 py-3.5">Period</th>
              <th className="px-6 py-3.5">Basic Salary</th>
              <th className="px-6 py-3.5">Net Salary</th>
              <th className="px-6 py-3.5 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {safePayslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center py-12 text-slate-400">
                  No payslips found
                </td>
              </tr>
            ) : (
              safePayslips.map((payslip) => {
                const payslipId = payslip._id || payslip.id
                return (
                  <tr key={payslipId} className="hover:bg-slate-50/50 transition-colors">
                    {isAdmin && (
                      <td className="px-6 py-4 text-slate-900 font-medium">
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4 text-slate-500">
                      {payslip.year && payslip.month 
                        ? format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")
                        : 'N/A'}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      ${payslip.basicSalary?.toLocaleString() ?? 0}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-800">
                      ${payslip.netSalary?.toLocaleString() ?? 0}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => window.open(`/print/payslips/${payslipId}`)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10"
                      >
                        <Download className="w-3 h-3 mr-1.5" />
                        Download
                      </button>
                    </td>
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

export default PayslipList