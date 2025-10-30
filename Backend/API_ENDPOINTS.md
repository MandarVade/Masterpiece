# API Endpoints Reference

## 🔐 Auth Endpoints (`/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user (multipart/form-data with avatar file) |
| POST | `/login` | ❌ | Login user (email + password) |
| POST | `/logout` | ✅ | Logout user, clear cookies |
| POST | `/refreshtoken` | ❌ | Refresh access token using refresh token |

---

## 🖼️ Product Endpoints (`/products`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | ❌ | Any | Get all products (paginated, filters) |
| GET | `/search` | ❌ | Any | Search products by query |
| GET | `/:productId` | ❌ | Any | Get product details |
| POST | `/` | ✅ | Seller | List new product (multipart with images) |
| PUT | `/:productId` | ✅ | Seller | Update product details |
| DELETE | `/:productId` | ✅ | Seller | Delete product |
| GET | `/seller/products` | ✅ | Seller | Get seller's products |
| POST | `/:productId/review` | ✅ | Buyer | Add/update review & rating |

---

## 🛒 Cart Endpoints (`/cart`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | Buyer | View cart items |
| POST | `/` | ✅ | Buyer | Add item to cart |
| PUT | `/:productId` | ✅ | Buyer | Update item quantity |
| DELETE | `/:productId` | ✅ | Buyer | Remove item from cart |
| POST | `/clear` | ✅ | Buyer | Clear entire cart |

---

## 📦 Order Endpoints (`/orders`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ | Buyer | Create order (checkout) |
| GET | `/history` | ✅ | Buyer | Get buyer's order history |
| GET | `/:orderId` | ✅ | Buyer | Get order details |
| GET | `/seller/orders` | ✅ | Seller | Get seller's orders (from items) |
| PUT | `/:orderId/status` | ✅ | Seller | Update order status (completed/cancelled) |

---

## Order Status Values

- `pending` - Buyer purchased, awaiting seller confirmation
- `completed` - Seller confirmed the order
- `cancelled` - Seller rejected or order was cancelled

---

## User Roles

- `buyer` - Can purchase, review, view orders
- `seller` - Can list products, update, view seller orders
- `admin` - Can manage everything
- `gallery` - (defined in schema, reserved for future)

---

## Error Responses

| Code | Message | Reason |
|------|---------|--------|
| 400 | Bad Request | Missing required fields or invalid data |
| 401 | Unauthorized | Missing token or invalid token |
| 403 | Forbidden | Insufficient permissions (wrong role) |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry (e.g., email exists) |
| 500 | Server Error | Internal server error |

---

## Request Headers

For authenticated requests:
```
Authorization: Bearer {accessToken}
```

OR tokens are auto-sent via cookies if using same domain.

---

## Response Format

All responses follow this format:

**Success (2xx):**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "pagination": { "total": 10, "page": 1, "limit": 10, "pages": 1 }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "detailed error message"
}
```

---

## Query Parameters

### Products
- `category` - Filter by category
- `minPrice` - Min price filter
- `maxPrice` - Max price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: "-createdAt")
- `query` - Search query (for search endpoint)

### Orders
- `page` - Page number
- `limit` - Items per page
- `status` - Filter by status (seller orders only)

---

## Examples

### Register Seller
```bash
curl -X POST http://localhost:8000/auth/register \
  -F "fullname=John Seller" \
  -F "email=seller@test.com" \
  -F "password=pass123" \
  -F "role=seller" \
  -F "avatar=@avatar.jpg"
```

### List Product
```bash
curl -X POST http://localhost:8000/products \
  -H "Authorization: Bearer {token}" \
  -F "title=Sunset Painting" \
  -F "description=Beautiful oil painting" \
  -F "price=500" \
  -F "category=landscape" \
  -F "images=@painting1.jpg" \
  -F "images=@painting2.jpg"
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/cart \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"productId":"product_id","quantity":2}'
```

### Create Order
```bash
curl -X POST http://localhost:8000/orders \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
```

### Confirm Order (Seller)
```bash
curl -X PUT http://localhost:8000/orders/:orderId/status \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed","notes":"Confirmed"}'
```
