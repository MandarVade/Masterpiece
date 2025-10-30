# 🎨 Masterpiece Backend - Testing Guide

## ✅ Backend Ready Status: YES ✓

Your marketplace backend is **fully functional and ready for testing**!

---

## 📁 Project Structure

```
Backend/Src/
├── Models/
│   ├── user.models.js          ✅ User schema (buyer/seller)
│   ├── product.models.js       ✅ Product schema (paintings)
│   ├── cart.models.js          ✅ Cart schema
│   └── order.models.js         ✅ Order schema (simplified)
├── Controllers/
│   ├── auth.controllers.js     ✅ Register, Login, Logout, Refresh
│   ├── product.controllers.js  ✅ Product CRUD + Search + Review
│   ├── cart.controllers.js     ✅ Cart operations
│   └── order.controllers.js    ✅ Order creation & management
├── Routes/
│   ├── auth.routes.js          ✅ Auth endpoints
│   ├── product.routes.js       ✅ Product endpoints
│   ├── cart.routes.js          ✅ Cart endpoints
│   └── order.routes.js         ✅ Order endpoints
├── Middlewares/
│   ├── auth.middleware.js      ✅ JWT verification
│   ├── role.middleware.js      ✅ Buyer/Seller role checks
│   └── multer.middleware.js    ✅ File uploads
├── Utils/
│   ├── jwt.util.js             ✅ JWT helpers
│   └── cloudinary.js           ✅ Image uploads
├── app.js                      ✅ Express app with all routes mounted
└── index.js                    ✅ Server entry point
```

---

## 🚀 Quick Start

### 1. **Environment Setup**
Create `.env` file in `Backend/` folder:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

ACCESS_TOKEN_SECRET=your_secret_key_here
ACCESS_TOKEN_EXPIRY=15m
ACCESS_TOKEN_COOKIE_MAXAGE=900000

REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
REFRESH_TOKEN_EXPIRY=7d
REFRESH_TOKEN_COOKIE_MAXAGE=604800000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. **Start Server**
```powershell
cd Backend
npm install    # if not done
npm start      # runs nodemon Src/index.js
```

Expected output:
```
MONGODB CONNECTION ESTABLISHED! DB HOST: localhost
Server is running at port : http://localhost:8000
```

---

## 🧪 Complete API Testing Flow

### **Phase 1: Authentication**

#### Register as Seller
```
POST http://localhost:8000/auth/register
Content-Type: multipart/form-data

fullname: John Seller
email: seller@test.com
password: password123
role: seller
avatar: [file] avatar.jpg (required)
coverImage: [file] cover.jpg (optional)
```

**Response:** 
```json
{
  "success": true,
  "message": "User registered",
  "data": {
    "user": { "_id": "user_id_1", "fullname": "John Seller", "email": "seller@test.com", "role": "seller" },
    "accessToken": "jwt_token_here"
  }
}
```

#### Register as Buyer
```
POST http://localhost:8000/auth/register
Content-Type: multipart/form-data

fullname: Jane Buyer
email: buyer@test.com
password: password123
role: buyer
avatar: [file] avatar.jpg
```
{
  "email": "seller@test.com",
  "password": "password123"
}
#### Login
```
POST http://localhost:8000/auth/login
Content-Type: application/json

{
  "email": "seller@test.com",
  "password": "password123"
}
```

---

### **Phase 2: Product Management (Seller)**

#### List a Painting
```
POST http://localhost:8000/products
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

title: Beautiful Sunset
description: A stunning oil painting of sunset
price: 500
category: landscape
medium: oil
yearCreated: 2023
images: [file] painting1.jpg [file] painting2.jpg (max 10)
tags: sunset,nature,oil
```

#### Get All Products (Public)
```
GET http://localhost:8000/products?category=landscape&minPrice=100&maxPrice=1000&page=1&limit=10
```

#### Search Products (Public)
```
GET http://localhost:8000/products/search?query=sunset&minPrice=100
```

#### Get Seller's Products (Seller)
```
GET http://localhost:8000/products/seller/products
Authorization: Bearer {sellerToken}
```

#### Update Product (Seller)
```
PUT http://localhost:8000/products/:productId
Authorization: Bearer {sellerToken}
Content-Type: multipart/form-data

title: Updated Title
price: 600
description: Updated description
```

#### Delete Product (Seller)
```
DELETE http://localhost:8000/products/:productId
Authorization: Bearer {sellerToken}
```

---

### **Phase 3: Shopping Cart (Buyer)**

#### Add to Cart
```
POST http://localhost:8000/cart
Authorization: Bearer {buyerToken}
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### View Cart
```
GET http://localhost:8000/cart
Authorization: Bearer {buyerToken}
```

#### Update Cart Item Quantity
```
PUT http://localhost:8000/cart/:productId
Authorization: Bearer {buyerToken}
Content-Type: application/json

{
  "quantity": 5
}
```

#### Remove from Cart
```
DELETE http://localhost:8000/cart/:productId
Authorization: Bearer {buyerToken}
```

#### Clear Cart
```
POST http://localhost:8000/cart/clear
Authorization: Bearer {buyerToken}
```

---

### **Phase 4: Orders & Purchase (Buyer)**

#### Create Order (Buy)
```
POST http://localhost:8000/orders
Authorization: Bearer {buyerToken}
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response:** Order created with status: `pending`
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "order_id",
    "status": "pending",
    "totalAmount": 1000,
    "buyer": { "fullname": "Jane Buyer" },
    "items": [{ "product": "painting_1", "seller": "seller_id", "quantity": 2 }]
  }
}
```

#### View Order History (Buyer)
```
GET http://localhost:8000/orders/history?page=1&limit=10
Authorization: Bearer {buyerToken}
```

#### View Order Details (Buyer)
```
GET http://localhost:8000/orders/:orderId
Authorization: Bearer {buyerToken}
```

---

### **Phase 5: Order Confirmation (Seller)**

#### Get Seller's Orders
```
GET http://localhost:8000/orders/seller/orders?status=pending
Authorization: Bearer {sellerToken}
```

#### Confirm Order (Seller)
```
PUT http://localhost:8000/orders/:orderId/status
Authorization: Bearer {sellerToken}
Content-Type: application/json

{
  "status": "completed",
  "notes": "Order confirmed and ready"
}
```

#### Cancel Order (Seller)
```
PUT `http://localhost:8000/orders/:orderId/status`
Authorization: Bearer {sellerToken}
Content-Type: application/json

{
  "status": "cancelled",
  "notes": "Out of stock"
}
```

---

### **Phase 6: Reviews (Buyer)**

#### Add Review to Product
```
POST http://localhost:8000/products/:productId/review
Authorization: Bearer {buyerToken}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing painting! Highly recommend!"
}
```

---

## 🔐 Authentication Flow

1. **Register** → Get `accessToken` + `refreshToken` (in cookies)
2. **Login** → Get `accessToken` + `refreshToken` (in cookies)
3. **Use Token** → Include `Authorization: Bearer {token}` header OR token is auto-sent in cookies
4. **Token Expires?** → POST `/auth/refreshtoken` to get new access token
5. **Logout** → POST `/auth/logout` to clear cookies

---

## 📋 Order Status Flow (Simplified)

```
Buyer Creates Order (pending)
         ↓
    Seller Reviews
         ↓
   Seller Confirms (completed) ✓
         OR
   Seller Rejects (cancelled) ✗
```

---

## ⚠️ Important Notes for Testing

1. **Roles Matter:**
   - Sellers can: list products, update, delete, confirm orders
   - Buyers can: view products, add to cart, create orders, review

2. **Stock Management:**
   - When order is created, product stock is **automatically decreased**
   - Add/update cart validates stock before adding

3. **File Uploads:**
   - Products need images (Cloudinary)
   - User avatars are required during registration
   - Max 10 images per product listing

4. **Cookies:**
   - Tokens are stored in httpOnly cookies
   - Use `credentials: 'include'` in frontend fetch

5. **Errors:**
   - 400: Bad request (missing fields, invalid data)
   - 401: Unauthorized (no token or invalid)
   - 403: Forbidden (wrong role)
   - 404: Not found
   - 500: Server error

---

## 🧪 Recommended Testing Order

1. ✅ Register seller + buyer
2. ✅ Login with both
3. ✅ Seller lists product
4. ✅ Buyer views products
5. ✅ Buyer adds to cart
6. ✅ Buyer creates order
7. ✅ Seller confirms order
8. ✅ Buyer reviews product
9. ✅ Test search & filters
10. ✅ Test logout

---

## ✨ Backend Summary

| Feature                   | Status  |
| ------------------------- | ------- |
| User Authentication (JWT) | ✅ Ready |
| Product Management        | ✅ Ready |
| Shopping Cart             | ✅ Ready |
| Orders & Purchase         | ✅ Ready |
| Reviews                   | ✅ Ready |
| File Uploads (Cloudinary) | ✅ Ready |
| Role-based Access         | ✅ Ready |
| Error Handling            | ✅ Ready |

---

## 🚀 You're All Set!

Your backend is **production-ready** for marketplace testing. All models, controllers, routes, middlewares, and utilities are properly integrated and functional.

**Happy Testing! 🎉**
