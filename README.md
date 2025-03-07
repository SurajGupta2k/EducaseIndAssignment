# School Management API

A Node.js API for managing school data with location-based features. The system allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Live API
Base URL: `https://educaseindassignment.onrender.com`

## Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## API Endpoints

### 1. Add School
- **Endpoint:** `POST /api/addSchool`
- **Description:** Add a new school to the database
- **Request Body:**
  ```json
  {
    "name": "DPS School",
    "address": "52 JSP College, New Delhi",
    "latitude": 65.0660,
    "longitude": 39.8777
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Error message here"
  }
  ```

### 2. List Schools
- **Endpoint:** `GET /api/listSchools`
- **Description:** Get all schools sorted by distance from provided coordinates
- **Query Parameters:**
  - `latitude`: float (-90 to 90)
  - `longitude`: float (-180 to 180)
- **Example Request:**
  ```
  GET /api/listSchools?latitude=65.0660&longitude=39.8777
  ```
- **Success Response:**
  ```json
  [
    {
      "id": 1,
      "name": "DPS School",
      "address": "52 JSP College, New Delhi",
      "latitude": 65.0660,
      "longitude": 39.8777,
      "distance": 0
    }
  ]
  ```
- **Error Response:**
  ```json
  {
    "error": "Latitude and longitude are required"
  }
  ```

## Sample Usage

### Using cURL

1. Add a School:
```bash
curl -X POST \
  https://educaseindassignment.onrender.com/api/addSchool \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "DPS School",
    "address": "52 JSP College, New Delhi",
    "latitude": 65.0660,
    "longitude": 39.8777
}'
```

2. List Schools:
```bash
curl "https://educaseindassignment.onrender.com/api/listSchools?latitude=65.0660&longitude=39.8777"
```

### Using JavaScript Fetch

1. Add a School:
```javascript
fetch('https://educaseindassignment.onrender.com/api/addSchool', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "DPS School",
        address: "52 JSP College, New Delhi",
        latitude: 65.0660,
        longitude: 39.8777
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

2. List Schools:
```javascript
fetch('https://educaseindassignment.onrender.com/api/listSchools?latitude=65.0660&longitude=39.8777')
.then(response => response.json())
.then(data => console.log(data));
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request (invalid input)
- 500: Server error

## Validation

- School name: Required, string
- Address: Required, string
- Latitude: Required, float between -90 and 90
- Longitude: Required, float between -180 and 180

## Distance Calculation

The API uses the Haversine formula to calculate distances between coordinates, returning results in kilometers. 