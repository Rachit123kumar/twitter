import { createSlice,configureStore } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        selectedUser:null
    },
    reducers:{
        setUser:function setUser(state,action){
            state.user=action.payload
            
        },
        setSelectedUser:function setSelectedUser(state,action){
            state.selectedUser=action.payload;

        },
        logout:function logout(state){
            state.selectedUser=null;
            state.user=null;
            signOut()
           
        }

    }
})
export const {setUser,setSelectedUser,logout}=userSlice.actions