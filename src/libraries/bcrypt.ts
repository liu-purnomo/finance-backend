// This code snippet utilizes the bcrypt library to handle password hashing and comparison securely.
// The bcrypt library is commonly used for password hashing in Node.js applications due to its security features.

// Importing the bcrypt library for password hashing and comparison.
const bcrypt = require('bcrypt');

// Defining the number of salt rounds for password hashing.
const saltRounds = 10;

// Generating a salt using the specified number of rounds.
const salt = bcrypt.genSaltSync(saltRounds);

// Function to hash a plain password using bcrypt.
// It takes a plain password as input and returns the hashed password.
export const hashPassword = (plainPassword: string): string => {
    return bcrypt.hashSync(plainPassword, salt);
};

// Function to compare a plain password with a hashed password using bcrypt.
// It takes a plain password and a hashed password as inputs and returns true if they match, false otherwise.
export const comparePassword = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};
