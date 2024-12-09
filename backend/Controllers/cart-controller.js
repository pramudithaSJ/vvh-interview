const CartModel = require("../Models/cart-model");

class CartController {
  static async createCart(req, res) {
    try {
      const userId = req.user.id;

      console.log(userId);

      console.log(req.body);

      const isCartAvailable = await CartModel.findOne({
        userId: userId,
      });

      console.log(isCartAvailable);

      if (!isCartAvailable) {
        //save new cart
        const newCart = new CartModel({
          userId: userId,
          cart: req.body.itemData,
        });
        const savedCart = await newCart.save();
        console.log(savedCart);

        return res.status(201).json({
          success: true,
          data: savedCart,
          message: "Cart saved succesfully",
        });
      } else {
        console.log("cart already exist");
        //update cart
        const updatedCart = await CartModel.findOneAndUpdate(
          { userId: userId },
          //itemeData is an object
          
          req.body.itemData,
          { new: true }
        );
        return res.status(201).json({
          success: true,
          data: updatedCart,
          message: "Cart updated succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getCartByUserId(req, res) {
    const userId = req.user.id;

    const cartDetails = await CartModel.findOne({
      userId: userId,
    });
    return res.status(200).json({
      success: true,
      data: cartDetails,
      message: "Cart fetch succesfully",
    });
  }

  static async deleteCart(req, res) {
    const result = await CartModel.findByIdAndDelete(req.params.id);

    if (result) {
      return res.status(200).json({
        success: true,
        data: cartDetails,
        message: "Cart Deleted succesfully",
      });
    }
  }
}

module.exports = CartController;
