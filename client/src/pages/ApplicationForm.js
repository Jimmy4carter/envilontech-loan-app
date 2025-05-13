import React, { useState } from 'react';
import { Button, Typography, Paper, Grid, TextField, MenuItem } from '@mui/material';
import NigerianStatesDropdown from '../components/NigerianStatesDropdown';
import axios from 'axios';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    income: '',
    loanAmount: '',
    state: 'Lagos',
    lga: '',
    bvn: '',
    bankName: '',
    accountNumber: '',
    education: 'Bachelor',
    employmentStatus: 'Employed',
    loanTerm: '6 months',
  });

  const bankNames = [
    'Access Bank', 'First Bank', 'GTBank', 'Zenith Bank', 'UBA',
    'Union Bank', 'Fidelity Bank', 'Ecobank', 'Stanbic IBTC',
    'Sterling Bank', 'Polaris Bank', 'Wema Bank', 'Unity Bank',
    'Heritage Bank', 'Keystone Bank', 'Jaiz Bank'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.post('/api/loans', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Error submitting application: ' + error.response?.data?.message);
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Loan Application Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Income (₦)"
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Loan Amount (₦)"
              type="number"
              value={formData.loanAmount}
              onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NigerianStatesDropdown
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="LGA"
              value={formData.lga}
              onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="BVN"
              value={formData.bvn}
              onChange={(e) => setFormData({ ...formData, bvn: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Bank Name"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              fullWidth
              required
            >
              {bankNames.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Account Number"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Education"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              fullWidth
              required
            >
              {['PhD', 'Master', 'Bachelor', 'HND', 'OND', 'SSCE', 'Others'].map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Employment Status"
              value={formData.employmentStatus}
              onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
              fullWidth
              required
            >
              {['Employed', 'Self-Employed', 'NYSC', 'Student', 'Unemployed'].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Loan Term"
              value={formData.loanTerm}
              onChange={(e) => setFormData({ ...formData, loanTerm: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ApplicationForm;