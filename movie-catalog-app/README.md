# Movie Catalog App

A full-stack movie catalog application that allows users to explore movies, search and filter them by genre, rating, and year, and mark favorites. The app includes secure authentication and a responsive UI.

## Features

-  User Authentication (Signup/Login)
-  Browse, Search, and Filter Movies
-  Mark and View Favorite Movies
-  Responsive Design using Tailwind CSS
-  Default Image Handling for Broken Posters
-  JWT Authentication with Secure HTTP-only Cookies


## Tech Stack

### Frontend
- **React.js** – Frontend UI framework
- **Tailwind CSS** – Utility-first CSS for responsive design
- **Bootstrap** – Used for card layout (React-Bootstrap)
- **React Router** – Routing between pages
- **React Select** – Multiselect dropdown for genres
- **Axios** – API requests

### Backend
- **Node.js + Express.js** – Backend server
- **MySQL** – Relational database
- **JWT** – JSON Web Token for auth
- **HTTP-only Cookies** – Secure token storage
- **Joi** – Request validation
- **dotenv** – Environment variables


##  Setup Instructions

1. **Clone the project**
2. **Frontend**:  
   - Navigate to the root folder  
   - Run: `npm install`  
   - Start: `npm run dev`
3. **Backend**:  
   - Navigate to the `server/` folder  
   - Run: `npm install`  
   - Start server: `node index.js`


##  Authentication

JWT tokens are used for authentication and stored in **HTTP-only cookies** for security. Protected routes check for the token before granting access.

##  Future Improvements

- **Password Reset via Email Verification**: Implementing a secure "Forgot Password" flow using registered emails.
- **Double-Click to Favorite**: Just like Instagram, double-clicking on a movie image will also add it to favorites.





