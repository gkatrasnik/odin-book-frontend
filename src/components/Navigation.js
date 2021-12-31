import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import {
  Bell,
  Person,
  PersonPlus,
  PersonCheck,
  People,
  Newspaper,
  BoxArrowRight,
  BoxArrowInRight,
  BoxArrowInUp,
} from "react-bootstrap-icons";
import axios from "axios";

function Navigation(props) {
  const { user, logout } = useContext(UserContext);
  const [notificationsList, setNotificationsList] = useState([]);
  const [friendRequestsList, setFriendRequestsList] = useState([]);

  //run to update notifications when notification read
  useEffect(() => {
    getNotificationsData();
    getFriendRequestsData();

    console.log(props.triger);
  }, [props.trigger]);

  //run on login
  useEffect(() => {
    props.setTrigger(props.trigger + 1);
    console.log("strat", props.trigger);
  }, [user]);

  const getNotificationsData = async () => {
    const userId = user._id;
    const token = localStorage.getItem("token");

    axios
      .get(
        `/api/users/${userId}/notifications`,

        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setNotificationsList(response.data.user.notifications);
      })
      .catch((err) => {});
  };

  const getFriendRequestsData = async () => {
    const userId = user._id;
    const token = localStorage.getItem("token");

    axios
      .get(
        `/api/users/${userId}/notifications`,

        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setFriendRequestsList(response.data.user.recieved_friend_requests);
      })
      .catch((err) => {});
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ borderBottom: "1px solid black" }}
    >
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <h3>FAKE BOOK</h3>
          </Nav.Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" eventKey="1">
                  <Newspaper /> Timeline
                </Nav.Link>

                <Nav.Link as={Link} to="/friendlist" eventKey="2">
                  <People /> My Friends
                </Nav.Link>

                <Nav.Link as={Link} to="/friendsugestions" eventKey="3">
                  <PersonPlus /> Add Friends
                </Nav.Link>

                <Nav.Link as={Link} to="/friendrequests" eventKey="5">
                  <PersonCheck /> Friend Requests{" "}
                  {friendRequestsList.length > 0 && (
                    <Badge pill bg="danger">
                      {friendRequestsList.length}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link as={Link} to="/notifications" eventKey="4">
                  <Bell /> Notifications{" "}
                  {notificationsList.length > 0 && (
                    <Badge pill bg="danger">
                      {notificationsList.length}
                    </Badge>
                  )}
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
                  <Person /> {user.firstname} {user.lastname}
                </Nav.Link>

                <Nav.Link onClick={logout} className="text-danger" eventKey="7">
                  <BoxArrowRight /> Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login" eventKey="8">
                <BoxArrowInRight /> Login
              </Nav.Link>

              <Nav.Link as={Link} to="/signup" eventKey="9">
                <BoxArrowInUp /> Sign up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
