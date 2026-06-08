# 🐾 Pet Store Backend - Quick Start Guide

## ⚡ Quick Installation (5 minutes)

### Step 1: Navigate to Backend Folder
```bash
cd backend_clg
```

### Step 2: Install Dependencies
```bash
npm install
```

**npm install command will install:**
```
express@4.18.2
mongoose@7.5.0
bcryptjs@2.4.3
jsonwebtoken@9.1.0
dotenv@16.3.1
cors@2.8.5
express-validator@7.0.0
nodemailer@6.9.5
nodemon@3.0.1 (dev)
```

### Step 3: Configure Environment Variables

Open `.env` file and update:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/petstore
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=14
NODE_ENV=development
```

### Step 4: Start the Server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

✅ Server should be running at `http://localhost:5000`

---

## 🧪 Test the API (Using cURL or Postman)

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f5c8...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User (Protected Route)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 5. Create a Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "name": "Golden Retriever",
    "description": "A friendly and loving breed perfect for families",
    "category": "Dogs",
    "price": 500,
    "stock": 10
  }'
```

---

## 📁 File Structure Overview

```
backend_clg/
├── config/
│   └── database.js              # MongoDB connection setup
│
├── Controllers/
│   ├── authController.js        # Register, Login, Password Reset
│   └── productController.js     # CRUD for Products
│
├── middleware/
│   └── auth.js                  # JWT verification & Admin check
│
├── Models/
│   ├── User.js                  # User schema & methods
│   └── Product.js               # Product schema
│
├── Routers/
│   ├── authRoutes.js            # Auth endpoints
│   └── productRoutes.js         # Product endpoints
│
├── utils/
│   ├── errorHandler.js          # Error handling
│   ├── validation.js            # Input validation
│   └── emailService.js          # Email sending (optional)
│
├── Server.js                    # Main entry point
├── package.json                 # Dependencies
├── .env                         # Environment variables (local only)
├── .env.example                 # Template for .env
├── .gitignore                   # Git ignore rules
├── README.md                    # Full documentation
└── QUICKSTART.md                # This file
```

---

## 🔐 Authentication Flow

```
1. User Registration
   ↓
2. Password hashed with bcryptjs (10 salt rounds)
   ↓
3. User stored in MongoDB
   ↓
4. JWT token generated (valid 14 days)
   ↓
5. Token sent to frontend
   ↓
6. Frontend stores token (localStorage/sessionStorage)
   ↓
7. Token sent in Authorization header for protected routes
   ↓
8. Middleware verifies token before allowing access
```

---

## 🚨 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud connection
- Check MONGO_URI in .env

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in .env to another port (e.g., 5001)
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Issue: CORS Error
**Solution:**
- Ensure FRONTEND_URL is set in .env
- Check that frontend URL matches CORS configuration

### Issue: JWT Token Invalid
**Solution:**
- Token may be expired
- Generate new token by logging in again
- Ensure JWT_SECRET is same across restarts

### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📊 User Roles

### Admin User
- Can create, update, delete products
- Can view all users
- Has full access to admin features

### Regular User
- Can view products
- Can make purchases
- Cannot manage products

**To create admin user:** Update user role directly in MongoDB after registration.

---

## 🔑 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/petstore |
| JWT_SECRET | Secret key for JWT signing | your_secret_key_here |
| JWT_EXPIRY | Token expiry in days | 14 |
| EMAIL_USER | Email for sending (optional) | your@gmail.com |
| EMAIL_PASSWORD | Email app password | your_app_password |
| NODE_ENV | Environment type | development |

---

## 📚 Key API Endpoints Summary

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user (Protected)

**Products:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/stats/category` - Product statistics

---

## 🚀 Next Steps

1. ✅ Install dependencies
2. ✅ Configure .env
3. ✅ Start MongoDB
4. ✅ Run `npm run dev`
5. ✅ Test endpoints with cURL or Postman
6. ✅ Connect frontend application
7. ✅ Deploy to production

---

## 📞 Need Help?

1. Check the full **README.md** for detailed API documentation
2. Review **errorHandler.js** for error handling patterns
3. Check **validation.js** for input validation rules
4. Review MongoDB and JWT documentation

---

**🎉 You're all set! Happy coding!**
