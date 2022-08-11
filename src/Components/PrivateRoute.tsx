import Spinner from 'react-bootstrap/esm/Spinner'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

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
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
