const mongoose = require('mongoose');
const validator = require('validator');


const loanApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[0-9]{11}$/.test(v);
      },
      message: 'Phone number must be 11 digits'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18']
  },
  income: {
    type: Number,
    required: [true, 'Income is required'],
    min: [0, 'Income cannot be negative']
  },
  loanAmount: {
    type: Number,
    required: [true, 'Loan amount is required'],
    min: [50000, 'Minimum loan amount is ₦50,000']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    enum: ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Delta', 'Kaduna', 'Ogun', 'Enugu', 'Others']
  },
  lga: {
    type: String,
    required: [true, 'LGA is required']
  },
  bvn: {
    type: String,
    required: [true, 'BVN is required'],
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);
      },
      message: 'BVN must be 11 digits'
    }
  },
  bankName: {
    type: String,
    required: [true, 'Bank name is required'],
    enum: [
      'Access Bank', 'First Bank', 'GTBank', 'Zenith Bank', 'UBA',
      'Union Bank', 'Fidelity Bank', 'Ecobank', 'Stanbic IBTC',
      'Sterling Bank', 'Polaris Bank', 'Wema Bank', 'Unity Bank',
      'Heritage Bank', 'Keystone Bank', 'Jaiz Bank'
    ]
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Account number must be 10 digits'
    }
  },
  education: {
    type: String,
    enum: ['PhD', 'Master', 'Bachelor', 'HND', 'OND', 'SSCE', 'Others'],
    required: [true, 'Education level is required']
  },
  employmentStatus: {
    type: String,
    enum: ['Employed', 'Self-Employed', 'NYSC', 'Student', 'Unemployed'],
    required: [true, 'Employment status is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
    default: 'Pending'
  },
  loanTerm: {
    type: String,
    enum: ['3 months', '6 months', '12 months'],
    default: '6 months'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

loanApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);