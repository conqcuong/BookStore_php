import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'account',
    initialState: {
        loading: false,
        error: false,
        currentUser: null,
        success: false,
    },
    reducers: {
        // Login
        loginStart: (state) =>{
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        //Get Login
        getLoginStart: (state) =>{
            state.loading = true;
        },
        getLoginSuccess: (state, action) => {
            return{
                ...state,
                currentUser: action.payload,
                loading: false,
            }
        },
        getLoginFail: (state) => {
            return{
                ...state,
                currentUser: null,
                loading: false,
                error: true
            }
        },
        // Create
        createStart: (state) =>{
            state.loading = true;
        },
        createSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        createFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        // Logout
        logoutSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
        },
    }
})

export const { 
    loginStart,
    loginFail,
    loginSuccess,
    createStart,
    createSuccess,
    createFail,
    getLoginStart,
    getLoginSuccess,
    getLoginFail,
    logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;