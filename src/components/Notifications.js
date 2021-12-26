import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import Notification from "./Notification";

function Notifications(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [notificationsList, setNotificationsList] = useState();
  const [friendRequestsList, setFriendRequestsList] = useState();

  useEffect(() => {
    getNotificationsData();
  }, []);

  const getNotificationsData = async () => {
    setLoading(true);

    const userId = user._id;
    const token = localStorage.getItem("token");

    axios
      .get(
        `/api/users/${userId}/notifications`,

        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setNotificationsList(response.data.user.notifications);
        setFriendRequestsList(response.data.user.recieved_friend_requests);
        console.log(response.data.user.notifications);
        console.log(response.data.user.recieved_friend_requests);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      {notificationsList &&
        notificationsList.map((item, index) => {
          return (
            <>
              <Notification
                key={index}
                getNotificationsData={getNotificationsData}
                item={item}
              />
            </>
          );
        })}
    </>
  );
}

export default Notifications;
