import "./index.css";
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }

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
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    const cartItemsNew = cartItems.filter((item) => item._id !== product._id);
    this.setState({
      cartItems: cartItemsNew,
    });
  };

  sortProducts = (event) => {
    console.log("sort ", event.target.value);
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        return sort === "lowest"
          ? a.price < b.price
            ? -1
            : 1
          : sort === "highest"
          ? a.price > b.price
            ? -1
            : 1
          : a._id > b._id
          ? -1
          : 1;
      }),
    });
  };

  filterProducts = (event) => {
    console.log("filter ", event.target.value);
    this.setState({
      size: event.target.value,
      products: data.products.filter((product) =>
        product.availableSizes.includes(event.target.value)
      ),
    });
  };

  render() {
    return (
      <div>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Products
                  className="products"
                  products={this.state.products}
                  addToCart={this.addToCart}
                ></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                ></Cart>
              </div>
            </div>
          </main>
        </div>
        <footer>All right reserved</footer>
      </div>
    );
  }
}

export default App;
