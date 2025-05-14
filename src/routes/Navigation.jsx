
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/png-clipart-wall-decal-sticker-bodybuilding-fitness-centre-bodybuilding-physical-fitness-hand (1).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faTrophy } from '@fortawesome/free-solid-svg-icons';




function NavbarComponent() {
  const { isAuthenticated, user, logout} = useContext(AuthContext);
  return (
    <Navbar expand="md" bg="info" variant="light" className="shadow-lg rounded-bottom px-10">
      <Container>
        <Navbar.Brand href="/"> 
          <img
            src={logo}
            alt="Fit+Together Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          {' '}Fit+Together</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='w-100'>
          <Nav className="ms-sm-auto text-end ">
            {/* Links that will show regardless of isAuth*/}
            <Nav.Link href="/" className="fw-bold"><FontAwesomeIcon icon={faHome}className='fs-3 pe-1' /></Nav.Link>
            {/* Links that will show for unAuthorized users*/}
            {!isAuthenticated && (
              <>
            
            <Nav.Link href='/auth/login' className="fw-bold">Login</Nav.Link>
            </>
            )}

            {/* all routes for authorizied users */}
            {isAuthenticated && (
            <>
            <Nav.Link href="/challenges/home" className="fw-bold"><FontAwesomeIcon icon={faTrophy}className='fs-3 pe-1' /></Nav.Link>
            <Nav.Link href="/user/:username" className="fw-bold"><FontAwesomeIcon icon={faUserCircle}className='fs-3 pe-1' /></Nav.Link>
            <Nav.Link href='/' className="fw-bold" onClick={() => {logout()}}>Logout</Nav.Link>
          
          </>
        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;