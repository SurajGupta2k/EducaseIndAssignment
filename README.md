# School Management API

A Node.js API for managing school data with location-based features.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file with following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. Add School
- **Endpoint:** `POST /api/addSchool`
- **Description:** Add a new school to the database
- **Request Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.34,
    "longitude": 56.78
  }
  ```
- **Response:**
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### 2. List Schools
- **Endpoint:** `GET /api/listSchools`
- **Description:** Get all schools sorted by distance from given coordinates
- **Query Parameters:**
  - latitude: float (-90 to 90)
  - longitude: float (-180 to 180)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.34,
      "longitude": 56.78,
      "distance": 5.2
    }
  ]
  ```

### 3. Delete School
- **Endpoint:** `DELETE /api/deleteSchool/:id`
- **Description:** Delete a school by ID
- **Parameters:**
  - id: School ID (in URL)
- **Response:**
  ```json
  {
    "message": "School deleted successfully"
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Server error

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