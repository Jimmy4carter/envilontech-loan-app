const request = require('supertest');
const app = require('../../app');
const LoanApplication = require('../../models/LoanApplication');
const User = require('../../models/User');
const mongoose = require('mongoose');

describe('Loan Application API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await User.deleteMany({});
    await LoanApplication.deleteMany({});

    // Create a test user
    const user = await User.create({
      email: 'test@envilontech.com',
      password: 'Test@1234',
      phone: '08012345678',
      role: 'user'
    });

    userId = user._id;

    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@envilontech.com',
        password: 'Test@1234'
      });

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/loans', () => {
    it('should create a new Nigerian loan application', async () => {
      const res = await request(app)
        .post('/api/loans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '08012345678',
          age: 30,
          income: 5000000, // ₦5,000,000
          loanAmount: 2000000, // ₦2,000,000
          state: 'Lagos',
          lga: 'Ikeja',
          bvn: '12345678901',
          bankName: 'GTBank',
          accountNumber: '0123456789',
          education: 'Bachelor',
          employmentStatus: 'Employed',
          loanTerm: '6 months' // New field added here
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.application).toHaveProperty('_id');
      expect(res.body.data.application.status).toBeDefined();
      expect(res.body.data.application.score).toBeDefined();
      expect(res.body.data.application.state).toBe('Lagos');
      expect(res.body.data.application.loanTerm).toBe('6 months'); // Check the loanTerm value
    });

    it('should reject application with invalid BVN', async () => {
      const res = await request(app)
        .post('/api/loans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '08012345678',
          age: 30,
          income: 5000000,
          loanAmount: 2000000,
          state: 'Lagos',
          lga: 'Ikeja',
          bvn: '123', // Invalid BVN
          bankName: 'GTBank',
          accountNumber: '0123456789',
          education: 'Bachelor',
          employmentStatus: 'Employed',
          loanTerm: '6 months'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('Valid 11-digit BVN is required'); // Match the actual error message
    });

    it('should reject application with invalid loanTerm', async () => {
      const res = await request(app)
        .post('/api/loans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '08012345678',
          age: 30,
          income: 5000000,
          loanAmount: 2000000,
          state: 'Lagos',
          lga: 'Ikeja',
          bvn: '12345678901',
          bankName: 'GTBank',
          accountNumber: '0123456789',
          education: 'Bachelor',
          employmentStatus: 'Employed',
          loanTerm: '24 months' // Invalid loan term
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('loanTerm must be one of the following values: 3 months, 6 months, 12 months');
    });
  });

  describe('GET /api/loans/:id', () => {
    it('should get a Nigerian loan application by ID', async () => {
      const application = await LoanApplication.create({
        firstName: 'Ngozi',
        lastName: 'Eze',
        email: 'ngozi.eze@example.com',
        phone: '08098765432',
        age: 35,
        income: 7000000, // ₦7,000,000
        loanAmount: 3000000, // ₦3,000,000
        state: 'Abuja',
        lga: 'Central',
        bvn: '98765432109',
        bankName: 'Zenith Bank',
        accountNumber: '9876543210',
        education: 'Master',
        employmentStatus: 'Employed',
        status: 'Pending',
        score: 75,
        loanTerm: '12 months' // Loan term added for this test case
      });

      const res = await request(app)
        .get(`/api/loans/${application._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.application.firstName).toBe('Ngozi');
      expect(res.body.data.application.state).toBe('Abuja');
      expect(res.body.data.application.loanTerm).toBe('12 months'); // Check the loanTerm value
    });
  });
});
