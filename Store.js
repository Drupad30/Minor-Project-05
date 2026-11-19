import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load saved cart from Local Storage
const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : { items: [] };
  } catch (error) {
    console.error("Could not load cart:", error);
    return { items: [] };
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: {
    cart: loadCart()
  }
});

// Save cart whenever Redux state changes
store.subscribe(() => {
  try {
    localStorage.setItem(
      "cart",
      JSON.stringify(store.getState().cart)
    );
  } catch (error) {
    console.error("Could not save cart:", error);
  }
});