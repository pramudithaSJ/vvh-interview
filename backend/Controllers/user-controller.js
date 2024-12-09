"use strict";
const UserService = require("../Services/user-service");
const UserModel = require("../Models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async createUser(req, res) {
    console.log(req.body);
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        email: email,
        password: hashedPassword,
        name: name,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res.status(201).json({ success: true, data: savedUser });
      }
    } catch (error) {
      console.log(error);
    }
  }
  catch(error) {
    console.log(error);
  }

  static async loginUser(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "user Note found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(301)
        .json({ success: true, message: "user password is incorrect" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const UserData = {
      email: user.email,
      token: token,
    };
    return res.status(200).json({
      success: true,
      data: UserData,
      message: "user logged succefully",
    });
  }
}

module.exports = UserController;
