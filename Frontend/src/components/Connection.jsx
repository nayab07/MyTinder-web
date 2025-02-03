import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConncetion = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConncetion();
  }, []);

  if (!connection) return;

  if (connection.length === 0) return <h1> No connection found</h1>;

  return (
    <div>
      <h1 className="flex justify-center font-bold">Connection</h1>

      {/* Loop over connections */}
      {connection.map((connection, index) => {
        // Changed "connection" to "conn" to avoid name conflict
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection; // Destructure the connection

        return (
          <div
            key={index}
            className="bg-base-300 p-6 w-full max-w-sm mx-auto mt-10 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-4">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="User Photo"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <span className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white">
                  No Photo
                </span>
              )}

              <div className="flex-grow">
                <h3 className="text-xl font-bold">
                  {firstName} {lastName}
                </h3>
                <p className="text-sm text-gray-600">Age: {age}</p>
                <p className="text-sm text-gray-600">Gender: {gender}</p>
                <p className="text-sm text-gray-600">
                  About: {about || "No information available"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              {/* Additional action buttons can go here */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
