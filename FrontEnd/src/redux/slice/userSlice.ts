import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: false,
        listUser: [],
        success: false,
    },
    reducers: {
        getAllStart: (state) => {
            state.loading = true;
        },
        getAllSuccess: (state, action) => {
            return{
                ...state,
                listUser: action.payload,
                loading: false,
            }
        },
        getAllFail: (state) => {
            return{
                ...state,
                listUser: [],
                loading: false,
                error: true,
            } 
        }
    }
})  

export const { 
    getAllStart,
    getAllSuccess,
    getAllFail
} = userSlice.actions;

export default userSlice.reducer;