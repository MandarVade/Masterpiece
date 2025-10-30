# Auth Routes

## Register
**POST** `/auth/register`

**Type:** multipart/form-data

**Fields:**
- `fullname` (string, required)
- `email` (string, required)
- `password` (string, required)
- `bio` (string, optional)
- `role` (string, optional) - enum: 'buyer', 'seller', 'admin', 'gallery'
- `avatar` (file, required)
- `coverImage` (file, optional)

---

## Login
**POST** `/auth/login`

**Type:** application/json

**Fields:**
- `email` (string, required)
- `password` (string, required)

---

## Logout
**POST** `/auth/logout`

**Type:** application/json

**Auth:** Required (Bearer token or cookie)

**Fields:** None

---

## Refresh Token
**POST** `/auth/refreshtoken`

**Type:** application/json

**Fields:** None (uses refreshToken from cookie or body)
