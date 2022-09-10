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

function AuthRoute() {
  const user = useSelector((state: User) => state.auth.currentUser)
  const loading = useSelector((state: User) => state.auth.loading)

  if (loading) {
    return <Loading />
  }

  console.log(user)

  return user ? <Navigate to="/" /> : <Outlet />
}

export default AuthRoute
