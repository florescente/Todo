import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import React from 'react'
import { auth } from './firebase-config'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
    <div className="container">
      <Form>
        <h1>Register User</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setRegisterEmail(e.target.value)
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setRegisterPassword(e.target.value)
            }}
          />
        </Form.Group>
        <Button type="button" onClick={register}>
          Create user
        </Button>
      </Form>
      <Form>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setLoginEmail(e.target.value)
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLoginPassword(e.target.value)
            }}
          />
        </Form.Group>
        <Button type="button" onClick={login}>
          Login
        </Button>
      </Form>
      <h2>User logged in:</h2>
      {User ? User.email : 'Not Logged In'}
      <Button type="button" onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}

export default Home
