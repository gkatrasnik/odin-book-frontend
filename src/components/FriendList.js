import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import { UserContext } from "../contexts/UserContext";
import Friend from "./Friend";

function FriendList() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [friendsList, setFriendsList] = useState();

  useEffect(() => {
    getFriendsData();
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
        setFriendsList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1 className="center">Friends</h1>
      {friendsList && (
        <ul style={{ padding: 0 }}>
          {friendsList.friends.map((item, index) => {
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
      )}
    </>
  );
}

export default FriendList;
