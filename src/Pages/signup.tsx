import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import Container from 'react-bootstrap/esm/Container'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getId, getUser, signin } from '../redux/authSlice'

type Inputs = {
  email: string
  password: string
}

function SignUp() {
  const dispatch = useDispatch()

  const [error, setError] = React.useState<any>(null)

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((UserCredential) => {
        const user = UserCredential.user.uid
        dispatch(getId(user))
      })
      dispatch(signin(true))
      dispatch(getUser(data.email))
    } catch (err) {
      console.log(err)
      setError(err)
    }
  }

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <Form
        className="w-100"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Register User</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <Form.Text className="text-muted">{error && error.message}</Form.Text>
        </Form.Group>
        <Button type="submit">Create user</Button>
      </Form>
    </Container>
  )
}

export default SignUp
