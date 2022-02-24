import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/core/Home";
import Users from "./components/user/Users";
import Signup from "./components/user/Signup";
import Signin from "./components/auth/Signin";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/auth/PrivateRoute";
import EditProfile from "./components/user/EditProfile";

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
