const LoanApplication = require('../models/LoanApplication');
const calculateScore = require('../services/scoringService');

exports.createApplication = async (req, res, next) => {
  try {
    // Validate BVN first
    if (!req.body.bvn || !/^\d{11}$/.test(req.body.bvn)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Valid 11-digit BVN is required'
      });
    }

    // Validate loanTerm
    const validLoanTerms = ['3 months', '6 months', '12 months'];
    if (!validLoanTerms.includes(req.body.loanTerm)) {
      return res.status(400).json({
        status: 'fail',
        message: `loanTerm must be one of the following values: ${validLoanTerms.join(', ')}`
      });
    }

    // Calculate Nigerian credit score
    const score = calculateScore({
      income: req.body.income,
      age: req.body.age,
      state: req.body.state,
      education: req.body.education,
      employmentStatus: req.body.employmentStatus
    });
    
    const application = await LoanApplication.create({
      ...req.body,
      score,
      status: score > 70 ? 'Approved' : score > 50 ? 'Under Review' : 'Rejected'
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Application submitted successfully',
      data: {
        application
      }
    });
  } catch (err) {
    console.error('Error creating loan application:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};


exports.getApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        status: 'fail',
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        application
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!application) {
      return res.status(404).json({
        status: 'fail',
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        application
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await LoanApplication.find();
    
    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        applications
      }
    });
  } catch (err) {
    next(err);
  }
};