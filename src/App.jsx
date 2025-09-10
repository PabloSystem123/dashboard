import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './shared/components/ui/sonner'
import { AuthProvider } from './shared/contexts/AuthContext'

// Auth Pages
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'

// Dashboard Layouts
import AdminLayout from './features/dashboard/layouts/AdminLayout'
import SubAdminLayout from './features/dashboard/layouts/SubAdminLayout'
import UserLayout from './features/dashboard/layouts/UserLayout'

// Dashboard Pages
import AdminDashboard from './features/dashboard/pages/AdminDashboard'
import SubAdminDashboard from './features/dashboard/pages/SubAdminDashboard'
import UserDashboard from './features/dashboard/pages/UserDashboard'

// Admin Pages
import AdminClientes from './features/dashboard/pages/admin/AdminClientes'
import AdminCitas from './features/dashboard/pages/admin/AdminCitas'
import AdminEmpleados from './features/dashboard/pages/admin/AdminEmpleados'
import AdminInmuebles from './features/dashboard/pages/admin/AdminInmuebles'
import AdminPagos from './features/dashboard/pages/admin/AdminPagos'
import AdminRoles from './features/dashboard/pages/admin/AdminRoles'
import AdminUsuarios from './features/dashboard/pages/admin/AdminUsuarios'
import AdminVentas from './features/dashboard/pages/admin/AdminVentas'
import AdminArriendos from './features/dashboard/pages/admin/AdminArriendos'
import AdminCompradores from './features/dashboard/pages/admin/AdminCompradores'
import AdminArrendatarios from './features/dashboard/pages/admin/AdminArrendatarios'
import AdminReportes from './features/dashboard/pages/admin/AdminReportes'
import AdminReportesInmuebles from './features/dashboard/pages/admin/AdminReportesInmuebles'
import AdminConfiguracion from './features/dashboard/pages/admin/AdminConfiguracion'
import AdminPerfil from './features/dashboard/pages/admin/AdminPerfil'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="clientes" element={<AdminClientes />} />
            <Route path="citas" element={<AdminCitas />} />
            <Route path="empleados" element={<AdminEmpleados />} />
            <Route path="inmuebles" element={<AdminInmuebles />} />
            <Route path="pagos" element={<AdminPagos />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="ventas" element={<AdminVentas />} />
            <Route path="arriendos" element={<AdminArriendos />} />
            <Route path="compradores" element={<AdminCompradores />} />
            <Route path="arrendatarios" element={<AdminArrendatarios />} />
            <Route path="reportes" element={<AdminReportes />} />
            <Route path="reportes-inmuebles" element={<AdminReportesInmuebles />} />
            <Route path="configuracion" element={<AdminConfiguracion />} />
            <Route path="perfil" element={<AdminPerfil />} />
          </Route>

          {/* SubAdmin Routes */}
          <Route path="/subadmin" element={<SubAdminLayout />}>
            <Route index element={<SubAdminDashboard />} />
          </Route>

          {/* User Routes */}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </div>
    </AuthProvider>
  )
}

export default App