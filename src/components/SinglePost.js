import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { TrashFill, Heart, HeartFill } from "react-bootstrap-icons";
import { UserContext } from "../contexts/UserContext";
import LoadingModal from "./LoadingModal";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment";
import "moment/locale/en-gb";

function SinglePost(props) {
  const [myPost, setMyPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postLiked, setPostLiked] = useState();

  const { user } = useContext(UserContext);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(); // length od likes array

  const location = useLocation();
  const { item, getPostsData } = location.state; //post(item) and getPostsData passed from Link (friends/suggestions page)

  let comments = item.comments;
  useEffect(() => {
    if (item.user._id === user._id) {
      setMyPost(true);
    }
  }, []);

  useEffect(() => {
    getLikes();
  }, [item.likes]);

  const getLikes = () => {
    let likesUsers = [];
    item.likes.forEach((element) => likesUsers.push(element._id));
    setPostLikesCount(likesUsers.length);
    //like or unlike post
    if (likesUsers.includes(user._id)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  };

  const handleCommentAdd = (event) => {
    setLoading(true);

    event.preventDefault();
    if (!commentContent) {
      alert(" Comment can not be empty!");
      return;
    }

    const token = localStorage.getItem("token");

    var postId = item._id;
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
          getPostsData();
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

    var postId = item._id;
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
        getPostsData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const likePost = () => {
    setLoading(true);

    const postId = item._id;
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
        getPostsData();
        getLikes().then(setLoading(false));
      })

      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Card  style={{ width: "80%", maxWidth: "32rem",  margin: "20px"}} className=" mt-2">
        <Card.Header className="mb-2">
          <Link to="/userprofile" state={{ targetUser: item.user }}>
            {item.user.firstname} {item.user.lastname}
          </Link>

          {myPost && (
            <Button
              variant="danger"
              size="sm"
              onClick={handlePostDelete}
              className="float-end"
            >
              <TrashFill />
            </Button>
          )}
          <Link
            to="/singlepost"
            state={{ item: item, getPostsData: getPostsData }}
            className="float-end mx-2"
          >
            {moment(item.timestamp).format("lll")}
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Text>{item.text}</Card.Text>

          <br />
          <Card.Text>
            Likes: {postLikesCount}
            {postLiked ? (
              <HeartFill onClick={likePost} />
            ) : (
              <Heart onClick={likePost} />
            )}
          </Card.Text>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-light">
            Comments:
            <Button
              variant="primary"
              size="sm"
              className="float-end my-2"
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
              <ListGroup.Item className="bg-light">
                <Comment
                  getPostsData={getPostsData}
                  postId={item._id}
                  comment={comment}
                  key={index}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}

export default SinglePost;
