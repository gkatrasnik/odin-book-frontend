import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

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
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="signup">Sign up</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
