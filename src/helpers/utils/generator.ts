// This class provides methods for generating text.

// Importing UUID generation library.
// import UUID from 'uuid-1345';

// Constant for uppercase letters
export const uppercaseAlphabets = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

// Constant for lowercase letters
export const lowercaseAlphabets = 'abcdefghjkmnpqrstuvwxyz';

// Constant for numbers
export const numbers = '23456789';

// Constant for unique characters
export const uniqueCharacters = '!@#$%^&*()_-+=<>?';

export interface IGeneratorKeyProps {
    length?: number;
    isUppercase?: boolean;
    isLowercase?: boolean;
    includeNumber?: boolean;
    includeSymbol?: boolean;
}

export class Generator {
    // Method to generate a random key based on specified options.
    /**
     * Generate a random key based on specified options.
     * @param {IGeneratorKeyProps} options - Options for generating the key.
     * @returns {string} The generated key.
     * @example
     * // Generate a random key with uppercase, lowercase, and numbers
     * const randomKey = Generator.key({
     *     length: 8,
     *     isUppercase: true,
     *     isLowercase: true,
     *     includeNumber: true,
     *     includeSymbol: false
     * });
     * console.log(randomKey); // Example output: "aB3CdEfG"
     */

    static key({
        length = 5,
        isUppercase = true,
        isLowercase = false,
        includeNumber = false,
        includeSymbol = false
    }: IGeneratorKeyProps) {
        let charset = '';

        // Adding characters to the charset based on options.
        if (isUppercase) charset += uppercaseAlphabets;
        if (isLowercase) charset += lowercaseAlphabets;
        if (includeNumber) charset += numbers;
        if (includeSymbol) charset += uniqueCharacters;

        // Throwing error if charset is empty.
        if (charset.length === 0) {
            throw new Error('At least have an options.');
        }

        let key = '';
        const charsetLength = charset.length;

        // Generating random key using the charset.
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            key += charset[randomIndex];
        }

        return key;
    }

    // Method to generate a UUID using the provided identifier.
    /**
     * Generate a UUID using the provided identifier.
     * @param {string} identifier - The identifier for generating the UUID.
     * @returns {string} The generated UUID.
     * @example
     * // Generate a UUID with an example identifier
     * const uuid = Generator.uuid("exampleIdentifier");
     * console.log(uuid); // Example output: "4d48125e-146c-5680-a9a1-935b8f9fc595"
     */
}
