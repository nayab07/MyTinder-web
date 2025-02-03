const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User=require("../models/user")


const USER_SAFE_DATA="firstName lastName age skills photoUrl age gender about";

userRouter.get("/api/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/api/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.send(data)
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/api/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) ||10;
    limit=limit>50?50:limit;
    const skip=(page-1)*limit;


    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

     const hideUsersFromFeed=new Set();
     connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
        
     });

     const users=await User.find({
        $and:[
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}},
        ]
     }).select(USER_SAFE_DATA).skip(skip).limit(limit);

     res.send(users);
     




  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
