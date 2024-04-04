import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: false,
        success: false,
        carts: [],
        order: [],
        bill: {},
        stepOrder: 0,
    },
    reducers: {
        handleAddProductToCart: (state:any, action) => {
            const existingObjIndex = state.carts.findIndex(
              (item:any) => item.id === action.payload.id
            );
            if (existingObjIndex !== -1) {
              state.carts[existingObjIndex].quantity += action.payload.quantity;
            } else {
              state.carts.push(action.payload);
            }
      
            message.success("Bạn đã thêm sản phẩm vào giỏ hàng thành công.");
        },

        handleRemoveProductToCart: (state:any, action) => {
            const newCarts = state.carts.filter((item:any) => {
                return item.id !== action.payload;
            });
            state.carts = newCarts;
        },

        handleQuantity: (state:any, action) => {
            const updateCartOrOrder = (collection:any) => {
                const existingObj = collection?.find(
                    (item:any) => item.id === action.payload.id
                );
                if (existingObj) {
                    existingObj.quantity = action.payload.quantity;
                } else {
                    collection.push(action.payload);
                }
            };
            updateCartOrOrder(state.carts);
        },

        handleProductToOrder: (state:any, action) => {
            state.order = action.payload[0].filter((item:any) => {
              return action.payload[1].includes(item.id);
            });
        },

        handleStepOrder: (state, action) => {
            if (action.payload == "next") {
                state.stepOrder += 1;
            } else if (action.payload == "prev") {
                state.stepOrder -= 1;
            } else if (typeof action.payload === "number") {
                state.stepOrder = action.payload;
            }
        },
    }
})  

export const { handleAddProductToCart, handleRemoveProductToCart, handleQuantity, handleProductToOrder, handleStepOrder } = orderSlice.actions;

export default orderSlice.reducer;
