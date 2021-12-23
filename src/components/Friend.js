
import React, { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { TrashFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";

function Friend(props) {
  const { user } = useContext(UserContext);

   

  const handleFriendDelete = (event) => {
    event.preventDefault();
    
    
    var postId = props.item._id;
    const token = localStorage.getItem("token");

    
    axios
      .delete(`/api/users/${currentUserId}/delete-friend`, {
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
  <Card.Body>{props.item.user.firstName} {props.item.user.lastName} </Card.Body>
</Card>
  )
}

export default Friend;


