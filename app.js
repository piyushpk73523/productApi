require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

//insure that the file path is correct
const product_routes = require("./routes/product");

app.get("/", (req, res) => {
  res.send("hello guys");
});

//middleware or to set routes
app.use("/api/product", product_routes);

const start = async() => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
