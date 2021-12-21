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
        <Nav.Link>
          {user.firstname} {user.lastname}
        </Nav.Link>

        {user ? (
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        ) : (
          <>
            <Link to="login">Login</Link>

            <Link to="signup">Sign up</Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
