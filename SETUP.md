# 🚀 Project Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (for database)

## Step 1: Clone/Download the Project
```bash
# If cloning from GitHub
git clone https://github.com/yourusername/secure-login.git
cd secure-login

# If using downloaded ZIP
# Extract the ZIP file and navigate to the project directory
```

## Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Create a new file named .env and add the following:
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
# Create a new file named .env.local and add:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Step 4: Start the Application

### Start Backend Server
```bash
# In the backend directory
npm run dev
# Server will start on http://localhost:3001
```

### Start Frontend Development Server
```bash
# In the frontend directory
npm run dev
# Frontend will start on http://localhost:3000
```

## Step 5: Access the Application
- Open your browser and go to `http://localhost:3000`
- You should see the login page

## 🔧 Troubleshooting

### Common Issues:

1. **Port Already in Use**
   - If port 3000 or 3001 is already in use, you can change it in:
     - Backend: `.env` file
     - Frontend: `package.json` scripts

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check your connection string in backend `.env`

3. **Dependencies Issues**
   - If you encounter dependency errors:
   ```bash
   # In both frontend and backend directories
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

4. **Environment Variables**
   - Make sure all required environment variables are set
   - Check for typos in variable names

## 📝 Required Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🔒 Security Notes
- Never commit `.env` files
- Use strong JWT secrets in production
- Keep MongoDB connection strings secure

## 🛠️ Development Tools
- VS Code (recommended)
- MongoDB Compass (for database management)
- Postman (for API testing) 