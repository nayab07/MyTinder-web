import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if(!user){
    return null;
  }
  const { _id, firstName, lastName, photoUrl, gender, age, about } = user;
  const dispatch = useDispatch();

  // Handle the request status (interested or ignored)
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      // Dispatch the action to remove the user from the feed
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions flex justify-center">
          {/* Use strings 'ignored' and 'interested' instead of variables */}
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("ignored", _id)} // Pass strings "ignored"
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("interested", _id)} // Pass strings "interested"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
