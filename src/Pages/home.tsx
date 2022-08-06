import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../redux/authSlice'

interface User {
  auth: {
    currentUser: boolean
  }
}

function Home() {
  const dispatch = useDispatch()
  const user = useSelector((state: User) => state.auth.currentUser)

  const logout = async () => {
    await signOut(auth)
    dispatch(signin(false))
  }
  return (
    <div className="container">
      <h2>User logged in:</h2>
      {user ? 'Logged In' : 'Not Logged In'}
      <Button type="button" onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}

export default Home
