const Organization = require('../Model/organizationmodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new organization  

exports.createOrganization = async (req, res) => {
  try {
    const { name, email, password } = req.body.formData;
    const subscriptionId = req.body.planid
    console.log("res", req.body)
    // Create a new organization instance

    const organization = new Organization({
      name: name,
      email: email,
      password: password,
      subscriptionId: subscriptionId,

    });

    // Save the organization to the database
    await organization.save();

    return res.status(201).json({ success: true, organization });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



exports.loginorganization = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Organization.findOne({ email });

    if (user && String(user.password) === String(password)) {
      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, 'secretkey');
      console.log('tokenOrg', token);

      return res.status(200).json({ success: true, token });
    }

    res.status(401).json({ success: false, msg: 'Invalid user credentials' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};




// Get all organizations

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate("subscriptionId")
    const name = await organizations[0].subscriptionId.name
    console.log("res",name)
    return res.status(200).json({ success: true, organizations ,name:name});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get organization by ID(DONE)

exports.getOrganizationById = async (req, res) => {

  try {
    const _id = req.params;
    const organization = await Organization.findById(_id);

    if (!organization) {
      return res.status(404).json({ success: false, msg: 'Organization not found' });
    }

    return res.status(200).json({ success: true, organization });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update organization by ID

exports.updateOrganizationById = async (req, res) => {
  try {
    const _id = req.params;
    const updateData = req.body;
    const organization = await Organization.findByIdAndUpdate(_id, updateData, { new: true });

    if (!organization) {
      return res.status(404).json({ success: false, msg: 'Organization not found' });
    }

    return res.status(200).json({ success: true, organization });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete organization by ID

exports.deleteOrganizationById = async (req, res) => {
  try {
    const _id = req.params;
    const organization = await Organization.findByIdAndRemove(_id);

    if (!organization) {
      return res.status(404).json({ success: false, msg: 'Organization not found' });
    }

    return res.status(200).json({ success: true, msg: 'Organization deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
