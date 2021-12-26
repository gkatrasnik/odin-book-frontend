import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <Navigation />
        <Container>
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
              <Route exact path="/notifications" element={<Notifications />} />
            </Route>

            <Route exact path="/friendrequests" element={<PrivateRoute />}>
              <Route
                exact
                path="/friendrequests"
                element={<FriendRequests />}
              />
            </Route>

            <Route exact path="/userprofile" element={<PrivateRoute />}>
              <Route exact path="/userprofile" element={<UserProfile />} />
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
