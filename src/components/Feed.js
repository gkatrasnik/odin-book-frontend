import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function Feed(props) {
  const { user } = useContext(UserContext);

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    props.setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `/api/posts/`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setPostsList(response.data);
      console.log(response.data);
      props.setLoading(false);
    } catch (err) {
      console.log(err);
      props.setLoading(false);
    }
  };

  return <>aaa</>;
}

export default Feed;
