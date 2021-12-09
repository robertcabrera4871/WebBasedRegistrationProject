import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from '../assets/logo.jpg'
import Button from 'react-bootstrap/Button'
import checkPrivs from '../utilities/checkPrivs'


//Add custom per ser
function HeaderBar({setToken}){

    const privs = checkPrivs();  
    return (
        <Navbar bg="light" expand="sm">
        <Container className="align-center">
        <Navbar.Brand>
             <a href="/home"><img src={logo} alt="school logo" width='30'height='30'/></a>
            </Navbar.Brand>
          <Navbar.Brand href="/home">Suny Hogwarts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
            <Nav style={{ width: "100%" }}>
            
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/programs">Program and Courses</Nav.Link>
              {(privs.isStudent || privs.isFaculty ) && <Nav.Link href="/academics">Academics</Nav.Link>}
              {(privs.isStudent) && <Nav.Link href="/registration">Registration</Nav.Link>}
              {(privs.isAdmin || privs.isFaculty) &&  <Nav.Link href="/users">Users</Nav.Link>}
              {privs.isFaculty && <Nav.Link href="/facHistory">Faculty History</Nav.Link>}
              {privs.isAdmin && <Nav.Link href="/timeWindow">Time Window</Nav.Link> }
              {(privs.isResearch)  && <Nav.Link href="/statData">Statistical Data</Nav.Link>}
              {privs.isAdmin && <Nav.Link href='/buildAndRoom'>Rooms and Buildings</Nav.Link>}
              <Nav className='justify-content-end'style={{ width: "10%" }} >
              <div>
                {privs.isGuest ? <Button variant="outline-success"  onClick={() =>{
                setToken("")
                sessionStorage.setItem('user', "")
                }}>Login</Button> :
              <Button variant="outline-danger"  onClick={() =>{
                setToken("")
                sessionStorage.setItem('user', "")
                }}>Logout</Button> }</div></Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

}

export default HeaderBar

