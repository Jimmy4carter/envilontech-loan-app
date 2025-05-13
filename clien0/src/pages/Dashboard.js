import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <Typography>Loading...</Typography>;
  }

  const data = {
    labels: ['Total Applications', 'Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Applications',
        data: [
          stats.totalApplications,
          stats.approvedApplications,
          stats.rejectedApplications,
          stats.pendingApplications,
        ],
        backgroundColor: ['#4CAF50', '#2196F3', '#F44336', '#FFC107'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow custom height
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Loan Applications Overview',
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 20, height: '500px' }}> {/* Adjust height here */}
          <Bar data={data} options={options} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;