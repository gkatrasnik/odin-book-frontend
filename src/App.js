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
import SinglePost from "./components/SinglePost";
import UserProfile from "./components/UserProfile";
import LoadingModal from "./components/LoadingModal";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <HashRouter>
      <UserProvider>
        <Navigation />
        <Container>
          {loading && <LoadingModal />}
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                exact
                path="/"
                element={<Feed setLoading={setLoading} />}
              />
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

            <Route exact path="/singlepost" element={<PrivateRoute />}>
              <Route exact path="/singlepost" element={<SinglePost />} />
            </Route>

            <Route exact path="/notifications" element={<PrivateRoute />}>
              <Route exact path="/notifications" element={<Notifications />} />
            </Route>

            <Route exact path="/userprofile" element={<PrivateRoute />}>
              <Route exact path="/userprofile" element={<UserProfile />} />
            </Route>

            <Route
              exact
              path="/signup"
              element={<Signup setLoading={setLoading} />}
            />
            <Route
              exact
              path="/login"
              element={<Login setLoading={setLoading} />}
            />
            <Route to="/" />
          </Routes>
        </Container>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
