import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {
  const feed = useSelector((store) => store.feed);
 
  
  const dispatch = useDispatch();
  

  const getFeed = async () => {
    if (feed && feed.length > 0) return;  

      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
     
      
        dispatch(addFeed(res?.data));
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    getFeed();
  }, []);  // You can change the dependency based on the need

  if(!feed) return;
  if(feed.length<=0 )return <h1>No more User</h1>
  return (
    feed && feed.length > 0 ? (
      <div className="flex justify-center mt-5">
        <UserCard user={feed[0]} />
      </div>
    ) : (
      <p>Loading feed...</p>
    )
  );
  
};

export default Feed;
