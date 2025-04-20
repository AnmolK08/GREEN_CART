import Address from "../models/address.model.js";

// Add Address : /api/address/add

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({ ...address, userId });
    res.json({ sucess: true, message: "Address Added Successfully." });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: ture, message: error.message });
  }
};

// Get Addresses : /api/address/get

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const addresses = await Address.find({ userId });
    res.json({ sucess: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: ture, message: error.message });
  }
};
