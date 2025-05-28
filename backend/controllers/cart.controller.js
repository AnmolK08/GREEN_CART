import User from "../models/user.model.js";

// Update User Cart Data : /api/cart/uodate;

export const updateCart = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: " Cart Updated." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};
