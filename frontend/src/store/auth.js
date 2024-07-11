import {createSlice} from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,role:"usee"},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        Logout(state){
            state.isLoggedIn=false;
        },
        changeRole(state,action){
            const role=action.payload;
            state.role=role;
        },
    },
});
export const authActions =authSlice.actions;
export default authSlice.reducer;