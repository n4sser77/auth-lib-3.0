# Auth Library

This library provides basic authentication functionality including user registration, login, and token-based authentication using AWS DynamoDB and JSON Web Tokens (JWT).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Register a User](#register-a-user)
  - [Login a User](#login-a-user)
  - [Authenticate a User](#authenticate-a-user)
- [Functions](#functions)
  - [register](#register)
  - [login](#login)
  - [authenticate](#authenticate)
- [Environment Variables](#environment-variables)

## Installation

Ensure you have Node.js installed. You can then use this library by importing it into your project.
download or clone repo and import the functions to your application.

## Usage

### Register a User

To register a new user, call the `register` function with a username and password. This will hash the password and store the user's credentials in DynamoDB.

```javascript
import { register } from 'auth-lib';

register('username', 'password')
    .then(() => console.log('User registered successfully'))
    .catch(error => console.error(error.message));
```

### Login a User

To log in a user, call the `login` function with a username and password. This will check the user's credentials and return a token if they are valid.

```javascript
import { login } from 'auth-lib';

login('username', 'password')
    .then(token => console.log('Login successful, token:', token))
    .catch(error => console.error(error.message));
```

### Authenticate a User

To authenticate a user, call the `authenticate` function with a token. This will return the user's details if the token is valid.

```javascript
import { authenticate } from 'auth-lib';

try {
    const user = authenticate('token');
    console.log('User authenticated:', user);
} catch (error) {
    console.error(error.message);
}
```

## Functions

### register

Registers a new user by hashing the password and storing the user's credentials in DynamoDB.

- **Parameters:**
  - `username` (string): The username of the new user.
  - `password` (string): The password of the new user.
- **Throws:**
  - `Error`: If the user already exists.

### login

Logs in a user by checking the provided credentials and returning a token.

- **Parameters:**
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Returns:**
  - `token` (string): The generated token for the user.
- **Throws:**
  - `Error`: If the username or password is invalid.

### authenticate

Authenticates a user by validating the provided token.

- **Parameters:**
  - `token` (string): The token to authenticate.
- **Returns:**
  - `user` (object): The authenticated user's details.
- **Throws:**
  - `Error`: If the token is invalid.

## Environment Variables

Ensure to set the following environment variables in your `.env` file:

```plaintext
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-aws-region
DYNAMODB_TABLE_NAME=your-table-name
JWT_SECRET_KEY=your-jwt-secret-key
```

This library provides a simple and effective way to handle user authentication with AWS DynamoDB and JSON Web Tokens. Ensure to handle errors properly in a production environment and follow best security practices.
```
