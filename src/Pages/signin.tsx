import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase-config'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'

function SignIn() {
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')

  const login = async () => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <Form className="w-100" style={{ maxWidth: '400px' }}>
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
    </Container>
  )
}

export default SignIn
