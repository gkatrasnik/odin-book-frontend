import React, { useState, useContext } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal"
import { UserContext } from "../contexts/UserContext";
import NotFriend from "./NotFriend"

function FriendSuggestions() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [suggestionsList, setSuggestionsList] = useState();

  useEffect(() => {
    getSuggestionsData();
  }, []);

  const getSuggestionsData = async () => {
    setLoading(true);
    const userId = user._id
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/users/${userId}/notfriends`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setSuggestionsList(response.data, console.log(response.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };



  return (
    <>
      {loading && <LoadingModal />}
      {suggestionsList && (
        <ul style={{ padding: 0 }}>
          {suggestionsList.notfriends.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <NotFriend getSuggestionsData={getSuggestionsData} item={item} index={index} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default FriendSuggestions;
