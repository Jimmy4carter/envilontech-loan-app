const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Create first admin user (run once)
exports.createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@envilontech.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@envilontech.com',
        password: 'Admin@1234',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

// Middleware factory for role restriction
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Make sure these functions are properly exported
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      role: req.body.role || 'user'
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
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
      expiresIn: process.env.JWT_EXPIRES_IN  || '1h',
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


// Authentication middleware
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // 2) Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // 4) Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Initialize admin user
exports.initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@envilontech.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@envilontech.com',
        password: 'EnvilonTech@2023',
        phone: '08012345678',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};


