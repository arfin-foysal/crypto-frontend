import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PublicRoute() {
 
  return <Outlet />
}