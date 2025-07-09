# 🛠️ TaleTrails Backend

The backend service for the **TaleTrails** web application — a travel storytelling platform that allows users to share, discover, and manage travel tales. This backend is built using **Node.js**, **Express**, and **MongoDB**, with support for secure user authentication, file uploads via Cloudinary, and RESTful APIs to manage tales.

---

## 🚀 Features

- ✅ User Authentication with JWT & Bcrypt
- 📦 RESTful APIs for CRUD operations on tales
- 🌥 Image upload and storage via Cloudinary
- 🛡 Middleware for authorization and input validation
- 🧾 Environment variable configuration using dotenv
- 🗂 Multer-based file handling
- 🌐 CORS-enabled for cross-origin requests

---

## ⚙️ Tech Stack

| Technology    | Purpose                            |
|---------------|------------------------------------|
| **Node.js**   | Runtime for server-side JS         |
| **Express.js**| Web framework                      |
| **MongoDB**   | NoSQL database                     |
| **Mongoose**  | MongoDB ODM                        |
| **JWT**       | Authentication tokens              |
| **Bcrypt**    | Password hashing                   |
| **Cloudinary**| Image storage                      |
| **Multer**    | File upload handling               |
| **Dotenv**    | Environment configuration          |

---

## 📁 Project Structure

taleTrails-backend/
├── controllers/ # Route logic
├── middleware/ # Auth & error handling
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── utils/ # Cloudinary config, helpers
├── index.js # App entry point
├── .env # Environment variables
└── package.json

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧑‍💻 Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/rahull0328/taleTrails-backend.git
cd taleTrails-backend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the server

```bash
npm start
```

Server will start on http://localhost:5000 (or the port you specify in .env).

---

## 🔧 Scripts

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `npm install` | Install all dependencies           |
| `npm start`   | Start server with nodemon          |
| `npm test`    | Placeholder (add your tests later) |