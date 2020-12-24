import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  console.log("addtoCart triggered");
  console.log("cartItems", getState());
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (items, product) => (dispatch) => {
  console.log("removeFromCart items", items);

  console.log("removeFromCart product", product);
  const cartItems = items.slice().filter((x) => x._id !== product._id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems: cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
