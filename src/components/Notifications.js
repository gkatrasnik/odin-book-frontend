import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import Notification from "./Notification";

function Notifications(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [notificationsList, setNotificationsList] = useState([]);

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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1 className="center mt-2">Notifications</h1>

      {notificationsList.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {notificationsList.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <Notification
                  key={index}
                  getNotificationsData={getNotificationsData}
                  item={item}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="center text-muted mt-3">No notifications...</h2>
      )}
    </>
  );
}

export default Notifications;
