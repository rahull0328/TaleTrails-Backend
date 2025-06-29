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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required.",
        success: false,
      });
    }

    //checking if user with particular email exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    //password matching
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Credentials.",
        success: false,
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "72h",
      }
    );

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    return res.status(200).json({
      message: `Welcome ${user.fullName}`,
      user,
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};
