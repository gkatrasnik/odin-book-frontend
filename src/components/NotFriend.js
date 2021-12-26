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
  }, [props.sentReqestsList]);

  const getSentRequests = () => {
    let sentRequests = [];
    props.sentReqestsList.forEach((element) => sentRequests.push(element._id));
    console.log(sentRequests);

    //like or unlike post
    if (sentRequests.includes(props.item._id)) {
      setRequestSent(true);
      console.log("sent request");
    } else {
      setRequestSent(false);
      console.log("NOT sent request");
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
        props
          .getSentRequests()

          .then(setLoading(false));
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
        props
          .getSentRequests()

          .then(setLoading(false));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Link to="/UserProfile" state={{ targetUser: props.item }}>
          {props.item.firstname} {props.item.lastname}
        </Link>
        {requestSent ? (
          <Button
            variant="danger"
            onClick={handleUnsendFriendRequest}
            className="float-end"
          >
            <XCircle />
          </Button>
        ) : (
          <Button
            variant="danger"
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
