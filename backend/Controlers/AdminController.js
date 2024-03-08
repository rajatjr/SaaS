const Admin = require('../Model/adminmodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Sign Up Admin....................

exports.AdminSingUp = async (req, res) => {
  try {
    const createAdmin = new Admin({
      email: "rajatpant3@gmail.com",
      password : 12345
    })

    await createAdmin.save();
    return res.status(200).json({success :true , msg:"Admin Has register"})
    
  } catch (error) {
    return res.status(500).json({success:false , error})
    
  }
};


// Login Admin..................................


exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the Admin with the given email exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, msg: "Admin not found" });
    }
    
    if (password !== admin.password) {
      return res.status(401).json({ success: false, msg: "Incorrect password" });
    }else{
      const token = jwt.sign({token : admin},"xyz")
      return res.status(200).json({ success: true, msg: "Admin logged in", token:token });
    } 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const addplans=async(req,res)=>{
  
}