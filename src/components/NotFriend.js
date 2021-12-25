import React, { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { SendPlus, XCircle } from "react-bootstrap-icons";

import { UserContext } from "../contexts/UserContext";

function NotFriend(props) {
  const { user } = useContext(UserContext);

  // MUST BE EDITED!!!________________________________________________________

  const handleSendFriendRequest = (event) => {
    event.preventDefault();

    var targetUserId = props.item.user._id; // DOES IT WORK??
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/users/${targetUserId}/send-request`,
        {
          userId: user._id, //current user
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getSuggestionsData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card>
      <Card.Body>
        <Link to="/UserProfile" state={{ targetUser: props.item }}>
          {props.item.firstname} {props.item.lastname}
        </Link>
        <Button
          variant="danger"
          onClick={handleSendFriendRequest}
          className="float-end"
        >
          <SendPlus />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NotFriend;
