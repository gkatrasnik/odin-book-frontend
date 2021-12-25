import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";

function Comment(props) {
  const [myComment, setMyComment] = useState(false);

  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (props.comment.user._id === user._id) {
      setMyComment(true);
    }
  }, []);
  const handleCommentDelete = (event) => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Card.Text comment={props.comment}>
        {props.comment.user.firstname} {props.comment.user.lastname}
        {": "}
        {props.comment.text}
        {myComment && (
          <Button
            variant="danger"
            onClick={handleCommentDelete}
            className="float-end"
          >
            <Trash />
          </Button>
        )}
      </Card.Text>
    </>
  );
}
export default Comment;
