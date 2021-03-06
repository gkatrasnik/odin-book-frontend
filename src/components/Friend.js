import React, { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";

function Friend(props) {
  const { user } = useContext(UserContext);

  const handleFriendDelete = (event) => {
    event.preventDefault();

    var targetUserId = props.item._id; // DOES IT WORK??
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/users/${targetUserId}/delete-friend`,
        {
          userId: user._id, //current user
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getFriendsData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      style={{ width: "90%", maxWidth: "32rem", margin: "20px" }}
      className="box-shadow"
    >
      <Card.Body>
        <Link to="/UserProfile" state={{ targetUser: props.item }}>
          {props.item.firstname} {props.item.lastname}
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFriendDelete}
          className="float-end"
        >
          <Trash />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Friend;
