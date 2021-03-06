import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { Trash, Heart, HeartFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/en-gb";

function Post(props) {
  const [myPost, setMyPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postLiked, setPostLiked] = useState();

  const { user } = useContext(UserContext);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(); // length od likes array

  moment.locale("en-gb");
  let comments = props.item.comments;
  useEffect(() => {
    if (props.item.user._id === user._id) {
      setMyPost(true);
    }
  }, []);

  useEffect(() => {
    getLikes();
  }, [props.item.likes]);

  const getLikes = () => {
    let likesUsers = [];
    props.item.likes.forEach((element) => likesUsers.push(element._id));
    setPostLikesCount(likesUsers.length);
    //like or unlike post
    if (likesUsers.includes(user._id)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  };

  const handleCommentAdd = (event) => {
    event.preventDefault();
    if (!commentContent) {
      alert(" Comment can not be empty!");
      return;
    }
    setLoading(true);
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
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  };

  const handlePostDelete = (event) => {
    setLoading(true);

    event.preventDefault();

    var postId = props.item._id;
    const token = localStorage.getItem("token");

    //handle post delete (it deletes its comments too)
    axios
      .post(
        `/api/posts/${postId}/delete`,
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

  const likePost = () => {
    setLoading(true);

    const postId = props.item._id;
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/posts/${postId}/like`,
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        props.getPostsData();
        getLikes().then(setLoading(false));
      })

      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Card
        style={{ width: "90%", maxWidth: "32rem", margin: "20px" }}
        className="box-shadow"
      >
        <Card.Header className="mb-2">
          <Link to="/userprofile" state={{ targetUser: props.item.user }}>
            {props.item.user.firstname} {props.item.user.lastname}
          </Link>

          {myPost && (
            <Button
              variant="danger"
              size="sm"
              onClick={handlePostDelete}
              className="float-end"
            >
              <Trash />
            </Button>
          )}
          <Link
            to="/singlepost"
            state={{ item: props.item }}
            className="float-end mx-2"
          >
            {moment(props.item.timestamp).format("lll")}
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Text>{props.item.text}</Card.Text>

          <br />
          <Card.Text>
            Likes: {postLikesCount}
            {postLiked ? (
              <HeartFill onClick={likePost} className="mx-2 hand" />
            ) : (
              <Heart onClick={likePost} className="mx-2 hand" />
            )}
          </Card.Text>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-light">
            Comments:
            <Button
              variant="primary"
              size="sm"
              className="float-end"
              onClick={() => {
                setShowCommentForm(!showCommentForm);
              }}
            >
              Comment
            </Button>
          </ListGroup.Item>
          {showCommentForm && (
            <ListGroup.Item className="bg-light">
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

                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="float-end"
                >
                  Submit
                </Button>
              </Form>
            </ListGroup.Item>
          )}

          {comments.map((comment, index) => {
            return (
              <ListGroup.Item className="bg-light" key={index}>
                <Comment
                  getPostsData={props.getPostsData}
                  postId={props.item._id}
                  comment={comment}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}

export default Post;
