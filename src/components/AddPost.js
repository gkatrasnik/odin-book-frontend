import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import LoadingModal from "./LoadingModal";

function AddPost(props) {
  const [loading, setLoading] = useState(false);

  const [postContent, setPostContent] = useState("");
  const { user } = useContext(UserContext);

  const handlePostAdd = (event) => {
    if (!postContent) {
      alert("Add some text!");
      return;
    }
    setLoading(true);

    event.preventDefault();

    const userId = user._id;
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/posts/${userId}/new`,
        {
          text: postContent,
          userId: userId,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(
        (response) => {
          setPostContent("");
          props.getPostsData();
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  };
  return (
    <>
      {loading && <LoadingModal />}
      <Form
        onSubmit={handlePostAdd}
        style={{ width: "80%", maxWidth: "32rem", margin: "auto" }}
      >
        <h1 className="center">Add new post</h1>

        <Form.Group className="mb-3" controlId="content">
          <Form.Control
            type="text"
            placeholder="Write something"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Post
        </Button>
      </Form>
    </>
  );
}

export default AddPost;
