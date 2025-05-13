import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Applications from './pages/Applications';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', textAlign: 'center' }}>
            <h1>Welcome to EnvilonTech Loan Application System</h1>
          </header>
          <main style={{ padding: '20px', textAlign: 'center' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>EnvilonTech Loan App</h2>
                    <p>Manage loan applications efficiently and securely.</p>
                    <p>
                      <strong>Default Admin Login:</strong>
                      <br />
                      Email: <code>admin@envilontech.com</code>
                      <br />
                      Password: <code>Admin@1234</code>
                    </p>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          padding: '10px 20px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Login as Admin
                      </button>
                    </Link>
                  </>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/application-form" element={<ApplicationForm />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
