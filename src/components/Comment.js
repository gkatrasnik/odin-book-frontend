import React from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Trash, TrashFill } from "react-bootstrap-icons";

function Comment(props) {
  const handleCommentDelete = (event) => {
    event.preventDefault();

    var postId = props.comment.postId;
    var commentId = props.comment._id;
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: "Bearer " + token },
      })
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
