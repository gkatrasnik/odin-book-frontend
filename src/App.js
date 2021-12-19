import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
import OdinBook from "./components/OdinBook";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <Navigation />
        <Container>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<OdinBook />} />
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
