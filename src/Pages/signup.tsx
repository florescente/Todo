import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import Container from 'react-bootstrap/esm/Container'

function SignUp() {
  const [registerEmail, setRegisterEmail] = React.useState('')
  const [registerPassword, setRegisterPassword] = React.useState('')

  const register = async () => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  }
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <Form className="w-100" style={{ maxWidth: '400px' }}>
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
    </Container>
  )
}

export default SignUp
