import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import { UserContext } from "../contexts/UserContext";
import Friend from "./Friend";

function FriendList() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    getFriendsData();
    console.log(friendsList);
  }, []);

  const getFriendsData = async () => {
    setLoading(true);
    const userId = user._id;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/users/${userId}/friends`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setFriendsList(response.data.friends);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1 className="center mt-2">Friends</h1>
      {friendsList.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {friendsList.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <Friend
                  getFriendsData={getFriendsData}
                  item={item}
                  index={index}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="center text-muted">No friends...</h2>
      )}
    </>
  );
}

export default FriendList;
