import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function Navigation() {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar style={{ borderBottom: "1px solid black" }}>
      <Container>
        <Navbar.Brand>
          <h3>ODIN BOOK</h3>
        </Navbar.Brand>
      </Container>

      <Nav className="me-auto">
        
        <Link to="/UserProfile" state={{ targetUser: user }} className="nav-link">
          {user.firstname} {user.lastname}
        </Link>
      
        {user ? (
          <>
          
            <Nav.Link onClick={logout} >Logout</Nav.Link>         
          
            <Link to="/" className="nav-link">Feed </Link>
          
            <Link to="friendlist" className="nav-link">Friends </Link>
          
            <Link to="friendsugestions" className="nav-link">Sugestions </Link>
          
            <Link to="notifications" className="nav-link">Notifications </Link>
          
            <Link to="friendrequests" className="nav-link">Friend Requests </Link>
          
          </>
        ) : (
          <>
            
            <Link to="login" className="nav-link">Login</Link>
            
            <Link to="signup" className="nav-link">Sign up</Link>
            
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
