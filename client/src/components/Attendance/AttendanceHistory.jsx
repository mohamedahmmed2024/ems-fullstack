import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import { format } from 'date-fns'

const AttendanceHistory = ({ history = [] }) => {
  return (
    <div className='card overflow-hidden'>
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className='font-semibold text-slate-900'>Recent Activity</h3>
      </div>
      
      <div className="overflow-x-auto">
        {/* ✅ FIX 1: Wrap BOTH <thead> and <tbody> inside <table> */}
        <table className='table-modern w-full text-left text-sm'>
          <thead>
            <tr className='bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100'>
              <th className='px-6 py-3.5'>Date</th>
              <th className='px-6 py-3.5'>Check In</th>
              <th className='px-6 py-3.5'>Check Out</th>
              <th className='px-6 py-3.5'>Working Hours</th>
              <th className='px-6 py-3.5'>Day Type</th>
              <th className='px-6 py-3.5'>Status</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-slate-100 text-slate-700'>
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className='text-center py-12 text-slate-400'>
                  No records found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record)
                return (
                  <tr key={record._id || record.id} className='hover:bg-slate-50/50 transition-colors'>
                    <td className='px-6 py-4 font-semibold text-slate-900'>
                      {record.date ? format(new Date(record.date), "MMM dd, yyyy") : "-"}
                    </td>
                    <td className='px-6 py-4 text-slate-600'>
                      {record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "-"}
                    </td>
                    <td className='px-6 py-4 text-slate-600'>
                      {record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "-"}
                    </td>
                    <td className='px-6 py-4 text-slate-600 font-medium'>
                      {getWorkingHoursDisplay(record)}
                    </td>
                    <td className='px-6 py-4'>
                      {/* ✅ FIX 2: Corrected <sp> to <span> */}
                      {dayType.label !== "-" ? (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 ${dayType.className}`}>
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      {/* ✅ FIX 3: Added status badge styling */}
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600'>
                        {record.status}
                      </span>
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

export default AttendanceHistory