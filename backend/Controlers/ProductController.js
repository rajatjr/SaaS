const Product = require("../Model/productmodel");

// Create a new product with an image upload
exports.createProduct = async (req, res) => {
  try {
    // Validate request body
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ success: false, errors: errors.array() });
    // }

    const { productname, brand, price, quantity, UserId, organizationId, isActive = true } = req.body;

    // Check if a file is included in the request
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Image file is required' });
    }

    // File path of the uploaded image
    const imagePath = req.file.path;

    // Create a new product instance with the image path
    const product = new Product({
      productname,
      brand,
      price,
      quantity,
      UserId,
      organizationId,
      isActive,
      Image: imagePath, // Save the image path in the database
    });

    // Save the product to the database
    await product.save();

    return res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all products

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {
        UserId:req.query.UserId
      }
    ).populate('UserId organizationId');
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Get a single product by ID

exports.getProductById = async (req, res) => {
  try {
    const _id = req.params._id;
    const product = await Product.findById({_id:_id});

    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};



exports.updateProductById = async (req, res) => {
  try {
    const _id = req.params._id;
    const updates = {
      productname: req.body.productname,
      brand: req.body.brand,
      price: req.body.price,
      quantity: req.body.quantity,
      // Image: req.body.Image,
    };

    // Check if the product with the given ID exists
    const product = await Product.findByIdAndUpdate(_id, updates, {
      new: true, // This option returns the updated document
      runValidators: true, // This option ensures that validators are run
    });

    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    return res.status(200).json({ success: true, msg: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};



// Delete a product by ID

exports.deleteProductById = async (req, res) => {
  try {
    const _id = req.params._id;
    const product = await Product.findByIdAndRemove({_id:_id});

    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product not found' });
    }

    return res.status(200).json({ success: true, msg: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


exports.searchProducts = async (req, res) => {
  try {
    const { productname } = req.body;

    // Check if the provided productname is valid
    if (!productname) {
      return res.status(400).json({ success: false, message: 'Product name is required.' });
    }

    // Use a regular expression with the 'i' flag for case-insensitive search
    const regexPattern = new RegExp(productname, 'i');

    // Find products that match the search term using Mongoose
    const results = await Product.find({
      productname: { $regex: regexPattern },
    });

    return res.json({ success: true, products: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};