import React, { Component } from "react";
import formatCurrency from "../util";
import "./Product.css";

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => {
            return (
              <li className="product" key={product._id}>
                <div className="product-container">
                  <a href={"#" + product._id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.title}
                    />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
