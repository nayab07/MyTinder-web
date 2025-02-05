import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
     
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center space-x-4 my-5">
        {/* Form Container */}
        <div className="p-5 bg-base-300 mt-2 mb-9 w-full max-w-[400px] rounded-md">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <form className="space-y-4">
            {error && <div className="text-red-500 mt-2">{error}</div>}

            {/* First Name and Last Name in the same row on larger screens */}
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
              {/* First Name */}
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              {/* Last Name */}
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>

            {/* PhotoUrl */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                PhotoUrl
              </label>
              <input
                id="photoUrl"
                type="text"
                name="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age"
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <input
                id="gender"
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* About */}
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <input
                id="about"
                type="text"
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              className="mt-4 p-2 w-full text-white bg-blue-500 rounded-md"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* UserCard */}
        <div className="p-5 w-full max-w-[400px]">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, about, gender }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Update successful.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
