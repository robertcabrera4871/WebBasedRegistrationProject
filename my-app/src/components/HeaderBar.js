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
        <Navbar id='parent' bg="light" expand="lg">
        <Container id='parent' className="align-center">
        <Navbar.Brand className='child'>
             <a href="/home"><img src={logo} alt="school logo" width='30'height='30'/></a>
            </Navbar.Brand>
          <Navbar.Brand className='child'  href="/home">Suny Hogwarts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
            <Nav style={{ width: "100%" }}>
            
              <Nav.Link className='child' href="/home">Home</Nav.Link>
              <Nav.Link className='child' href="/programs">Program and Courses</Nav.Link>
              {(privs.isStudent || privs.isFaculty ) && <Nav.Link className='child' href="/academics">Academics</Nav.Link>}
              {(privs.isStudent) && <Nav.Link className='child' href="/registration">Registration</Nav.Link>}
              {(privs.isAdmin || privs.isFaculty) &&  <Nav.Link className='child' href="/users">Users</Nav.Link>}
              {privs.isFaculty && <Nav.Link className='child'  href="/facHistory">Faculty History</Nav.Link>}
              {privs.isAdmin && <Nav.Link className='child'  href="/timeWindow">Time Window</Nav.Link> }
              {(privs.isResearch)  && <Nav.Link className='child' href="/statData">Statistical Data</Nav.Link>}
              {privs.isAdmin && <Nav.Link className='child'  href='/buildAndRoom'>Rooms and Buildings</Nav.Link>}
              <Nav className='justify-content-end'style={{ width: "10%" }} >
              <div>
                {privs.isGuest ? <Button className='child' variant="outline-success"  onClick={() =>{
                setToken("")
                sessionStorage.setItem('user', "")
                }}>Login</Button> :
              <Button className='child' variant="outline-danger"  onClick={() =>{
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

