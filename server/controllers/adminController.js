const LoanApplication = require('../models/LoanApplication');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalApplications = await LoanApplication.countDocuments();
    const approvedApplications = await LoanApplication.countDocuments({ status: 'Approved' });
    const rejectedApplications = await LoanApplication.countDocuments({ status: 'Rejected' });
    const pendingApplications = await LoanApplication.countDocuments({ status: 'Pending' });
    
    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalApplications,
          approvedApplications,
          rejectedApplications,
          pendingApplications
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@envilontech.com' });
    if (!adminExists) {
      const newAdmin = await User.create({
        email: 'admin@envilontech.com',
        password: process.env.ADMIN_PASSWORD || 'defaultAdminPassword',
        phone: '08012345678',
        role: 'admin'
      });
      console.log('Admin user created successfully', newAdmin);
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error('JWT_SECRET or JWT_EXPIRES_IN is not defined in the environment variables');
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};