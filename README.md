# NITK Sports and Infrastrucutre Booking System

## Overview
The **NITK Sports Booking System** is a web-based platform that enables students to book sports infrastructure and equipment at NITK. The system includes role-based access control (RBAC), equipment management, infrastructure booking, waitlists, penalties, analytics, notifications, and real-time availability updates via WebSockets.

## Features
- **User Authentication & Authorization**: Role-based access control (Student, Admin, Equipment Manager, etc.) using JWT.
- **Infrastructure Booking**: Courts and equipment booking with real-time updates.
- **Equipment Management**: Tracking availability, reservations, and returns.
- **Waitlist & Penalties**: Optional features for handling overbooked slots and rule violations.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Bootstrap
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-time Communication**: Socket.io

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB** (v6 or later)
- **npm** (v8 or later)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nitk-sports-booking.git
   cd nitk-sports-booking/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root directory and configure environment variables:
   ```env
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

## Running the Application
Once both the frontend and backend servers are running, access the application at:
```
http://localhost:5173
```
## Demo Video
[Watch the Demo](Demo.mkv)
Open and View Raw it will download demo video to your local storage then view it.

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.
