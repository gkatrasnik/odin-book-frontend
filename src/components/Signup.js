import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./LoadingModal";

function Signup() {
  const [loading, setLoading] = useState(false);

  const [currentFirstname, setCurrentFirstname] = useState("");

  const [currentLastname, setCurrentLastname] = useState("");

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPassword2, setCurrentPassword2] = useState("");

  const navigate = useNavigate();

  const signupHandler = (event) => {
    setLoading(true);

    event.preventDefault();

    if (currentPassword === currentPassword2) {
      axios
        .post(`/api/users/register`, {
          username: currentUsername,
          password: currentPassword,
          firstname: currentFirstname,
          lastname: currentLastname,
        })
        .then(
          (response) => {
            setLoading(false);

            navigate("/");
          },
          (error) => {
            setLoading(false);

            console.log(error);
          }
        );
    } else {
      alert("Passwords doesn't match!");
    }
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1 className="center">Sign up</h1>
      <Form
        style={{ width: "80%", maxWidth: "32rem", margin: "auto" }}
        onSubmit={signupHandler}
      >
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            onChange={(e) => {
              setCurrentFirstname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            onChange={(e) => {
              setCurrentLastname(e.target.value);
            }}
          />
        </Form.Group>

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
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setCurrentPassword2(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" class="mx-auto">
          Sign up
        </Button>
      </Form>
    </>
  );
}

export default Signup;
