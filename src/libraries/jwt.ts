// This code snippet utilizes the jsonwebtoken library to handle JWT (JSON Web Token) encryption and decryption.
// JWTs are commonly used for secure communication between parties in web applications.

// Importing the jsonwebtoken library for JWT encryption and decryption.
import jwt from 'jsonwebtoken';

// Retrieving the JWT secret key and expiration time from environment variables.
const SECRETKEY = process.env.JWT_KEY as string;
const EXPIRATION_TIME = process.env.JWT_EXPIRATION;

// Function to encrypt a payload into a JWT token.
// It takes a payload object as input and returns the JWT token as a string.
const encrypt = (payload: any): string => {
    return jwt.sign(payload, SECRETKEY, { expiresIn: EXPIRATION_TIME });
};

// Function to decrypt a JWT token into its original payload.
// It takes a JWT token as input and returns the original payload object.
const decrypt = (token: string): any => {
    return jwt.verify(token, SECRETKEY);
};

// Exporting the decrypt and encrypt functions for use in other parts of the application.
export { decrypt, encrypt };
