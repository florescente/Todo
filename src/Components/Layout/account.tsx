import { signOut } from 'firebase/auth'
import Button from 'react-bootstrap/esm/Button'
import Nav from 'react-bootstrap/esm/Nav'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase-config'
import { getLoadTasks, signin } from '../../redux/authSlice'

interface User {
  auth: {
    currentUser: boolean
    email: string | null | undefined
  }
}

function Account() {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const user = useSelector((state: User) => state.auth.currentUser)
  const email = useSelector((state: User) => state.auth.email)

  const logout = async () => {
    await signOut(auth)
    dispatch(signin(false))
    dispatch(getLoadTasks(true))
  }

  if (user) {
    return (
      <Nav className="justify-content-end">
        <Nav.Link disabled>{email}</Nav.Link>
        <Button type="button" onClick={logout}>
          {t('signout')}
        </Button>
      </Nav>
    )
  } else {
    return (
      <Nav className="justify-content-end">
        <Nav.Link to="/signin" as={Link}>
          {t('signin')}
        </Nav.Link>
        <Nav.Link to="/signup" as={Link}>
          {t('signup')}
        </Nav.Link>
      </Nav>
    )
  }
}

export default Account
