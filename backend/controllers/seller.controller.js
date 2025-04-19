import jwt from "jsonwebtoken";

//Login seller : /api/seller/login

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const sellerToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("sellerToken", sellerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.json({
        success: true,
        message: "LoggedIn",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentails",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Check-auth : /api/seller/is-auth

const isSellerAuth = async (req, res) => {
  try {
    return res.json({ sucess: true});
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};

// Logout seller : /api/seller/logout
const sellerLogout = async (req, res) => {
    try {
      res.clearCookie('sellerToken' , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      return res.json({ sucess: true, message: "Logged Out" });
    } catch (error) {
      console.log(error.message);
      res.json({ sucess: false, message: error.message });
    }
  };

  export default { sellerLogin , isSellerAuth , sellerLogout}