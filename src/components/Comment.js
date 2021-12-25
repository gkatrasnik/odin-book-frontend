import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Trash, TrashFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";

function Comment(props) {
  const { user } = useContext(UserContext);

  const handleCommentDelete = (event) => {
    event.preventDefault();
    var postId = props.postId;
    var commentId = props.comment._id;
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/posts/${postId}/comments/${commentId}/delete`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getPostsData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card.Text comment={props.comment}>
      {props.comment.user.firstname} {props.comment.user.lastname}
      {": "}
      {props.comment.text}
      <Button
        variant="danger"
        onClick={handleCommentDelete}
        className="float-end"
      >
        <Trash />
      </Button>
    </Card.Text>
  );
}
export default Comment;