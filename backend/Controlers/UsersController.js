const User = require("../Model/usermodel"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Organization = require("../Model/organizationmodel");

// Sign Up Users

exports.UserSingup = async (req, res) => {
  const { firstname,lastname,phonenumber, email, address, password, confirmPassword, organizationId } = req.body;
      console.log("req.body",req.body)
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  }

  try {

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10); // Salt factor of 10

    // Create a new user document in MongoDB
    const createUser = await User.create({
      firstname:firstname,
      lastname:lastname,
      phonenumber:phonenumber,
      email:email,
      address:address,
      password:hashPassword,
      confirmPassword:confirmPassword,
      organizationId:organizationId,
    });

    res.json({ success: true, msg: "User Registered Successfully", createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Login Users

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in MongoDB
    const user = await User.findOne({ email });

    if (user) {
      if (!user.isActive) {
        res.status(401).json({ success: false, msg: "User is inactive. Cannot login." });
      } else {
        const cmpPwd = await bcrypt.compare(password, user.password);

        if (cmpPwd) {
          const token = jwt.sign({ user }, "secretkey");
          res.status(200).json({ success: true, token });
        } else {
          res.status(401).json({ success: false, msg: "Invalid password" });
        }
      }
    } else {
      res.status(401).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error", error: error.message });
  }
};

//get user

exports.getuser = async (req, res)=>{
  const {orgId}=req.query
  const findplan=await Organization.find({_id:orgId}).populate("subscriptionId")
  const name=await findplan[0].subscriptionId.name
  const price=await findplan[0].subscriptionId.price
  console.log(price);
  console.log("findplan",findplan)
  const getuser=await User.find({organizationId:orgId})
  if(getuser){
    return res.status(200).json({
      success:true,
      getuser:getuser,
      plan:name,
      price:price
    })
  }
};

exports.GetAllUser =async(req,res)=>{
  try {
    const getallUser = await User.find()
    if(getallUser){
      return res.status(200).json({success:true ,msg :"User" ,getallUser:getallUser})

    }else{
      return res.status(404).json({success:false ,msg:"no user"})
    }
  } catch (error) {
    console.error(error)
    
  }
}

// Isactive

exports.UpdateActive = async(req,res)=>{
  const _id = req.params._id;
  const {isActive} = req.body;

  try {
    const updateactive =await User.findByIdAndUpdate(_id, { isActive});
    if (!updateactive) {
      return res.status(404).json({ error: "User not found" });
    }

    let msg = isActive ? " User has been Activated" : "User has been Deactiveted";
    res.status(200).json({ msg });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Internal server error"})
    
  }
};



// Delete User

exports.DeleteUser = async (req, res) => {
  
  const _id = req.params._id; 

  try {
  
    const deletedUser = await User.findByIdAndRemove(_id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, msg: "User has been deleted", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
