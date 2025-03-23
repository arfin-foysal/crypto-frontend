import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute() {
  const { isAuth } = useSelector(state => state.auth)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}