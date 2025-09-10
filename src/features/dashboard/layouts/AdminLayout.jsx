import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardSidebar userType="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}