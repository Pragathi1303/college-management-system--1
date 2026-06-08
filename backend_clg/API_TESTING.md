# 📮 Pet Store API - Complete Testing Guide

This guide provides all API endpoints with examples using cURL and Postman format.

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Endpoint:** `POST /api/auth/register`  
**Access:** Public  
**Rate Limit:** None  

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Postman Setup:
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response (Success):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5c89d1a2b3c4d5e6f7a8b",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Response (Error - Email exists):
```json
{
  "success": false,
  "message": "Email already registered. Please login."
}
```

**Validation Rules:**
- Name: 2-100 characters, required
- Email: Valid email format, unique, required
- Password: Minimum 6 characters, required

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Postman Setup:
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Body (raw JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response (Success):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5c89d1a2b3c4d5e6f7a8b",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Response (Error):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**⚠️ Save the token for protected requests!**

---

### 3. Get Current User (Protected)

**Endpoint:** `GET /api/auth/me`  
**Access:** Private (Requires JWT Token)  

#### cURL Example:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Postman Setup:
- **Method:** GET
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer YOUR_JWT_TOKEN_HERE`

#### Response:
```json
{
  "success": true,
  "user": {
    "id": "64f5c89d1a2b3c4d5e6f7a8b",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`  
**Access:** Public  

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### Response:
```json
{
  "success": true,
  "message": "Password reset email sent. Please check your email.",
  "resetToken": "abc123def456..." // Only in development
}
```

---

### 5. Reset Password

**Endpoint:** `POST /api/auth/reset-password`  
**Access:** Public  

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123def456...",
    "newPassword": "newpassword123"
  }'
```

#### Response:
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

---

## 🛍️ Product Endpoints

### 1. Get All Products

**Endpoint:** `GET /api/products`  
**Access:** Public  
**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `search` - Search in name/description

#### cURL Examples:

**Get first page:**
```bash
curl http://localhost:5000/api/products
```

**With pagination:**
```bash
curl "http://localhost:5000/api/products?page=2&limit=5"
```

**Filter by category:**
```bash
curl "http://localhost:5000/api/products?category=Dogs"
```

**Search:**
```bash
curl "http://localhost:5000/api/products?search=puppy"
```

**Combined:**
```bash
curl "http://localhost:5000/api/products?page=1&limit=10&category=Dogs&search=golden"
```

#### Postman Setup:
- **Method:** GET
- **URL:** `http://localhost:5000/api/products`
- **Params (Tab):**
  - page: 1
  - limit: 10
  - category: Dogs (optional)
  - search: golden (optional)

#### Response:
```json
{
  "success": true,
  "count": 5,
  "total": 50,
  "pages": 5,
  "currentPage": 1,
  "products": [
    {
      "_id": "64f5c89d1a2b3c4d5e6f7a8b",
      "name": "Golden Retriever",
      "description": "A friendly and loving breed",
      "category": "Dogs",
      "price": 500,
      "stock": 10,
      "image": "https://example.com/image.jpg",
      "createdBy": {
        "_id": "64f5c89d1a2b3c4d5e6f7a8c",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Product

**Endpoint:** `GET /api/products/:id`  
**Access:** Public  

#### cURL Example:
```bash
curl http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b
```

#### Postman Setup:
- **Method:** GET
- **URL:** `http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b`

#### Response:
```json
{
  "success": true,
  "product": {
    "_id": "64f5c89d1a2b3c4d5e6f7a8b",
    "name": "Golden Retriever",
    "description": "A friendly and loving breed perfect for families",
    "category": "Dogs",
    "price": 500,
    "stock": 10,
    "image": "https://example.com/image.jpg",
    "createdBy": {
      "_id": "64f5c89d1a2b3c4d5e6f7a8c",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. Create Product (Admin Only)

**Endpoint:** `POST /api/products`  
**Access:** Private/Admin  
**Required Headers:** `Authorization: Bearer <ADMIN_TOKEN>`

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Golden Retriever",
    "description": "A friendly and loving breed perfect for families",
    "category": "Dogs",
    "price": 500,
    "image": "https://example.com/golden-retriever.jpg",
    "stock": 10
  }'
```

#### Postman Setup:
- **Method:** POST
- **URL:** `http://localhost:5000/api/products`
- **Headers:**
  - `Authorization: Bearer YOUR_ADMIN_TOKEN`
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Golden Retriever",
  "description": "A friendly and loving breed perfect for families",
  "category": "Dogs",
  "price": 500,
  "image": "https://example.com/golden-retriever.jpg",
  "stock": 10
}
```

#### Available Categories:
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

#### Response (Success):
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f5c89d1a2b3c4d5e6f7a8b",
    "name": "Golden Retriever",
    "description": "A friendly and loving breed perfect for families",
    "category": "Dogs",
    "price": 500,
    "stock": 10,
    "image": "https://example.com/golden-retriever.jpg",
    "createdBy": "64f5c89d1a2b3c4d5e6f7a8c",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Update Product (Admin Only)

**Endpoint:** `PUT /api/products/:id`  
**Access:** Private/Admin  

#### cURL Example:
```bash
curl -X PUT http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Golden Retriever Premium",
    "price": 550,
    "stock": 15
  }'
```

#### Postman Setup:
- **Method:** PUT
- **URL:** `http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b`
- **Headers:**
  - `Authorization: Bearer YOUR_ADMIN_TOKEN`
  - `Content-Type: application/json`

#### Response:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": { /* updated product */ }
}
```

---

### 5. Delete Product (Admin Only)

**Endpoint:** `DELETE /api/products/:id`  
**Access:** Private/Admin  

#### cURL Example:
```bash
curl -X DELETE http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

#### Postman Setup:
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/products/64f5c89d1a2b3c4d5e6f7a8b`
- **Headers:**
  - `Authorization: Bearer YOUR_ADMIN_TOKEN`

#### Response:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### 6. Product Statistics

**Endpoint:** `GET /api/products/stats/category`  
**Access:** Public  

#### cURL Example:
```bash
curl http://localhost:5000/api/products/stats/category
```

#### Response:
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

## 🧪 Postman Collection Setup

### Import as Environment Variables:

1. Create new Environment in Postman
2. Add variables:
```
{
  "base_url": "http://localhost:5000",
  "token": "", // Will be filled after login
  "admin_token": "", // Admin token
  "product_id": "", // Product ID from create/get
  "user_email": "john@example.com",
  "user_password": "password123"
}
```

3. Use `{{base_url}}` instead of hardcoding URLs

### Pre-request Script (Auto-token insertion):

In Postman, go to Tests tab and add:
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
  var jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set("token", jsonData.token);
  }
}
```

---

## ⚠️ Common Errors & Solutions

### 401 Unauthorized
**Cause:** Missing or invalid token
**Solution:** 
- Ensure token is included in Authorization header
- Token format: `Bearer <token>`
- Token may be expired

### 403 Forbidden
**Cause:** User is not admin
**Solution:**
- Only admin can create/update/delete products
- Contact admin to change role in database

### 404 Not Found
**Cause:** Product or user doesn't exist
**Solution:**
- Check product/user ID
- Verify ID is correct MongoDB ObjectId

### 400 Bad Request
**Cause:** Invalid input data
**Solution:**
- Check all required fields are provided
- Validate field types and lengths
- See validation rules for each endpoint

---

## 💡 Testing Workflow

1. **Register User**
   ```
   POST /api/auth/register
   ```

2. **Save Token**
   - Copy token from response
   - Set in Postman environment or header

3. **Create Product** (if admin)
   ```
   POST /api/products
   - Use saved token
   ```

4. **Get All Products**
   ```
   GET /api/products
   ```

5. **Get Single Product**
   ```
   GET /api/products/:id
   - Use product ID from create response
   ```

6. **Update Product**
   ```
   PUT /api/products/:id
   - Use saved token
   ```

7. **Delete Product**
   ```
   DELETE /api/products/:id
   - Use saved token
   ```

---

## 📊 Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Server issue |

---

**Happy Testing! 🚀🐾**
