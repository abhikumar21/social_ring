# 🌐 Social Ring - A Social Media Web Application

A full-stack social media platform built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), featuring user authentication, real-time interactions, media sharing, OpenAI-powered content generation, and a modern UI.

![image alt](https://github.com/abhikumar21/social_ring/blob/main/client/public/social_media_application.png?raw=true)


---

## 🚀 Features

- 🔐 **Authentication** - Secure signup, login, JWT-based sessions
- 📝 **Posts & Comments** - Create, like, comment, and delete posts
- 🟢 **Real-Time** - Live notifications & chat with Socket.io
- 📸 **Media Uploads** - Post images with captions
- 🧠 **AI Integration** - Generate text/image content using OpenAI API

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Socket.io
- OpenAI API

---

## 📦 Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- OpenAI API Key (for AI features)

### 1. Clone the Repository
```bash
git clone https://github.com/abhikumar21/social_ring.git
cd social_ring
```

### Setup Backend 
```bash
cd server
npm install
# Create .env file
touch .env
```

### .env Format
```bash
PORT = 5000
CONN_STRING = mondodb_connection_string
JWT_KEY = your_jwt_key
OPENAI_API_KEY=your_openai_api_key
```

```bash
nodemon index.js
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

### .env Format
```bash
REACT_APP_PUBLIC_FOLDER = http://localhost:5000/image/
BASE_URL = http://localhost:5000
```

```bash
npm start
```

