import { useState, useContext } from "react";
import { Form, Button, Card, Nav } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import { BoxArrowInUp } from "react-bootstrap-icons";

function Login(props) {
  const [loading, setLoading] = useState(false);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = (event) => {
    setLoading(true);

    event.preventDefault();

    axios
      .post(`/api/users/login`, {
        username: currentUsername,
        password: currentPassword,
      })
      .then(
        (response) => {
          login(response.data.user);
          localStorage.setItem("token", response.data.token);

          setLoading(false);
          navigate("/");
        },
        (error) => {
          setLoading(false);

          alert("Can not log you in. Check user name and password");
          console.log(error);
        }
      );
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Card
        style={{ width: "90%", maxWidth: "32rem", margin: "auto" }}
        className="box-shadow"
      >
        <Card.Body>
          <h1 className="center">Log in</h1>
          <Form
            onSubmit={loginHandler}
            style={{ width: "90%", maxWidth: "32rem", margin: "auto" }}
          >
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => {
                  setCurrentUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="float-end">
              Log in
            </Button>
          </Form>
          <Nav.Link
            as={Link}
            to="/signup"
            eventKey="9"
            className="float-start mx-2"
          >
            <BoxArrowInUp /> Sign up
          </Nav.Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
