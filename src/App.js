import "./index.css";
import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
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
                  <Products className="products"></Products>
                </div>
                <div className="sidebar">
                  <Cart />
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
