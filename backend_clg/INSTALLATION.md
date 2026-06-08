# 🐾 Installation & Setup Instructions

## 📋 Pre-Installation Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (local or Atlas)
- [ ] VS Code or any code editor
- [ ] Postman or similar API testing tool (optional)

---

## 🔧 Installation Steps

### Step 1: Navigate to Backend Folder

```bash
cd backend_clg
```

### Step 2: Install All Dependencies

Copy and run this exact command:

```bash
npm install
```

**What gets installed:**
- express: ^4.18.2 - Web framework
- mongoose: ^7.5.0 - MongoDB ODM
- bcryptjs: ^2.4.3 - Password hashing
- jsonwebtoken: ^9.1.0 - JWT tokens
- dotenv: ^16.3.1 - Environment variables
- cors: ^2.8.5 - Cross-origin support
- express-validator: ^7.0.0 - Input validation
- nodemailer: ^6.9.5 - Email service
- nodemon: ^3.0.1 - Development tool

**Installation output should show:**
```
up to date, audited X packages in Xs
found 0 vulnerabilities
```

### Step 3: Verify Installation

Check if node_modules were created:

```bash
ls node_modules
```

Or on Windows:
```bash
dir node_modules
```

You should see many folders inside.

---

## ⚙️ Environment Configuration

### Option A: Using Local MongoDB

1. **Ensure MongoDB is running:**
   ```bash
   # On Mac/Linux:
   mongod

   # On Windows:
   # Use MongoDB Atlas or MongoDB Community Server
   ```

2. **Update `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/petstore
   JWT_SECRET=your_super_secret_key_here_12345
   JWT_EXPIRY=14
   NODE_ENV=development
   ```

### Option B: Using MongoDB Atlas (Cloud)

1. **Create account at mongodb.com/cloud**

2. **Create a new cluster and database**

3. **Get connection string**

4. **Update `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/petstore?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here_12345
   JWT_EXPIRY=14
   NODE_ENV=development
   ```

---

## 🚀 Starting the Server

### Development Mode (Recommended for development)

```bash
npm run dev
```

**Expected output:**
```
╔═══════════════════════════════════════╗
║   🐾 PET STORE API SERVER STARTED 🐾  ║
║   Running on http://localhost:5000      ║
╚═══════════════════════════════════════╝
```

**Auto-reloads when you save files**

### Production Mode

```bash
npm start
```

---

## ✅ Verify Server is Running

Open your browser and visit:

```
http://localhost:5000
```

You should see:
```json
{
  "success": true,
  "message": "Welcome to Pet Store API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products",
    "health": "/api/health"
  }
}
```

---

## 🧪 Test the API

### Using Postman:

**1. Register a User**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**2. Login**
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Copy the token from response**

**3. Get Current User (Protected)**
- Method: GET
- URL: `http://localhost:5000/api/auth/me`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer <paste_your_token_here>`

**4. Get All Products**
- Method: GET
- URL: `http://localhost:5000/api/products`

---

## 📊 Complete Folder Structure

```
backend_clg/
│
├── 📁 config/
│   └── database.js                 # MongoDB connection
│
├── 📁 Controllers/
│   ├── authController.js           # Auth logic (register, login, etc.)
│   ├── productController.js        # Product CRUD operations
│   └── UserController.js           # (existing file)
│
├── 📁 middleware/
│   └── auth.js                     # JWT verification & admin check
│
├── 📁 Models/
│   ├── User.js                     # User schema with password hashing
│   ├── Product.js                  # Product schema
│   └── UserModel.js                # (existing file)
│
├── 📁 Routers/
│   ├── authRoutes.js               # Auth endpoints
│   ├── productRoutes.js            # Product endpoints
│   └── UserRoute.js                # (existing file)
│
├── 📁 utils/
│   ├── errorHandler.js             # Error handling utilities
│   ├── validation.js               # Input validation rules
│   └── emailService.js             # Email sending (Nodemailer)
│
├── 📄 Server.js                    # Main server file (UPDATED)
├── 📄 package.json                 # Dependencies (UPDATED)
├── 📄 .env                         # Environment variables (UPDATED)
├── 📄 .env.example                 # Template for .env
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Full API documentation
├── 📄 QUICKSTART.md                # Quick start guide
└── 📄 INSTALLATION.md              # This file
```

---

## 🔐 JWT Token Setup

**The JWT secret should be:**
- At least 32 characters long
- Random and unique
- Stored in `.env` file (NOT in code)
- Never shared or exposed

**Generate a strong JWT secret:**

Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then update `.env`:
```env
JWT_SECRET=<paste_the_generated_string_here>
```

---

## 🐛 Troubleshooting

### Error: `Cannot find module 'express'`
**Solution:**
```bash
npm install
```
Make sure you're in the `backend_clg` folder.

### Error: `MongoDB connection failed`
**Solution:**
1. Ensure MongoDB is running
2. Check MONGO_URI in .env
3. For Atlas, verify username/password/IP whitelist

### Error: `Port 5000 already in use`
**Solution:**
- Change PORT in .env to 5001, 5002, etc.
- Or kill the process:
  ```bash
  # Mac/Linux:
  lsof -ti:5000 | xargs kill -9

  # Windows:
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Error: `EACCES: permission denied`
**Solution:**
```bash
sudo chown -R $USER /path/to/backend_clg
```

### Error: `npm ERR! code ECONNREFUSED`
**Solution:**
```bash
npm cache clean --force
npm install
```

---

## 📚 File-by-File Description

### **Server.js** (Main Entry Point)
- Initializes Express app
- Connects to MongoDB
- Sets up CORS
- Registers routes
- Error handling
- Starts server on port 5000

### **config/database.js**
- MongoDB connection function
- Called at server startup
- Handles connection errors

### **Models/User.js**
- User schema definition
- Password hashing (pre-save hook)
- Password comparison method
- Fields: name, email, password, role

### **Models/Product.js**
- Product schema definition
- Fields: name, description, category, price, image, stock
- Reference to User (createdBy)

### **Controllers/authController.js**
- register() - User registration
- login() - User login with JWT
- forgotPassword() - Password reset token
- resetPassword() - Reset with token
- getCurrentUser() - Get logged-in user

### **Controllers/productController.js**
- getAllProducts() - List all products with pagination
- getProductById() - Get single product
- createProduct() - Create new product (Admin)
- updateProduct() - Update product (Admin)
- deleteProduct() - Delete product (Admin)
- getProductStatistics() - Product stats by category

### **middleware/auth.js**
- protect() - Verify JWT token
- adminOnly() - Check admin role

### **utils/validation.js**
- validateRegister() - Registration input rules
- validateLogin() - Login input rules
- validateProduct() - Product input rules
- validateForgotPassword() - Email validation
- validateResetPassword() - Password reset validation

### **utils/errorHandler.js**
- ErrorHandler class - Custom error class
- catchAsyncErrors() - Async error wrapper
- errorMiddleware() - Global error handler

### **utils/emailService.js**
- sendPasswordResetEmail() - Email for password reset
- sendWelcomeEmail() - Welcome email
- createTransporter() - Nodemailer configuration

---

## 🎯 Next: Connect Frontend

Once backend is running:

1. Update CORS in `.env` if needed
2. Configure frontend API base URL to `http://localhost:5000`
3. Send requests with JWT tokens in Authorization header

---

## 📞 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Update packages
npm update

# Clear npm cache
npm cache clean --force
```

---

## ✨ You're All Set!

✅ Backend is ready
✅ All files created
✅ Dependencies installed
✅ Start with: `npm run dev`

**Next: Connect your frontend and start testing!**

For detailed API documentation, see [README.md](README.md)
For quick testing, see [QUICKSTART.md](QUICKSTART.md)

---

**Happy coding! 🚀🐾**
