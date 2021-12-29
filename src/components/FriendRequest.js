import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";

function FriendRequest(props) {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const acceptRequest = (event) => {
    setLoading(true);
    event.preventDefault();

    var targetUserId = props.item._id;
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/users/${targetUserId}/accept-request`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getFriendRequestsData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const denyRequest = (event) => {
    setLoading(true);
    event.preventDefault();

    var targetUserId = props.item._id;
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/users/${targetUserId}/deny-request`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getFriendRequestsData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Card style={{ width: "80%", maxWidth: "32rem", margin: "20px" }}>
        <Card.Body>
          Friend request from {props.item.firstname} {props.item.lastname}
          <Button
            variant="success"
            className="float-end"
            size="sm"
            onClick={acceptRequest}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            className="float-end"
            size="sm"
            onClick={denyRequest}
          >
            Deny
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
export default FriendRequest;
