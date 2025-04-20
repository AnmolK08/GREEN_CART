import Product from "../models/product.model.js";

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imageUrl });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Product : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = Product.find({});
    res.json({ sucess: true, products });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Single Product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = Product.findById(id);
    res.json({ sucess: true, product });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ sucess: true, message: "Stock Updated successfully." });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
