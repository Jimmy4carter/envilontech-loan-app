import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/loans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data.data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Loan Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.firstName} {app.lastName}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>₦{app.loanAmount?.toLocaleString()}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>{app.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Applications;