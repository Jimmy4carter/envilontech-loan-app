# 🎓 EnvilonTech Student Loan Application System

A full-stack, DevOps-ready student loan management system built for the **EnvilonTech Technical Challenge**. This application provides an efficient way to process, evaluate, and manage student loan requests using a REST API, admin dashboard, and a rule-based AI scoring mechanism tailored to Nigerian demographics.

---

## 📌 Challenge Prompt

> Build a simple backend service to manage student loan applications using your preferred tech stack.
>
> - Include a REST API and at least one endpoint to `POST` applications and another to `GET` all applications.
> - Add basic test cases (e.g., using Mocha/Chai or Django Tests).
> - Include a basic dashboard to see metrics (loan approved, failed, etc.).
> - Dockerize the backend app.
> - Deploy to any hosting service (Heroku, Railway, Render, etc.).
>
> **Bonus (optional)**: Add a scoring system using AI/ML or rules to determine approval/rejection.
>
> *You are free to add a frontend if you want, but it's not required.*

---

## 🧩 Features Implemented

- ✅ RESTful API to manage loan applications
- ✅ Admin dashboard route for application insights
- ✅ Basic test cases with Mocha and Chai
- ✅ Dockerized backend and database setup
- ✅ Scoring logic using rule-based AI model
- ✅ Optional frontend in React (client/)
- ✅ Ready for deployment on Heroku, Railway, etc.

---

## 🗂 Project Structure
envilontech-loan-app/
├── client/                     # React-based frontend
│   ├── public/                 # Public assets (e.g., index.html, favicon)
│   ├── src/                    # Source code for the frontend
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # React pages (e.g., Dashboard, Applications, Users)
│   │   ├── App.js              # Main React component
│   │   ├── index.js            # React entry point
│   │   ├── App.css             # Global styles
│   │   └── config.js           # API configuration (e.g., base URL)
│   ├── package.json            # Frontend dependencies and scripts
│   └── README.md               # Frontend-specific documentation
│
├── server/                     # Node.js backend
│   ├── controllers/            # Controllers for handling API logic
│   │   ├── adminController.js  # Admin-specific logic (e.g., stats, user management)
│   │   ├── authController.js   # Authentication logic (e.g., login, signup, protect routes)
│   │   └── loanController.js   # Loan application logic (e.g., create, fetch applications)
│   ├── models/                 # Mongoose models for MongoDB
│   │   ├── LoanApplication.js  # Loan application schema
│   │   └── User.js             # User schema
│   ├── routes/                 # API routes
│   │   ├── adminRoutes.js      # Routes for admin-related endpoints
│   │   ├── authRoutes.js       # Routes for authentication endpoints
│   │   └── loanRoutes.js       # Routes for loan application endpoints
│   ├── utils/                  # Utility functions and classes
│   │   ├── appError.js         # Custom error class for application-specific errors
│   │   └── catchAsync.js       # Utility for handling async errors in controllers
│   ├── app.js                  # Express app setup
│   ├── server.js               # Entry point for the backend
│   ├── package.json            # Backend dependencies and scripts
│   └── README.md               # Backend-specific documentation
│
├── shared/                     # Shared constants or utilities (if applicable)
│   └── constants.js            # Shared enums or constants (e.g., bank names)
│
├── docker-compose.yml          # Docker Compose configuration for multi-container setup
├── .env                        # Environment variables for backend
├── .gitignore                  # Files and directories to ignore in Git
├── README.md                   # Main project documentation
└── package.json                # Root-level dependencies and scripts (if applicable)

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend (optional)**: React.js
- **Testing**: Mocha, Chai
- **DevOps**: Docker, Docker Compose
- **Deployment**: Render, Railway, Heroku

---

## 🚀 API Endpoints

### **Authentication Endpoints**
1. **POST `/api/auth/signup`**
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123",
       "phone": "08012345678",
       "role": "user"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "token": "JWT_TOKEN",
       "data": {
         "user": {
           "id": "USER_ID",
           "email": "user@example.com",
           "role": "user"
         }
       }
     }
     ```

2. **POST `/api/auth/login`**
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "token": "JWT_TOKEN",
       "data": {
         "user": {
           "id": "USER_ID",
           "email": "user@example.com",
           "role": "user"
         }
       }
     }
     ```

---

### **Loan Application Endpoints**
1. **POST `/api/loans`**
   - **Description**: Submits a new loan application.
   - **Request Body**:
     ```json
     {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "phone": "08012345678",
       "age": 30,
       "income": 500000,
       "loanAmount": 200000,
       "state": "Lagos",
       "lga": "Ikeja",
       "bvn": "12345678901",
       "bankName": "GTBank",
       "accountNumber": "1234567890",
       "education": "Bachelor",
       "employmentStatus": "Employed",
       "loanTerm": "6 months"
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "data": {
         "application": {
           "id": "APPLICATION_ID",
           "status": "Pending",
           "score": 75
         }
       }
     }
     ```

2. **GET `/api/loans`**
   - **Description**: Fetches all loan applications.
   - **Response**:
     ```json
     {
       "status": "success",
       "results": 2,
       "data": {
         "applications": [
           {
             "id": "APPLICATION_ID",
             "firstName": "John",
             "lastName": "Doe",
             "email": "john.doe@example.com",
             "status": "Pending",
             "score": 75
           }
         ]
       }
     }
     ```

---

### **Admin Endpoints**
1. **GET `/api/admin/stats`**
   - **Description**: Fetches loan application statistics for the admin dashboard.
   - **Response**:
     ```json
     {
       "status": "success",
       "data": {
         "stats": {
           "totalApplications": 10,
           "approvedApplications": 5,
           "rejectedApplications": 3,
           "pendingApplications": 2
         }
       }
     }
     ```

2. **GET `/api/admin/users`**
   - **Description**: Fetches all registered users.
   - **Response**:
     ```json
     {
       "status": "success",
       "results": 1,
       "data": {
         "users": [
           {
             "id": "USER_ID",
             "email": "admin@envilontech.com",
             "role": "admin"
           }
         ]
       }
     }
     ```

---

## 🤖 Loan Scoring Logic
Applications are scored based on:

- 📍 **Location** (e.g., Lagos preferred)
- 🎓 **Education Level** (PhD > MSc > BSc > HND > SSCE)
- 🧑‍💼 **Employment Status** (Full-time > Self-employed > NYSC)
- 💰 **Income Range** (higher earns higher points)
- 👤 **Age Range**

The scoring model is extendable to integrate an ML classifier if needed.

---

## 🧪 Running Tests
   ```bash
   cd server