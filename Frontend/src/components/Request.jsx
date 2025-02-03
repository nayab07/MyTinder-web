import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../utils/requestSlice";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      // Await the axios request to ensure it completes before continuing
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {}, // The empty object is used as the body of the POST request
        { withCredentials: true }
      );
  
      
     
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error in reviewing request:", err);
    }
  };
  

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Ensure request is an array and not null
  if (!Array.isArray(request)) return <h1>Loading...</h1>;

  if (request.length === 0) return <h1>No requests</h1>;

  return (
    <div>
      <h1 className="flex justify-center font-bold mt-5">Requests</h1>

      {request.map((req) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          req.fromUserId;

        return (
          <div
            key={_id}
            className="bg-base-300 p-6 w-full max-w-md mx-auto mt-10 rounded-lg shadow-lg"
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
                  About: {about || "No information provided"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", req._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
