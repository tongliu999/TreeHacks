# Course Equivalence API

An API for finding course equivalences across universities and managing user favorites.

## API Endpoints

### Course Search
- **POST /course_search**
  - Find equivalent courses at target universities
  - Input:
    ```json
    {
      "university": "string",
      "course_code": "string",
      "target_school": "string" (optional, defaults to "Stanford University")
    }
    ```
  - Returns:
    ```json
    {
      "from_code": "string",
      "from_university": "string",
      "to_university": "string",
      "equivalences": [
        {
          "course_code": "string",
          "course_name": "string",
          "university": "string",
          "course_desc": "string",
          "similarity_score": "number",
          "eq_id": "string"
        }
      ]
    }
    ```

### User Courses
- **POST /get_user_courses**
  - Get course information with favorite status
  - Input:
    ```json
    {
      "user_id": "string",
      "from_code": "string",
      "from_university": "string",
      "to_university": "string"
    }
    ```

### Favorites Management
- **POST /add_favourite**
  - Add a course to user's favorites
  - Input:
    ```json
    {
      "user_id": "string",
      "eq_id": "string"
    }
    ```
  - Returns:
    - Success (200): `{"message": "Favourite added", "user_id": "string", "eq_id": "string"}`
    - Error (500): `{"error": "Failed to add favourite"}`

- **POST /remove_favourite**
  - Remove a course from user's favorites
  - Input:
    ```json
    {
      "user_id": "string",
      "eq_id": "string"
    }
    ```
  - Returns:
    - Success (200): `{"message": "Favourite removed", "user_id": "string", "eq_id": "string"}`
    - Error (500): `{"error": "Failed to remove favourite"}`

- **GET /get_favourites**
  - Get list of favorite eq_ids
  - Input: `{"user_id": "string"}`
  - Returns: Array of eq_ids

- **GET /get_favourites_with_course_info**
  - Get detailed course information for favorites
  - Input: `{"user_id": "string"}`
  - Returns: Detailed course information for all favorited courses

- **GET /get_equivalences_with_favourites**
  - Get equivalences with favorite status
  - Input:
    ```json
    {
      "user_id": "string",
      "from_code": "string",
      "from_university": "string",
      "to_university": "string"
    }
    ```
  - Returns: Equivalences with favorite status marked

## Favorite System Architecture

The system uses unique identifiers (`eq_id`) to track course equivalences and user favorites:

1. Each course equivalence is assigned a unique `eq_id` using UUID when generated
2. Favorites are stored in MongoDB across two collections:
   - `course_info.equivalences`: Course equivalence information
   - `user_info.favorites`: User favorite mappings
3. When a user favorites a course, the `eq_id` is stored with their `user_id`
4. Course retrieval includes checking if each course's `eq_id` exists in user's favorites
