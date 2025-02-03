import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;  // Updating the state with the fetched feed data
    },
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // Filtering out the user by _id
    },
  },
});

export const { addFeed,removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
