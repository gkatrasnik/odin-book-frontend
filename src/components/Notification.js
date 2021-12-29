import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";

function Notification(props) {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const readNotification = (event) => {
    setLoading(true);
    event.preventDefault();

    var notificationId = props.item._id;

    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/notifications/${notificationId}/delete`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getNotificationsData();
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
          {props.item.text}
          <Button
            variant="danger"
size="sm"
            onClick={readNotification}
            className="float-end"
          >
            Read
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
export default Notification;
