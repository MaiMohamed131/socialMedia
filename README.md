# Social Media Platform

A full-stack social media application built with **Node.js/Express** backend and **React** frontend, featuring real-time messaging, notifications, and interactive post engagement.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Frontend Routes](#frontend-routes)
- [Contributing](#contributing)

---

## ✨ Features

### User Management
- User registration and login with JWT authentication
- User profile creation and management
- Secure password hashing with bcryptjs
- User search functionality

### Posts & Interactions
- Create, read, update, and delete posts
- Image uploads with Cloudinary integration
- Like and unlike posts
- View post feed with real-time updates

### Comments & Replies
- Comment on posts
- Reply to comments
- View nested comment threads

### Real-Time Messaging
- One-on-one messaging between users
- Real-time conversation updates via Socket.io
- Message history and conversation management

### Notifications
- Real-time notifications for user interactions
- Notification types: post likes, comments, replies, new messages, follows
- Mark notifications as read

### Additional Features
- Real-time updates with Socket.io
- Responsive UI with Tailwind CSS
- Search functionality for discovering content
- "What's Happening" trending section
- Today's news feed integration

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time:** Socket.io
- **File Upload:** Cloudinary
- **Password Hashing:** bcryptjs
- **Utilities:** dotenv for environment configuration
- **Development:** nodemon for hot reloading

### Frontend
- **Library:** React.js
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Fetch API (Socket.io client for real-time)
- **Build Tool:** Create React App

---

## 📁 Project Structure

```
socialMedia/
├── package.json              # Backend dependencies
├── server.js                 # Express server entry point
├── middlewares/
│   └── Auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   ├── Posts.js             # Posts schema
│   ├── Comments.js          # Comments schema
│   ├── Notifications.js     # Notifications schema
│   └── Conversation.js      # Messages/Conversation schema
├── routes/
│   ├── Users.js             # User endpoints
│   ├── Posts.js             # Post endpoints
│   ├── Comments.js          # Comment endpoints
│   ├── Notifications.js     # Notification endpoints
│   └── Messages.js          # Message endpoints
├── utils/
│   ├── cloudinary.js        # Cloudinary configuration
│   └── socket.js            # Socket.io setup
└── Frontend/
    └── socialfrontend/
        ├── package.json     # Frontend dependencies
        ├── tailwind.config.js
        ├── public/          # Static files
        └── src/
            ├── App.js       # Main App component
            ├── index.js     # React DOM render
            ├── components/
            │   ├── Layout.jsx
            │   ├── LeftSideBar.jsx
            │   ├── RightSideBar.jsx
            │   ├── SearchBox.jsx
            │   ├── PostCard.jsx
            │   ├── CommentSection.jsx
            │   ├── CommentItem.jsx
            │   ├── ReplyItem.jsx
            │   ├── ImageUploader.jsx
            │   ├── WhatsHappening.jsx
            │   ├── TodayNews.jsx
            │   ├── UserContext.jsx
            │   └── pages/
            │       ├── Home.jsx
            │       ├── Login.jsx
            │       ├── Register.jsx
            │       ├── Profile.jsx
            │       ├── UserProfile.jsx
            │       ├── Messages.jsx
            │       └── Notifications.jsx
            └── index.css    # Global styles
```

---

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas cloud instance)
- **Cloudinary Account** (for image uploads) - [Sign up free](https://cloudinary.com)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd socialMedia
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd Frontend/socialfrontend
npm install
cd ../..
```

---

## 🔐 Configuration

### Backend Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Create a `.env` file in `Frontend/socialfrontend/` with:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🎯 Running the Application

### Option 1: Run Both Separately (Recommended for Development)

**Terminal 1 - Start Backend Server:**

```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**

```bash
cd Frontend/socialfrontend
npm start
```

The frontend will open on `http://localhost:3000`

### Option 2: Run Production Build

**Build Frontend:**

```bash
cd Frontend/socialfrontend
npm run build
```

**Start Backend (serves frontend):**

```bash
npm start
```

---

## 📡 API Routes

### User Routes (`/users`)
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /users/search/:query` - Search users

### Post Routes (`/posts`)
- `POST /posts` - Create new post
- `GET /posts` - Get all posts (feed)
- `GET /posts/:id` - Get single post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like a post
- `DELETE /posts/:id/like` - Unlike a post

### Comment Routes (`/comments`)
- `POST /comments` - Create comment
- `GET /comments/:postId` - Get comments for post
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Notification Routes (`/notifications`)
- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

### Message Routes (`/messages`)
- `POST /messages` - Send message
- `GET /messages/:conversationId` - Get conversation messages
- `GET /conversations` - Get all user conversations
- `POST /conversations` - Start new conversation

---

## 🎨 Frontend Routes

- `/` - Home feed
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User's own profile
- `/profile/:userId` - Other user's profile
- `/messages` - Direct messages
- `/notifications` - User notifications

---

## 🔌 Real-Time Features (Socket.io)

The application uses Socket.io for real-time updates:
- Live post updates
- Real-time messaging
- Instantaneous notifications
- Online user status (can be extended)

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📝 Notes

- Ensure MongoDB is running before starting the backend
- Verify all environment variables are correctly set
- The application requires internet connection for Cloudinary image uploads
- Socket.io listeners should match between frontend and backend

---

## 🐛 Troubleshooting

**Backend won't start:**
- Check if MongoDB connection string is correct
- Verify all environment variables are set
- Ensure port 5000 is not in use

**Frontend won't connect to backend:**
- Check `REACT_APP_API_URL` environment variable
- Ensure backend is running on the correct port
- Check browser console for CORS errors

**Images not uploading:**
- Verify Cloudinary credentials in `.env`
- Check file size limits
- Ensure network connection is stable

---

## 📄 License

ISC

---

**Happy Coding! 🚀**
