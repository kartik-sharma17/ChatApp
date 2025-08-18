import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "./interface";

const initialState: UserDataType = {
    userData: {},
    token: "",
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token || null;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.userData = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer