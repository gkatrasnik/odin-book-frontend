import { useState, useEffect, useContext } from "react";
import "../App.scss";

import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import Post from "./Post";
import AddPost from "./AddPost";

function Feed() {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    getPostsData();
    console.log(postsList);
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
        setPostsList(response.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <AddPost
        getPostsData={getPostsData}
        className="d-flex flex-direction-column justify-content-center"
      />
      <h1 className="center mt-3">Timeline</h1>
      {postsList.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {postsList.map((item, index) => {
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
      ) : (
        <div className="center">
          <h2 className="text-muted mt-3">No posts...</h2>
          <h5 className="text-muted">Add some friends to see their posts</h5>
        </div>
      )}
    </>
  );
}

export default Feed;
