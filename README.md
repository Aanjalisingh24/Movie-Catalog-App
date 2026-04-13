# Movie Catalog App

A full-stack movie catalog application that allows users to explore movies, search and filter them by genre, rating, and year, and mark favorites. The app includes secure authentication and a responsive UI.

---

## Features

-  User Authentication (Signup/Login)
-  Browse, Search, and Filter Movies
-  Mark and View Favorite Movies
-  Responsive Design using Tailwind CSS
-  Default Image Handling for Broken Posters
-  JWT Authentication with Secure HTTP-only Cookies
-  RESTful API integration between frontend and backend

---

##  Tech Stack

### Frontend
- React.js – Frontend UI framework
- Tailwind CSS – Utility-first CSS for responsive design
- Bootstrap (React-Bootstrap) – UI components (cards/layout)
- React Router – Page routing
- React Select – Multi-select dropdown for genres
- Axios – API requests

---

### Backend
- Node.js + Express.js – Backend server
- MongoDB – NoSQL database for storing users, movies, and favorites
- Mongoose – MongoDB object modeling
- JWT – Authentication system
- HTTP-only Cookies – Secure token storage
- Joi – Request validation
- dotenv – Environment variables

---

##  Setup Instructions

### 1. Clone the project
```bash
git clone <your-repo-link>

Frontend Setup
npm install
npm run dev

Backend Setup
cd server
npm install
node index.js

Authentication
JWT tokens are used for authentication and stored in HTTP-only cookies for security. Protected routes verify the token before granting access.

Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas (Cloud Database)

Future Improvements
Password reset via email verification system
Double-click to favorite movies (Instagram-like UX)
User profile page with watch history
Recommendation system based on favorites