import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from '../assets/logo.jpg'

function HeaderBar(){
    return (
        <Navbar bg="light" expand="sm">
        <Container>
             <Navbar.Brand>
             <img src={logo} alt="school logo" width='30'height='30'/>
            </Navbar.Brand>
          <Navbar.Brand href="/home">Suny Hogwarts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/programs">Program and Courses</Nav.Link>
              <Nav.Link href="/academics">Academics</Nav.Link>
              <Nav.Link href="/registration">Registration</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

}

export default HeaderBar

