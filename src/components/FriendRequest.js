import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
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
        props.setTrigger(props.trigger + 1);
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
        props.setTrigger(props.trigger + 1);
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
      <Card
        style={{ width: "90%", maxWidth: "32rem", margin: "20px" }}
        className="box-shadow"
      >
        <Card.Body>
          {props.item.firstname} {props.item.lastname} wants to be your friend
          <div className="float-end">
            <Button
              variant="success"
              className="mx-1"
              size="sm"
              onClick={acceptRequest}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              className=" mx-1"
              size="sm"
              onClick={denyRequest}
            >
              Deny
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default FriendRequest;
