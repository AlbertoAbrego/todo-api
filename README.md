# ToDo API with TypeScript + Express

A simple API REST to manage tasks (ToDos), developed with Typescript, Express and authentication with JWT. Includes interactive documentation with Swagger and basic persistence with JSON file.

---

## Technologies

-   [TypeScript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/)
-   [JWT](https://jwt.io/)
-   [Swagger](https://swagger.io/)
-   [Node.js](https://nodejs.org/)

---

## Installation

```bash
# Clone repository
git clone https://github.com/tuusuario/todo-api-ts.git
cd todo-api-ts

# Install dependencies
npm install
```

---

## Scripts

```bash
# Run in development mode
npm run dev

# Build project
npm run build
```

---

## Authentication

Login path:

```
POST /api/login
```

Body:

```json
{
    "username": "admin",
    "password": "1234"
}
```

JWT Token must be sent in the header for authorization:

```http
Authorization: Bearer <token>
```

---

## Main Endpoints

### `/api/todos` (protected with JWT)

-   `GET /` - List all ToDos
-   `POST /` - Create new ToDo
-   `PUT /:id` - Toggle ToDo completed
-   `DELETE /:id` - Delete ToDo

---

## Swagger Documentation

Available at:

```
http://localhost:3000/api-docs
```

---

## Author

**Alberto Barcenas**  
GitHub: [@AlbertoAbrego](https://github.com/AlbertoAbrego)
