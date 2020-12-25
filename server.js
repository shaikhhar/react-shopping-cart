const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortId = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.send(product);
});

app.get("/test", (req, res) => {
  return res.send("test successful");
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: { type: String, default: shortId.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  const order = await Order(req.body).save();
  res.send(order);
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("connected to http://localhost:", port);
});
