import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    email: null,
    useName: null,
    userID: null,
    user:false,
    allUser: false
}
const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTICE_USER: (state, action) => {
            state.isLoggedin = true
            state.email = action.payload.email
            state.useName = action.payload.useName
            state.userID = action.payload.userID
        },
        REMOVE_ACTICE_USER: (state, action) => {
            state.isLoggedin = false
            state.email = null
            state.useName = null
            state.userID = null
        },
        ADD_ALL_USERS: (state, action) => {
            state.allUser = action.payload
            let userFind = action.payload.find(ele => ele.email === state.email)
            state.user = userFind
        }
    }
})
export let { SET_ACTICE_USER, REMOVE_ACTICE_USER, ADD_ALL_USERS } = auth.actions
export default auth.reducer