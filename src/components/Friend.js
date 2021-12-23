
import React, { useState, useContext } from "react";
import { Card, Button, Form, Link } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { TrashFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";

function Friend(props) {
  const { user } = useContext(UserContext);

   

  const handleFriendDelete = (event) => {
    event.preventDefault();
    
    
    var targetUserId = props.item.user._id; // DOES IT WORK??
    const token = localStorage.getItem("token");

    
    axios
      .delete(`/api/users/${targetUserId}/delete-friend`, {
        userId: user._id, //current user
      },{
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        props.getFriendsData()
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
  <Card.Body>
    <Link to="UserProfile" state={{ userId: props.item.user._id }}> {/*CHECK IF IT WORKS */}
    {props.item.user.firstName} {props.item.user.lastName}
    </Link>
  <Button
        variant="danger"
        onClick={handleFriendDelete}
        className="float-end"
      >
        <TrashFill />
      </Button>
   </Card.Body>
</Card>
  )
}

export default Friend;


