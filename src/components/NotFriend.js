import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { SendPlus, XCircle } from "react-bootstrap-icons";

import { UserContext } from "../contexts/UserContext";

function NotFriend(props) {
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(); //doesnt work changing request sent

  const { user } = useContext(UserContext);

  //check if the request to this user was already sent

  useEffect(() => {
    getSentRequests();
  }, []);

  const getSentRequests = () => {
    let sentRequests = [];
    props.sentReqestsList.forEach((element) => sentRequests.push(element._id));

    //like or unlike post
    if (sentRequests.includes(props.item._id)) {
      setRequestSent(true);
    } else {
      setRequestSent(false);
    }
  };

  const handleSendFriendRequest = (event) => {
    setLoading(true);
    event.preventDefault();

    var targetUserId = props.item._id;
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
        props.getSentRequestsData();
        setRequestSent(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUnsendFriendRequest = (event) => {
    setLoading(true);
    event.preventDefault();

    var targetUserId = props.item._id;
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/users/${targetUserId}/unsend-request`,
        {
          userId: user._id, //current user
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getSentRequestsData();
        setRequestSent(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Card style={{ width: "80%", maxWidth: "32rem", margin: "20px" }}>
      <Card.Body>
        {props.item.firstname} {props.item.lastname}
        {requestSent ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUnsendFriendRequest}
            className="float-end"
          >
            <XCircle />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendFriendRequest}
            className="float-end"
          >
            <SendPlus />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default NotFriend;
