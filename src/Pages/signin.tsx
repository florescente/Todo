import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getId, getUser, signin } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

type Inputs = {
  email: string
  password: string
}

function SignIn() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [error, setError] = React.useState<any>(null)

  const schema = yup.object().shape({
    email: yup.string().email().required(t('emailRequired')),
    password: yup
      .string()
      .min(6, t('minimumCharacteres'))
      .required(t('passwordRequired')),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (UserCredential) => {
          const user = UserCredential.user.uid
          dispatch(getId(user))
        }
      )
      dispatch(signin(true))
      dispatch(getUser(data.email))
      navigate('/')
    } catch (err) {
      setError(err)
    }
    reset()
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
        <h1>{t('login')}</h1>
        <Form.Group className="mb-3" controlId="formLoginEmail">
          <Form.Label>{t('emailAddress')}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t('enterEmail')}
            {...register('email')}
          />
          <Form.Text className="text-muted">
            {errors && errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLoginPassword">
          <Form.Label>{t('password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('password')}
            autoComplete="true"
            {...register('password')}
            onFocus={() => setError(null)}
          />
          <Form.Text className="text-muted">
            {errors && errors.password
              ? errors.password?.message
              : error && error.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit">{t('submit')}</Button>
      </Form>
    </Container>
  )
}

export default SignIn
