import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userType="subadmin" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}
