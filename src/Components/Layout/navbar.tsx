import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Account from './account'

function NavBar() {
  const { t } = useTranslation()

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Todo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={Link}>
            {t('home')}
          </Nav.Link>
        </Nav>
        <Account />
      </Container>
    </Navbar>
  )
}

export default NavBar
