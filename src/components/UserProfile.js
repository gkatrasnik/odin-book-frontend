import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import Post from "./Post";

function UserProfile() {
  const location = useLocation();
  const { targetUser } = location.state; //user passed from Link (friends/suggestions page)

  const [loading, setLoading] = useState(false);
  const [postsList, setPostsList] = useState();

  useEffect(() => {
    getUsersPosts();
  }, []);

  const getUsersPosts = async () => {
    setLoading(true);
    const userId = targetUser._id;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/posts/${userId}/posts`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setPostsList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>
        {targetUser.firstname} {targetUser.lastname}
      </h1>
      <>
        {loading && <LoadingModal />}
        {postsList && (
          <ul style={{ padding: 0 }}>
            {postsList.posts.map((item, index) => {
              return (
                <li
                  key={index}
                  className="d-flex flex-direction-column justify-content-center"
                >
                  <Post
                    getPostsData={getUsersPosts}
                    item={item}
                    index={index}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </>
    </>
  );
}

export default UserProfile;
