import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // Skip fetching if userData is already available
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // Add user data to the store
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login"); // Navigate to login if user is not authenticated
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login"); // If no userData, navigate to login page
    } else {
      fetchUser(); // If userData exists, fetch additional user data (if needed)
    }
  }, []); // Ensure the effect runs when userData changes

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
