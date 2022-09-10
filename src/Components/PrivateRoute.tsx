import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './Loading'

interface User {
  auth: {
    currentUser: boolean
    email: string | null | undefined
    loading: boolean
  }
}

function PrivateRoute() {
  const user = useSelector((state: User) => state.auth.currentUser)
  const loading = useSelector((state: User) => state.auth.loading)

  if (loading) {
    return <Loading />
  }

  return user ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
