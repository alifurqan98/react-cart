import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
    {
        cartItems: [],
        SubTotal: 0,
        Shipping: 0,
        Tax: 0,
        Total: 0,
    },
    {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExit = state.cartItems.find((i) => i.id === item.id);
            if (isItemExit) {
                state.cartItems.forEach((i) => {
                    if (i.id === item.id) i.quantity += 1;
                });
            } else {
                state.cartItems.push(item);
            }
        },
        decrement: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload); //particular item
            if (item.quantity > 1) {
                state.cartItems.forEach((i) => {
                    if (i.id === item.id) i.quantity -= 1;
                });
            }
        },
        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i.id !== action.payload
            );
        },
        CalculateSum: (state) => {
            let sum = 0;
            state.cartItems.forEach((i) => (sum += i.price * i.quantity));
            state.SubTotal = sum;
            state.Shipping = state.SubTotal > 1000 ? 0 : 200;
            state.Tax = +(state.SubTotal * 0.18).toFixed();
            state.Total = +(
                state.SubTotal +
                state.Shipping +
                state.Tax
            ).toFixed();
        },
    }
);
