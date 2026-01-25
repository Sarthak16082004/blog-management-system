# 📝 Blog Management System (MySQL + MongoDB)

A **full‑stack blog platform** built with **React, Node.js, Express, MongoDB, and MySQL**, featuring **JWT authentication**, **owner‑only authorization**, and a **premium animated UI**.

This project demonstrates **real‑world engineering practices**: clean architecture, secure authentication, polyglot persistence, and professional Git workflow.

---

## 🚀 Live Demo

> *(Will be added after deployment)*

---

## ✨ Features

### 🔐 Authentication & Authorization

* User signup & login (JWT based)
* Protected routes (frontend + backend)
* Owner‑only **edit & delete** for blogs

### 📰 Blog Management (CRUD)

* Create blogs (authenticated users only)
* Read all blogs & single blog view
* Update & delete blogs (only by owner)

### 🎨 Premium Frontend UI

* React‑based animations & micro‑interactions
* Animated hero section
* Glassmorphism blog cards with hover effects
* Skeleton loaders & empty states
* Responsive, dark‑themed design

### 🗄️ Polyglot Persistence

* **MySQL** → User authentication data
* **MongoDB (Atlas)** → Blog content

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Custom CSS & animations (no UI libraries)

### Backend

* Node.js
* Express.js
* JWT Authentication
* CORS handling

### Databases

* MySQL (users)
* MongoDB Atlas (blogs)

### Tools & Platforms

* Git & GitHub
* Postman
* MongoDB Atlas

---

## 🏗️ Architecture Overview

```
Frontend (React)
   |
   |  REST API (JWT)
   v
Backend (Node + Express)
   |
   |-- MySQL  -> Users & Auth
   |-- MongoDB -> Blogs
```

---

## 📂 Project Structure

```
blog-management-system/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── utils/
│   │   └── index.css
│   └── main.jsx
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_atlas_uri
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=blog_db
```

---

## ▶️ Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/blog-management-system.git
cd blog-management-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 API Endpoints (Sample)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | /api/auth/signup | Register user   |
| POST   | /api/auth/login  | Login user      |
| GET    | /api/blogs       | Get all blogs   |
| GET    | /api/blogs/:id   | Get single blog |
| POST   | /api/blogs       | Create blog     |
| PUT    | /api/blogs/:id   | Update blog     |
| DELETE | /api/blogs/:id   | Delete blog     |

---

## 👨‍💻 Author

**Sarthak Pathak**
B.Tech CSE Student
Passionate about Full‑Stack Development & Cloud Technologies

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it motivates me to build more!
