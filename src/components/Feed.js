import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import Post from "./Post";

function Feed() {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [postsList, setPostsList] = useState();

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/posts/`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
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
      {loading && <LoadingModal />}
      {postsList && (
        <ul style={{ padding: 0 }}>
          {postsList.posts.map((item, index) => {
            return (
              <li
                key={index}
                className="d-flex flex-direction-column justify-content-center"
              >
                <Post getPostsData={getPostsData} item={item} index={index} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Feed;
