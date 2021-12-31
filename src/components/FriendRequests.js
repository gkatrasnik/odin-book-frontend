import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import FriendRequest from "./FriendRequest";

function FriendRequests(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [friendRequestsList, setFriendRequestsList] = useState([]);

  useEffect(() => {
    getFriendRequestsData();
  }, []);

  const getFriendRequestsData = async () => {
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
        setFriendRequestsList(response.data.user.recieved_friend_requests);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1 className="center mt-2">Friend Requests</h1>

      {friendRequestsList.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {friendRequestsList.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <FriendRequest
                  key={index}
                  getFriendRequestsData={getFriendRequestsData}
                  setTrigger={props.setTrigger}
                  trigger={props.trigger}
                  item={item}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="center text-muted mt-3">No friend requests...</h2>
      )}
    </>
  );
}

export default FriendRequests;
