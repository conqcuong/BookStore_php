import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: false,
        listProduct: [],
        success: false,
        listCategory: [],
        dataListBooks: [],
    },
    reducers: {
        getAllProductStart: (state) => {
            state.loading = true;
        },
        getAllProductSuccess: (state, action) => {
            return{
                ...state,
                listProduct: action.payload,
                loading: false,
            }
        },
        getAllProductFail: (state) => {
            return{
                ...state,
                listProduct: [],
                loading: false,
                error: true,
            } 
        },

        fetchBooks: (state, action) => {
            return{
                ...state,
                dataListBooks: action.payload,
            }
        },
    }
})  

export const { 
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFail,
    fetchBooks
} = productSlice.actions;

export default productSlice.reducer;