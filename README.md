# Student Management System

A full-stack web application built for educational purposes, demonstrating CRUD operations for student record management with modern web technologies.

## 🚀 Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Architecture**: RESTful API

## ✨ Features

- ✅ Create, read, update, and delete student records
- 📱 Responsive design for all devices
- 🎨 Clean, intuitive user interface
- 👤 Student roll number validation
- 📝 Form validation and error handling
- 🔍 Student list with search functionality

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```

2. **Database Setup**
   ```sql
   CREATE DATABASE student_db;
   USE student_db;
   
   CREATE TABLE students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     roll_no VARCHAR(20) UNIQUE NOT NULL,
     class VARCHAR(20) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   
   **Terminal 1 - Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Backend runs on: http://localhost:5000
   
   **Terminal 2 - Frontend Server:**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on: http://localhost:3000

## 📁 Project Structure

```
student-management-system/
├── backend/
│   ├── server.js          # Express server
│   ├── database.sql       # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   └── package.json
├── package.json           # Root package for concurrent dev
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

## 🎯 Learning Objectives

This project helps students understand:
- Full-stack development workflow
- RESTful API design principles
- Database integration with MySQL
- React component architecture
- CRUD operations implementation
- Frontend-backend communication
