import { createSlice } from "@reduxjs/toolkit";

export const userDetailSlice = createSlice({
    name : "userDetail",
    initialState : {
        username : localStorage.getItem("username") || "",
        email : localStorage.getItem("email") || "",
        fullname : localStorage.getItem("fullname") || "",
        profileImg : localStorage.getItem("profileImg") || "",
    },
    reducers : {
        setUserDetail : (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.profileImg = action.payload.profileImg;
        },
    },
});

export const { setUserDetail } = userDetailSlice.actions;

export default userDetailSlice.reducer;