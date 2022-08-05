import { onAuthStateChanged, signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase-config'
import Button from 'react-bootstrap/Button'

function Home() {
  const [User, setUser] = React.useState<any>({})

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const logout = async () => {
    await signOut(auth)
  }
  return (
    <div className="container">
      <h2>User logged in:</h2>
      {User ? User.email : 'Not Logged In'}
      <Button type="button" onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}

export default Home
