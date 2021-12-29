import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function Navigation() {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" style={{ borderBottom: "1px solid black" }} >
      <Container>
        <Navbar.Brand>
          <h3>ODIN BOOK</h3>
        </Navbar.Brand>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
         
      
        {user ? (
          
          <>   
           <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/" >Feed</Nav.Link>
            
            <Nav.Link as={Link} to="friendlist" >Friends</Nav.Link>
            
            <Nav.Link as={Link} to="friendsugestions" >Suggestions</Nav.Link>
            
            <Nav.Link as={Link} to="notifications" >Notifications</Nav.Link>
            
            <Nav.Link as={Link} to="friendrequests" >Friend Requests</Nav.Link>
            </Nav>
            <Nav >
            <Nav.Link as={Link} to="/UserProfile" state={{ targetUser: user }}>{user.firstname} {user.lastname}</Nav.Link>

            <Nav.Link onClick={logout} className="text-danger">Logout</Nav.Link> 
            </Nav>
          </> 
        ) : (
          
            <Nav >  
            
            <Nav.Link as={Link} to="login" >Login</Nav.Link>
            
            <Nav.Link as={Link} to="signup" >Sign up</Nav.Link>
            </Nav>
          
        )}
      
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
