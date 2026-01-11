# Magisoft

A full-stack travel management application for Magi Israel, featuring itinerary management, package booking, and customer relationship management.

## Description

Magisoft is a comprehensive travel management system built for Magi Israel, a travel company. The application enables users to browse travel packages, view detailed itineraries, manage bookings, and handle customer enquiries. It includes both frontend and backend components, providing a complete solution for travel business operations.

## Technologies Used

### Frontend
- **Framework**: React
- **Icons**: React Icons 5.2.1
- **Currency**: react-currency-select 0.5.1
- **Flags**: react-world-flags 1.6.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.1
- **Database**: MongoDB with Mongoose 8.5.0
- **Authentication**: 
  - JWT (jsonwebtoken 9.0.2)
  - bcrypt 5.1.1 (password hashing)
- **Validation**: validator 13.12.0
- **Security**: CORS 2.8.5
- **Environment**: dotenv 16.0.1
- **Development**: nodemon

## How to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd "Personal Projects/EG3/magisoft/backend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   # or for production
   npm start
   ```

   The backend server will run on `http://localhost:5000` (or the port specified in your .env file).

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd "Personal Projects/EG3/magisoft/frontend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` (or the next available port).

### Running Both Services

For development, you'll need to run both the backend and frontend servers simultaneously. You can use separate terminal windows or a process manager like `concurrently`.

## Project Structure

```
magisoft/
├── backend/
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # React components
    │   ├── pages/      # Page components
    │   └── ...
    └── public/         # Static assets
```

## Features

- Travel package browsing and management
- Itinerary viewing and management
- Customer enquiry management
- Booking system
- User authentication and authorization
- Responsive design

## API Endpoints

The backend provides RESTful API endpoints for:
- User authentication
- Package management
- Itinerary management
- Booking operations
- Enquiry management