# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It accepts user details such as first name, last name, email, and password, and creates a new user in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be unique and at least 5 characters long.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```