import { Routes, Route, Navigate } from 'react-router'
import HomePage from '../pages/public/HomePage'
import ExploreItemsPage from '../pages/public/ExploreItemsPage'
import ItemDetailPage from '../pages/public/ItemDetailPage'
import AuthPage from '../pages/public/AuthPage'
import CreateItemPage from '../pages/public/CreateItemPage'
import MyClaimsPage from '../pages/public/MyClaimsPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import UserManagementPage from '../pages/admin/UserManagementPage'
import CategoryManagementPage from '../pages/admin/CategoryManagementPage'
import AuditLogPage from '../pages/admin/AuditLogPage'
import StaffDashboardPage from '../pages/staff/StaffDashboardPage'
import ItemModerationPage from '../pages/staff/ItemModerationPage'
import ClaimsManagementPage from '../pages/staff/ClaimsManagementPage'
import ClaimVerificationHandoverPage from '../pages/staff/ClaimVerificationHandoverPage'

import { useAuth } from '../contexts/useAuth'

function ProtectedCreateItemRoute() {
  const { currentUser, loadingAuth } = useAuth()
  if (!loadingAuth && (currentUser?.role === 'ADMIN' || currentUser?.role === 'MODERATOR')) {
    return <Navigate to={currentUser.role === 'ADMIN' ? '/admin' : '/staff'} replace />
  }
  return <CreateItemPage />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage defaultMode="login" />} />
      <Route path="/register" element={<AuthPage defaultMode="register" />} />
      <Route path="/search" element={<ExploreItemsPage />} />
      <Route path="/items" element={<ExploreItemsPage />} />
      <Route path="/items/new" element={<ProtectedCreateItemRoute />} />
      <Route path="/my-claims" element={<MyClaimsPage />} />
      <Route path="/items/detail" element={<ItemDetailPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="/item/:id" element={<ItemDetailPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/categories" element={<CategoryManagementPage />} />
      <Route path="/admin/audit" element={<AuditLogPage />} />
      <Route path="/staff" element={<StaffDashboardPage />} />
      <Route path="/staff/review" element={<ItemModerationPage />} />
      <Route path="/staff/claims" element={<ClaimsManagementPage />} />
      <Route path="/staff/handover" element={<ClaimVerificationHandoverPage />} />
      <Route path="/moderator" element={<StaffDashboardPage />} />
      <Route path="/moderator/review" element={<ItemModerationPage />} />
      <Route path="/moderator/claims" element={<ClaimsManagementPage />} />
      <Route path="/moderator/handover" element={<ClaimVerificationHandoverPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
