import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./contexts/UserContext";
import FriendList from "./components/FriendList";
import FriendSugestions from "./components/FriendSugestions";
import Notifications from "./components/Notifications";
import UserProfile from "./components/UserProfile";
import FriendRequests from "./components/FriendRequests";
import SinglePost from "./components/SinglePost";

function App() {
  //trigger state is set when notification/friend request is read to rerender app and update navigation badge display
  const [trigger, setTrigger] = useState(0);

  return (
    <HashRouter>
      <UserProvider>
        <Navigation trigger={trigger} setTrigger={setTrigger} />
        <Container className="pt-3">
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Feed />} />
            </Route>

            <Route exact path="/friendlist" element={<PrivateRoute />}>
              <Route exact path="/friendlist" element={<FriendList />} />
            </Route>

            <Route exact path="/friendsugestions" element={<PrivateRoute />}>
              <Route
                exact
                path="/friendsugestions"
                element={<FriendSugestions />}
              />
            </Route>

            <Route exact path="/notifications" element={<PrivateRoute />}>
              <Route
                exact
                path="/notifications"
                element={
                  <Notifications trigger={trigger} setTrigger={setTrigger} />
                }
              />
            </Route>

            <Route exact path="/friendrequests" element={<PrivateRoute />}>
              <Route
                exact
                path="/friendrequests"
                element={
                  <FriendRequests trigger={trigger} setTrigger={setTrigger} />
                }
              />
            </Route>

            <Route exact path="/userprofile" element={<PrivateRoute />}>
              <Route exact path="/userprofile" element={<UserProfile />} />
            </Route>

            <Route exact path="/singlepost" element={<PrivateRoute />}>
              <Route exact path="/singlepost" element={<SinglePost />} />
            </Route>

            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route to="/" />
          </Routes>
        </Container>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
