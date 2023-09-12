# A RESOURCE API

# A REST API with Node.js, Postgres & TypeScript

## Project Overview:
A simple REST API capable of CRUD operations on a "PERSON" resource.

 [postman collection for the finished API](https://documenter.getpostman.com/view/27252655/2s9YC31tnR)

[DOCUMENTATION]()

[TEST]()

Added .env, and node_modules to my .gitignore before pushing any changes to your repository. 

## Common issues
* Managing environment variables

## Architecture:

Backend Framework: Node.js with Express.js
Database: Json File for storing account data
API Documentation: Postman for clear API documentation
Validation: joi for user's Json payload validation
Version Control: Git and GitHub for collaborative development
Deployment: Render for hosting

## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* Request validation


## Prerequisites
* An IDE or text editor (VS Code)
* Node.js 16.0 or higher version installed
* Postman
* A package manager such as NPM or Yarn
* Git installed for Collobration


## Technologies
* Yarn
* TypeScript
* Express.js & Express.js middleware
* Joi validation

## Getting Started
* Follow these steps to set up and run the API locally.
* Create a new folder: ResourceAPI


``node js
cd ResourceAPI
yarn init -y

## Folder Structure:

* src: Contains the application source code.
* controllers: Handle request and response logic.
* models: Define database models.
* routes: Define API endpoints.
* config: Store configuration files.
* tests: Contains Postman Automation test script
* docs: Stores API documentation files.

## Design Structure
## Database Design:

* Postgres: Create data and storing user data.
* Data: Store account information (e.g., User's Personal to create, read, update and delete ).

## API Endpoints:

## Endpoint 1: Create a New User (POST /api/createuser)

* Receives JSON payload with user details.
* Validates data.
* create a new user.
* Stores data in the database.
* Responds with a user details.

## Endpoint 2: Read a user detail (GET /api/users/{user_id})

* Responds with a user's details.

## Endpoint 3: Get all users details (GET /api/users)

* Responds with an array of all persons details.

## Endpoint 4: Update all Person's details (PUT /api/users/update/{user_id})

* Receives JSON payload with user details.
* update a person detail.
* Stores data in the database.
* Responds with a user details.

## Endpoint 5: Update a property of Person's details (PATCH /api/update/{user_id})

* Receives JSON payload with user details.
* update a property of a user's details.
* Stores data in the database.
* Responds with a user details.

## Endpoint 6: Delete all Person's details (DELETE /api/delete/{user_id})

* Receives a param of id.
* Responds deletes the person's details.

## Testing:

* An automated Postman scripting test
## Documentation:

* Generate API documentation using Postman or a similar tool.
* Include detailed information about how to use each endpoint

## Versioning:
* Implement API versioning to ensure backward compatibility.

## Known Limitations and Assumptions:
* Input validation is handled by Node package dependency JOI in this task. 
* Implement more robust validation and error handling in a production-ready application.
* Authentication and authorization mechanisms are not implemented here. Ensure secure access to your API in a real-world scenario.
* This documentation assumes that you have successfully set up the API locally.

## Deployment
* To deploy this API to a production server, follow the appropriate deployment practices for NODE JS applications. Ensure proper security measures, such as using HTTPS, implementing authentication, and securing sensitive data.