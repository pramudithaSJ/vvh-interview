const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const UserRouter = require("./Routes/user-route");
const ProductRouter = require("./Routes/product-route");
const CartRouter = require("./Routes/cart-route");

app.use("/api/user", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
