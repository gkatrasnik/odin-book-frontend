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
        <Nav.Item>
        <Link to="/UserProfile" state={{ targetUser: user }}>
          {user.firstname} {user.lastname}
        </Link>
      </Nav.Item>
        {user ? (
          <>
          <Nav.Item>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/">Feed </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="friendlist">Friends </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="friendsugestions">Sugestions </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="notifications">Notifications </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="friendrequests">Friend Requests </Link>
          </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
             <Link to="login">Login</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="signup">Sign up</Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
