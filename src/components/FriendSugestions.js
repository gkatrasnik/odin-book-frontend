import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import { UserContext } from "../contexts/UserContext";
import NotFriend from "./NotFriend";

function FriendSuggestions() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [suggestionsList, setSuggestionsList] = useState();
  const [sentReqestsList, setSentRequestsList] = useState([]);

  useEffect(() => {
    getSuggestionsData();
    getSentRequestsData();
  }, []);

  const getSuggestionsData = async () => {
    setLoading(true);
    const userId = user._id;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/users/${userId}/notfriends`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setSuggestionsList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getSentRequestsData = () => {
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
        setSentRequestsList(response.data.user.sent_friend_requests);

        console.log("sent requests ", response.data.user.sent_friend_requests);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <h1>Friend Suggestions</h1>
      {suggestionsList && (
        <ul style={{ padding: 0 }}>
          {suggestionsList.notfriends.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <NotFriend
                  getSuggestionsData={getSuggestionsData}
                  getSentRequestsData={getSentRequestsData}
                  sentReqestsList={sentReqestsList}
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

export default FriendSuggestions;
