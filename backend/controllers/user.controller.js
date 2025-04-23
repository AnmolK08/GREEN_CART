import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/user.model.js";


const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Login User : /api/user/login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password are required.",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Check-auth : /api/user/is-auth

const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    return res.json({ sucess: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};

// Logout User : /api/user/logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.json({ sucess: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};

export { register, login, isAuth, logout };
