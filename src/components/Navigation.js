import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function Navigation() {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ borderBottom: "1px solid black" }}
    >
      <Container>
        <Navbar.Brand>
          <h3>ODIN BOOK</h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" eventKey="1">
                  Feed
                </Nav.Link>

                <Nav.Link as={Link} to="friendlist" eventKey="2">
                  My Friends
                </Nav.Link>

                <Nav.Link as={Link} to="friendsugestions" eventKey="3">
                  Add Friends
                </Nav.Link>

                <Nav.Link as={Link} to="friendrequests" eventKey="5">
                  Friend Requests
                </Nav.Link>

                <Nav.Link as={Link} to="notifications" eventKey="4">
                  Notifications
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/UserProfile"
                  state={{ targetUser: user }}
                  className="text-primary"
                  eventKey="6"
                >
                  {user.firstname} {user.lastname}
                </Nav.Link>

                <Nav.Link onClick={logout} className="text-danger" eventKey="7">
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="login" eventKey="8">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="signup" eventKey="9">
                Sign up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
