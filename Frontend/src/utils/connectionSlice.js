import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>action.payload,
        removeConnetion:()=>null,
    },
});


export const{addConnection,removeConnetion}=connectionSlice.actions;

export default connectionSlice.reducer;