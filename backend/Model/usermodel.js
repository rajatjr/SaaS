const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },

  lastname:{
    type: String,
    required: true

  },

  phonenumber:{
   type: Number,
   required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },

address:{
type: String,
required: true
},

  password: {
    type: String,
    required: true
  },
  
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
 
  isActive: {
    type: Boolean,
    default: true
  },
  
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;