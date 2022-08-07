import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface User {
  auth: {
    currentUser: boolean
    email: string | null | undefined
  }
}

function PrivateRoute() {
  const user = useSelector((state: User) => state.auth.currentUser)
  return user ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
