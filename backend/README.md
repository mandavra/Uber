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
# Captain Endpoints Documentation

## Endpoint: `/captains/register`

### Description
This endpoint is used to register a new captain. It accepts captain details such as first name, last name, email, password, and vehicle details, and creates a new captain in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be unique and valid.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}


# Ride Endpoints Documentation

## Endpoint: `/rides/create`

### Description
This endpoint is used to create a new ride. It accepts user details, pickup location, destination, and vehicle type, and creates a new ride in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:

- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of the vehicle. Must be one of 'auto', 'car', or 'moto'.

Example:
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
Status Code: 201 Created
 Response Body:
                {
  "_id": "ride_id_here",
  "user": "user_id_here",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 100,
  "status": "pending",
  "otp": "123456"
}

# Maps Endpoints Documentation

## Endpoint: `/maps/get-coordinates`

### Description
This endpoint is used to get the coordinates (latitude and longitude) of a given address.

### Method
`GET`

### Query Parameters
The query parameters should be:

- `address` (string, required): The address to get coordinates for. Must be at least 3 characters long.

Example:
```sh
curl -X GET "http://localhost:3000/maps/get-coordinates?address=123%20Main%20St" .