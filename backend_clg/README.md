# 🐾 Pet Store Backend API

A production-ready backend API for a Pet Store application built with Node.js, Express.js, MongoDB, and JWT authentication.

## ✨ Features

- ✅ User Authentication (Registration, Login, Forgot Password, Reset Password)
- ✅ JWT Token-based Authorization
- ✅ Role-based Access Control (User/Admin)
- ✅ Product Management (CRUD Operations)
- ✅ Input Validation
- ✅ Error Handling
- ✅ CORS Configuration
- ✅ Password Hashing with bcryptjs
- ✅ MongoDB with Mongoose
- ✅ Pagination & Search Support
- ✅ Email Service Ready (Nodemailer)

## 🛠 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **express-validator** - Input validation
- **nodemailer** - Email service
- **nodemon** - Development server

## 📁 Project Structure

```
backend_clg/
├── config/
│   └── database.js              # MongoDB connection
├── Controllers/
│   ├── authController.js        # Authentication logic
│   └── productController.js     # Product CRUD logic
├── middleware/
│   └── auth.js                  # JWT verification & admin check
├── Models/
│   ├── User.js                  # User schema
│   └── Product.js               # Product schema
├── Routers/
│   ├── authRoutes.js            # Auth endpoints
│   └── productRoutes.js         # Product endpoints
├── utils/
│   ├── errorHandler.js          # Error handling utilities
│   ├── validation.js            # Input validation rules
│   └── emailService.js          # Email sending service
├── Server.js                    # Main server file
├── package.json                 # Dependencies
├── .env                         # Environment variables
└── README.md                    # This file
```

## 🚀 Installation & Setup

### 1. Prerequisites

- Node.js v14 or higher
- MongoDB (Local or Atlas)
- npm or yarn

### 2. Install Dependencies

Navigate to the backend folder and run:

```bash
cd backend_clg
npm install
```

This will install all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator
- nodemailer
- nodemon (dev)

### 3. Configure Environment Variables

Update the `.env` file with your configuration:

```env
# Server Port
PORT=5000

# MongoDB Connection (Local)
MONGO_URI=mongodb://localhost:27017/petstore

# Or for MongoDB Atlas
# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/petstore

# JWT Secret (Generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_in_production_123456789

# JWT Expiry (in days)
JWT_EXPIRY=14

# Email Configuration (Optional - for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail

# Environment
NODE_ENV=development
```

### 4. Start the Server

**Development Mode (with hot reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### 🔐 Authentication Endpoints

#### 1. Register User
- **POST** `/api/auth/register`
- **Access**: Public

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
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

#### 2. Login User
- **POST** `/api/auth/login`
- **Access**: Public

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f5c8...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 3. Forgot Password
- **POST** `/api/auth/forgot-password`
- **Access**: Public

Request Body:
```json
{
  "email": "john@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset email sent. Please check your email.",
  "resetToken": "abc123..." // Only in development
}
```

#### 4. Reset Password
- **POST** `/api/auth/reset-password`
- **Access**: Public

Request Body:
```json
{
  "token": "abc123...",
  "newPassword": "newpassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

#### 5. Get Current User
- **GET** `/api/auth/me`
- **Access**: Private (Requires JWT Token)

Headers:
```
Authorization: Bearer <your_jwt_token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "64f5c8...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 🛍 Product Endpoints

#### 1. Get All Products
- **GET** `/api/products`
- **Access**: Public
- **Query Parameters**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
  - `category` (optional) - Filter by category
  - `search` (optional) - Search by name or description

Example: `/api/products?page=1&limit=10&category=Dogs&search=puppy`

Response:
```json
{
  "success": true,
  "count": 5,
  "total": 50,
  "pages": 5,
  "currentPage": 1,
  "products": [
    {
      "_id": "64f5c8...",
      "name": "Golden Retriever",
      "description": "Friendly and loving breed",
      "category": "Dogs",
      "price": 500,
      "stock": 10,
      "image": "https://...",
      "createdBy": {
        "_id": "64f5c7...",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Get Product by ID
- **GET** `/api/products/:id`
- **Access**: Public

Response:
```json
{
  "success": true,
  "product": {
    "_id": "64f5c8...",
    "name": "Golden Retriever",
    "description": "Friendly and loving breed",
    "category": "Dogs",
    "price": 500,
    "stock": 10,
    "image": "https://...",
    "createdBy": {
      "_id": "64f5c7...",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Create Product (Admin Only)
- **POST** `/api/products`
- **Access**: Private/Admin (Requires JWT Token + Admin Role)

Headers:
```
Authorization: Bearer <admin_jwt_token>
```

Request Body:
```json
{
  "name": "Golden Retriever",
  "description": "A friendly and loving breed perfect for families",
  "category": "Dogs",
  "price": 500,
  "image": "https://...",
  "stock": 10
}
```

Categories Available:
- Dogs
- Cats
- Birds
- Fish
- Small Animals
- Reptiles
- Accessories
- Food
- Toys
- Grooming

Response:
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": { /* product data */ }
}
```

#### 4. Update Product (Admin Only)
- **PUT** `/api/products/:id`
- **Access**: Private/Admin

Headers:
```
Authorization: Bearer <admin_jwt_token>
```

Request Body:
```json
{
  "name": "Golden Retriever",
  "price": 550,
  "stock": 15
}
```

Response:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": { /* updated product data */ }
}
```

#### 5. Delete Product (Admin Only)
- **DELETE** `/api/products/:id`
- **Access**: Private/Admin

Headers:
```
Authorization: Bearer <admin_jwt_token>
```

Response:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### 6. Get Product Statistics
- **GET** `/api/products/stats/category`
- **Access**: Public

Response:
```json
{
  "success": true,
  "statistics": [
    {
      "_id": "Dogs",
      "count": 15,
      "totalStock": 150,
      "avgPrice": 450.5
    },
    {
      "_id": "Cats",
      "count": 10,
      "totalStock": 100,
      "avgPrice": 350.25
    }
  ]
}
```

---

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### How JWT Works:
1. User registers/logs in and receives a JWT token
2. Token is valid for 14 days (configurable in .env)
3. Token must be sent with each protected request
4. If token is invalid/expired, server returns 401 Unauthorized

---

## 🛡 Security Features

✅ **Password Hashing**: Passwords are hashed with bcryptjs (10 salt rounds) before storing
✅ **JWT Authentication**: Secure token-based authentication
✅ **Input Validation**: All inputs are validated using express-validator
✅ **Error Handling**: Comprehensive error handling with proper HTTP status codes
✅ **CORS Protection**: Configured CORS for frontend communication
✅ **Role-based Access**: Admin/User roles with middleware protection
✅ **Environment Variables**: Sensitive data stored in .env file

---

## 🧪 Testing with Postman

1. **Register a User**:
   - POST: `http://localhost:5000/api/auth/register`
   - Body: `{ "name": "John", "email": "john@test.com", "password": "password123" }`
   - Copy the `token` from response

2. **Login**:
   - POST: `http://localhost:5000/api/auth/login`
   - Body: `{ "email": "john@test.com", "password": "password123" }`

3. **Get Protected Route**:
   - GET: `http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer <your_token>`

4. **Create Product (Admin Only)**:
   - First, register/login with admin account
   - POST: `http://localhost:5000/api/products`
   - Headers: `Authorization: Bearer <admin_token>`
   - Body: Product data as shown above

---

## 📧 Email Configuration (Optional)

For password reset emails using Gmail:

1. Generate an App Password in Google Account:
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Enable 2-step verification
   - Generate App Password for "Mail"

2. Update `.env`:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
```

3. Uncomment the email sending in `authController.js`:
```javascript
// Uncomment to send email:
// await sendPasswordResetEmail(user.email, resetToken);
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check `MONGO_URI` in `.env`

### JWT Token Error
- Token might be expired (14 days default)
- Generate new token by logging in again
- Ensure `JWT_SECRET` is set in `.env`

### CORS Error
- Check `FRONTEND_URL` environment variable
- Ensure frontend URL matches CORS configuration

### Port Already in Use
- Change `PORT` in `.env` to a different port
- Or kill the process using the port

---

## 📝 Notes

- The `User` model has a `role` field (default: 'user')
- Only 'admin' role users can create/update/delete products
- Passwords are never returned in API responses (select: false)
- All timestamps use UTC format
- Error responses always have `success: false`

---

## 🚀 Production Deployment

Before deploying to production:

1. **Update .env variables**:
   ```env
   NODE_ENV=production
   JWT_SECRET=<generate-strong-random-string>
   MONGO_URI=<production-mongodb-uri>
   ```

2. **Install production dependencies**:
   ```bash
   npm install --production
   ```

3. **Use process manager** (PM2):
   ```bash
   npm install -g pm2
   pm2 start Server.js --name "petstore-api"
   pm2 startup
   pm2 save
   ```

4. **Set up reverse proxy** (Nginx/Apache)

5. **Use HTTPS** with SSL certificate

6. **Enable rate limiting** and other security headers

---

## 📞 Support

For issues or questions, please check the error messages returned by the API and consult the documentation above.

---

## 📄 License

ISC

---

**Made with ❤️ for Pet Lovers** 🐾
