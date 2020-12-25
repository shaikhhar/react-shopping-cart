import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { clearOrder, createOrder } from "../actions/orderActions";
import Modal from "react-modal";
import Zoom from "react-reveal";

import formatCurrency from "../util";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
    this.setState({ showCheckout: false });
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    console.log("cartItems ", cartItems);
    console.log("order ", order);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart
          </div>
        )}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="order-details">
                <h2 className="success-message">Your order has been placed</h2>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name: </div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email: </div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Total: </div>
                    <div>formatCurrency{order.total}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {" "}
                          {x.count} x {x.title}{" "}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}

        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => {
                return (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="remove-button"
                          onClick={() =>
                            this.props.removeFromCart(cartItems, item)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {cartItems.length > 0 ? (
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button onClick={() => this.setState({ showCheckout: true })}>
                  Proceed
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {this.state.showCheckout && (
            <div className="cart">
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <button type="submit">Checkout</button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
