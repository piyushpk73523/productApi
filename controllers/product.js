const Product = require("../models/product");

const getAllProduct = async (req, res) => {
  try {
    const { company, featured, name, sort, select } = req.query;
    const queryObject = {};

    if (company) {
      queryObject.company = company;
    }

    if (featured) {
      queryObject.featured = featured;
    }

    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
      const sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
    }

    if (select) {
      const selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    const myData = await apiData;

    res.status(200).json({ nbHits: myData.length, data: myData });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in getting products", error: error.message });
  }
};

const getAllProductTesting = async (req, res) => {
  try {
    const myData = await Product.find({ ...req.query }).select("name company");
    res
      .status(200)
      .json({ msg: "I am getting all product testing", data: myData });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in getting products", error: error.message });
  }
};

module.exports = { getAllProduct, getAllProductTesting };
