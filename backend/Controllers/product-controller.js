const ProductModel = require("../Models/product-model");

class ProductController {
  static async getAllProducts(req, res) {
    const AllProduct = await ProductModel.find();
    try {
      return res.status(200).json({
        success: true,
        data: AllProduct,
        message: "Products fetched succesfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
