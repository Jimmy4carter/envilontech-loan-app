# EnvilonTech Student Loan Management System - Server

This is the **Node.js-based backend** for the EnvilonTech Loan Management System. The backend provides a RESTful API for managing student loan applications, including secure user authentication, admin dashboard data, and an AI-powered credit scoring service tailored for Nigerian demographics.

---

## 📌 Assignment: Full Stack / DevOps / AI Technical Challenge

### 🎯 Objective
Build a lightweight backend service with basic DevOps practices integrated.

### 📝 Requirements Fulfilled

#### ✅ Backend Service (API)
- Built with **Node.js + Express.js**
- RESTful API to store and retrieve **student loan applications**
- Endpoints to **create**, **retrieve**, and **update** applications

#### ✅ DevOps & Deployment
- Fully **containerized** using **Docker**
- Includes a working `docker-compose.yml` file
- Deployment-ready with environment configurations
- Compatible with **Heroku**, **Railway**, or **Render**

#### ✅ Bonus (AI/ML – Optional)
- Integrated **AI Scoring Service** to estimate creditworthiness
- Logic based on **income**, **age**, **location**, **employment status**, and **education level**
- Mock data with rule-based modeling

#### ✅ Submission Instructions
- This project is structured for **GitHub submission**
- Includes this `README.md` with setup, architecture, and implementation notes

---

## 🚀 Features

- **RESTful API** for loan management
- **JWT Authentication**
- **Admin dashboard stats endpoint**
- **AI-powered scoring system**
- **Nigerian-specific features**:
  - BVN validation
  - State/LGA support
  - Naira-based income scoring
  - NYSC employment recognition
- **Dockerized deployment**

---

## 🛠️ Technologies Used

| Technology      | Purpose                              |
|----------------|---------------------------------------|
| Node.js         | Backend runtime                      |
| Express.js      | Web framework                        |
| MongoDB         | Database                             |
| Mongoose        | MongoDB ODM                          |
| JWT             | Token-based authentication           |
| Docker          | Containerization                     |
| dotenv          | Environment config management        |

---

## ⚙️ Setup Instructions

### 🧑‍💻 Local Development

```bash
cd loan-application-system/server
npm install
