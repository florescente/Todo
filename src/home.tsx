import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import React from 'react'
import { auth } from './firebase-config'

function Home() {
  const [registerEmail, setRegisterEmail] = React.useState('')
  const [registerPassword, setRegisterPassword] = React.useState('')
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')

  const [User, setUser] = React.useState<any>({})

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const register = async () => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  }
  const login = async () => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }
  const logout = async () => {
    await signOut(auth)
  }
  return (
    <div>
      <div>
        <h1>Register User</h1>
        <input
          placeholder="email"
          onChange={(e) => {
            setRegisterEmail(e.target.value)
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setRegisterPassword(e.target.value)
          }}
        />
        <button type="button" onClick={register}>
          Create user
        </button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          placeholder="email"
          onChange={(e) => {
            setLoginEmail(e.target.value)
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setLoginPassword(e.target.value)
          }}
        />
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
      <h2>User logged in:</h2>
      {User ? User.email : 'Not Logged In'}
      <button type="button" onClick={logout}>
        Sign out
      </button>
    </div>
  )
}

export default Home
