import React, { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { TrashFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";

function Post(props) {
  const { user } = useContext(UserContext);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  let comments = props.item.comments;
  console.log(comments);

  const handleCommentAdd = (event) => {
    event.preventDefault();
    if (!commentContent) {
      alert(" Comment can not be empty!");
      return;
    }

    const token = localStorage.getItem("token");

    var postId = props.item._id;
    axios
      .post(
        `/api/posts/${postId}/comments/new-comment`,
        {
          userId: user._id,
          text: commentContent,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(
        (response) => {
          setCommentContent("");
          setShowCommentForm(!showCommentForm);
          props.getPostsData();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handlePostDelete = (event) => {
    event.preventDefault();
    //handle post delete
    var postId = props.item._id;
    const token = localStorage.getItem("token");

    //handle post delete (it deletes its comments too)
    axios
      .delete(`/api/posts/${postId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        props.getPostsData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card style={{ width: "80%", maxWidth: "32rem", margin: "20px" }}>
      <Card.Body>
        <Card.Title className="text-center">
          {props.item.title}{" "}
          <Button
            variant="danger"
            onClick={handlePostDelete}
            className="float-end"
          >
            <TrashFill />
          </Button>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Author: {props.item.user.firstname} {props.item.user.lastname}
        </Card.Subtitle>
        <Card.Text>{props.item.text}</Card.Text>

        <br />
        <Card.Text>Comments:</Card.Text>

        {comments.map((comment, index) => {
          return (
            <Comment
              getPostsData={props.getPostsData}
              comment={comment}
              key={index}
            />
          );
        })}
        <Button
          variant="primary"
          className="float-end my-2"
          onClick={() => {
            setShowCommentForm(!showCommentForm);
          }}
        >
          Comment
        </Button>
        {showCommentForm && (
          <Form onSubmit={handleCommentAdd}>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Text:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your comment"
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;
