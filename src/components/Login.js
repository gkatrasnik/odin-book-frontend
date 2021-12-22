import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = (event) => {
    props.setLoading(true);

    event.preventDefault();

    axios
      .post(`/api/users/login`, {
        username: currentUsername,
        password: currentPassword,
      })
      .then(
        (response) => {
          console.log(response);
          login(response.data.user);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.user, response.data.token);
          navigate("/");
          props.setLoading(false);
        },
        (error) => {
          alert("Can not log you in. Check user name and password");
          console.log(error);
        }
      );
  };

  return (
    <Form
      onSubmit={loginHandler}
      style={{ width: "80%", maxWidth: "32rem", margin: "auto" }}
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
