import { LockIcon, X, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const ChangePasswordModal = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", text: "" })
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage({ type: "", text: "" })

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match." })
            return
        }

        setLoading(true)

        // Simulate API update
        setTimeout(() => {
            setLoading(false)
            setMessage({ type: "success", text: "Password changed successfully!" })
            setTimeout(() => {
                onClose()
                setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                setMessage({ type: "", text: "" })
            }, 1000)
        }, 1000)
    }
    
    if (!open) return null;

  return (
    <div onClick={onClose}
    className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in p-6" 
        onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
                <h2 className='text-lg font-medium text-slate-900 flex items-center gap-2'>
                    <LockIcon className='w-5 h-5 text-slate-400'/> Change password
                </h2>
                <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                    <X className="w-5 h-5"/>
                </button>
            </div>

            {message.text && (
                <div className={`p-3 rounded-xl text-sm mb-4 border ${message.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Current Password</label>
                    <input 
                        type="password" 
                        name="currentPassword" 
                        value={formData.currentPassword} 
                        onChange={handleChange} 
                        required 
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>New Password</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={formData.newPassword} 
                        onChange={handleChange} 
                        required 
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Confirm New Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary text-sm px-4 py-2">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                        {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePasswordModal