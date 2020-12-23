import "./index.css";
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")),
    };
  }

  createOrder = (order) => {
    alert("need to save order for " + order.name);
  };

  addToCart = (product) => {
    console.log("addToCart triggered");
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    console.log(product);
    const cartItemsNew = cartItems.filter((item) => item._id !== product._id);
    this.setState({
      cartItems: cartItemsNew,
    });
    console.log(cartItemsNew);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsNew));
  };

  render() {
    return (
      <div>
        <Provider store={store}>
          <div className="grid-container">
            <header>
              <a href="/">React Shopping Cart</a>
            </header>
            <main>
              <div className="content">
                <div className="main">
                  <Filter></Filter>
                  <Products
                    className="products"
                    addToCart={this.addToCart}
                  ></Products>
                </div>
                <div className="sidebar">
                  <Cart
                    cartItems={this.state.cartItems}
                    removeFromCart={this.removeFromCart}
                    createOrder={this.createOrder}
                  ></Cart>
                </div>
              </div>
            </main>
          </div>
          <footer>All right reserved</footer>
        </Provider>
      </div>
    );
  }
}

export default App;
