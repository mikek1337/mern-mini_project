# Role-Based Ticketing System

## Objective
Develop a basic role-based support ticketing system where users can create tickets and an admin can manage them.

## Requirements
Backend: Node.js, MongoDB

### User Authentication
- JWT-based login & signup.

### User Roles
- User: Can create tickets.
- Admin: Can manage tickets.

## Endpoints

### User Registration and Authentication
- POST /signup: Register users (with role selection).
- POST /login: Authenticate users and return a JWT token.

### Ticket Management
- POST /tickets: Create a support ticket (title, description, status).

### Ticket Viewing
- GET /tickets:
    - Users see only their own tickets.
    - Admins see all tickets.

### Ticket Updating
- PUT /tickets/:id: Admins can update ticket status (e.g., Open, In Progress, Closed).
