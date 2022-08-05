import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Todo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={Link}>
            Home
          </Nav.Link>
          <Nav.Link to="/table" as={Link}>
            Table
          </Nav.Link>
          <Nav.Link to="/redux" as={Link}>
            Redux
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link to="/signin" as={Link}>
            Sign In
          </Nav.Link>
          <Nav.Link to="/signup" as={Link}>
            Sign Up
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
