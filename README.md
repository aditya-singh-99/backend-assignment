# backend-assignment

This is a simple authentication API built with **Node.js**, **Express**, and **MongoDB**. It includes user registration, login, and profile update functionalities with JWT-based authentication.

## Features
- **User Signup**: Register a new user with email, username, and password.
- **User Sign-in**: Authenticate using username/email and password.
- **Profile Update**: Authenticated users can update their email or password (username remains fixed).
- **JWT Authentication**: Uses JSON Web Tokens (JWT) for secure access.
- **Password Hashing**: Ensures security using bcrypt.

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/aditya-singh-99/backend-assignment.git
   cd backend-assignment
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root and add:
   ```sh
   MONGO_DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the server**
   ```sh
   npm run start
   ```
   The server will run on http://localhost:3000.

## API Endpoints

### 1. User Signup
**POST** `/signup`
#### Request Body:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
#### Response:
```json
{
  "message": "Signup successfull"
}
```

### 2. User Sign-in
**POST** `/signin`
#### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
#### Response:
```json
{
  "message": "Signin successful",
  "token": "your_jwt_token"
}
```

### 3. Profile Update
**PUT** `/update` (Requires Authentication)
#### Headers:
```sh
Authorization: Bearer your_jwt_token
```
#### Request Body:
```json
{
  "email": "newemail@example.com",
  "password": "newpassword"
}
```
#### Response:
```json
{
  "message": "Profile update successfull"
}
```

## Middleware
- **isLogin**: Verifies JWT token and allows access to protected routes.

## Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables

## License
This project is licensed under the MIT License.

## Author
**Aditya Kumar Singh**

---
### Want improvements? Feel free to contribute! 🚀

