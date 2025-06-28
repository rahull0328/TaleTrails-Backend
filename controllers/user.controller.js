import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    //validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields.",
        success: false,
      });
    }

    //checking if the user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists.",
        success: false,
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //new user creation process
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "72h",
      }
    );

    return res.status(200).json({
      message: "User created successfully.",
      success: true,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during registration",
      success: false,
    });
  }
};
