# EnvilonTech Loan Management System - Client

This is the **React-based frontend** for the EnvilonTech Loan Management System. It provides a modern, user-friendly admin interface for managing loan applications, users, and system analytics. Designed as a lightweight dashboard, it streamlines administrator tasks by interacting directly with the backend API.

---

## 🎯 Purpose

The frontend acts as a visual bridge between the backend and the administrator, offering an intuitive interface to:

- Monitor system performance via charts and metrics.
- Manage and review loan applications.
- Access and control user data.
- Submit new loan applications with ease.

This eliminates the need for raw API testing and allows non-technical admins to operate the system efficiently.

---

## 🧭 Pages and Navigation

### 🔐 Login Page
- Allows admin login with credentials.
- Uses JWT authentication.
- Handles input validation and login errors.

### 📊 Dashboard
- Displays system-wide loan statistics using bar charts.
- Pulls data from `/api/admin/stats`.

### 📄 Applications
- Lists all submitted loan applications.
- Enables detailed view per application.
- Fetches from `/api/loans`.

### 👤 Users
- Displays a list of registered users.
- Fetches user data from `/api/admin/users`.

### 📝 Application Form
- Allows submission of new loan applications.
- Collects personal, financial, and bank information.
- Validates fields before API submission.

---

## 🔌 API Integration

The frontend consumes the following backend endpoints:

### 🔑 Authentication
- `POST /api/auth/login` – Admin login and JWT retrieval.

### 📋 Loan Applications
- `GET /api/loans` – Fetch all loan applications.
- `POST /api/loans` – Create a new loan application.

### 👮 Admin Operations
- `GET /api/admin/stats` – Retrieve system statistics.
- `GET /api/admin/users` – Fetch list of registered users.

---

## ✨ Features

- **JWT-based Auth** – Secure login using token-based authentication.
- **Interactive Dashboard** – Visual loan stats using Chart.js.
- **Loan Management** – View, add, and manage applications.
- **User Directory** – Review registered users and their details.
- **Material UI Design** – Clean, responsive design with consistent theming.
- **Error Handling** – Robust handling for API and input errors.

---

## 🧰 Tech Stack

- **React** – Frontend framework
- **Material-UI** – UI components and layout
- **Chart.js** – Data visualization
- **Axios** – HTTP client for API communication
- **React Router** – SPA navigation

---

## 📦 Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- Backend running at: `http://localhost:5000`

---

## 🚀 Getting Started

### 🛠 Local Setup

1. Navigate to the client directory:

   ```bash
   cd client
