const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection error:', err);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};


module.exports = connectDB;
