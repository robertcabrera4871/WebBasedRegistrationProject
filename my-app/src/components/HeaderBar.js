import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from '../assets/logo.jpg'
import Button from 'react-bootstrap/Button'



function HeaderBar({setToken, setUser, userType}){

    var isAdmin = false;
    var isStudent = false;
    var isFaculty = false;
    var isResearch = false;

    switch(userType){
      case 'admin': isAdmin = true; break;
      case 'student': isStudent = true; break;
      case 'faculty': isFaculty = true; break;
      case 'research': isResearch = true; break;
      default: //is guest;
    }

  
    return (
        <Navbar  bg="light" expand="sm">
        <Container className="align-center">
             <Navbar.Brand>
             <a href="/home"><img src={logo} alt="school logo" width='30'height='30'/></a>
            </Navbar.Brand>
          <Navbar.Brand href="/home">Suny Hogwarts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/programs">Program and Courses</Nav.Link>
              {(isAdmin || isStudent || isFaculty ) && <Nav.Link href="/academics">Academics</Nav.Link>}
              {(isAdmin || isStudent) && <Nav.Link href="/registration">Registration</Nav.Link>}
              {(isAdmin || isFaculty) &&  <Nav.Link href="/users">Users</Nav.Link>}
              {(isAdmin || isFaculty) && <Nav.Link href="/facHistory">Faculty History</Nav.Link>}
              {isAdmin && <Nav.Link href="/timeWindow">Time Window</Nav.Link> }
              {(isAdmin || isResearch)  && <Nav.Link href="/statData">Statistical Data</Nav.Link>}
              <Nav.Link></Nav.Link>
              <div className="logout-button">
              <Button variant="outline-danger"  onClick={() =>{
                setToken("")
                setUser("")
                }}>Logout</Button> </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

}

export default HeaderBar

