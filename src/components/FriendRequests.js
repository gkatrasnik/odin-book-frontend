import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import FriendRequest from "./FriendRequest";

function FriendRequests(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [friendRequestsList, setFriendRequestsList] = useState();

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
      <h1 className="center">Friend Requests</h1>

      {friendRequestsList &&
        friendRequestsList.map((item, index) => {
          return (
            <>
              <FriendRequest
                key={index}
                getFriendRequestsData={getFriendRequestsData}
                item={item}
              />
            </>
          );
        })}
    </>
  );
}

export default FriendRequests;
