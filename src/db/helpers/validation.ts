// This function generates Sequelize validation rules based on the provided parameters.
// It constructs an object containing validation rules for Sequelize models.

const disallowedUsernames = [
    'admin',
    'administrator',
    'superuser',
    'root',
    'user',
    'users',
    'admins',
    'administrator',
    'superusers',
    'roots'
];

interface ISequelizeValidateProps {
    field: string;
    notNull?: boolean;
    isUnique?: boolean;
    min?: number;
    max?: number;
    len?: number[];
    isEmail?: boolean;
}

// Importing necessary interface for Sequelize validation properties.
/**
 * This function generates Sequelize validation rules based on the provided parameters.
 * It constructs an object containing validation rules for Sequelize models.
 *
 * @param {Object} param - An object containing parameters for validation rules.
 *   - field: The name of the column.
 *   - notNull: (Optional) Whether the column can be null or not. Default is true.
 *   - isUnique: (Optional) Whether the column values should be unique. Default is false.
 *   - min: (Optional) The minimum length allowed for the column value.
 *   - max: (Optional) The maximum length allowed for the column value.
 *   - len: (Optional) An array with 2 elements specifying the allowed length range for the column value.
 *   - isEmail: (Optional) Whether the column value should be an email format. Default is false.
 * @returns {Object} An object containing validation rules for Sequelize models.
 *
 * Example Usage:
 * ```javascript
 * sequelizeValidate({
 * field: 'Username',
 * notNull: true,
 * isUnique: true,
 * min: 5,
 * max: 30,
 * len: [5, 30],
 * isEmail: false
 * })
 * ```
 */
export const validation = ({
    field,
    notNull = true,
    isUnique = false,
    min,
    max,
    len,
    isEmail
}: ISequelizeValidateProps) => {
    const output: any = {};

    // Setting allowNull and validation rules for notNull property.
    if (notNull) {
        output.allowNull = false;
        output.validate = {
            notNull: {
                args: true,
                msg: `${field} is required`
            },
            notEmpty: {
                // Changed 'notEmpty' from 'arg' to 'args' for correct spelling.
                args: true,
                msg: `${field} is required`
            }
        };
    }

    // Setting unique validation rule if isUnique is true.
    if (isUnique) {
        output.unique = {
            args: true,
            msg: `${field} already used`
        };
    }

    // Setting email validation rule if field is 'Email' or isEmail is true.
    if (field === 'Email' || isEmail) {
        output.validate.isEmail = {
            args: true,
            msg: 'Invalid email format'
        };
    }

    // Setting min length validation rule if min is provided.
    if (min) {
        output.validate.min = {
            args: min,
            msg: `${field} min ${min} characters`
        };
    }

    // Setting max length validation rule if max is provided.
    if (max) {
        output.validate.max = {
            args: max,
            msg: `${field} max ${max} characters` // Corrected 'min' to 'max' for better clarity.
        };
    }

    // Setting length validation rule if len is provided as an array with 2 elements.
    if (len?.length === 2) {
        output.validate.len = {
            args: len,
            msg: `${field} min ${len[0]} characters and max ${len[1]} characters` // Improved readability of the message.
        };
    }

    // Setting username validation rules if field is 'Username'.
    if (field === 'Username') {
        output.validate.is = {
            args: /^[a-z0-9\_\-]+$/i,
            msg: 'The username can only contain lowercase letters, numbers, dashes (-), or underscores (_).'
        };

        // Setting notIn validation rule to disallow certain usernames.
        output.validate.notIn = {
            args: disallowedUsernames,
            msg: 'Username is not allowed.'
        };
    }

    // Setting password validation rules if field is 'Password'.
    if (field === 'Password') {
        output.validate.is = {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{6,}$/i,
            msg: 'The password must contain uppercase letters, lowercase letters, numbers, and special characters.'
        };
    }

    return output; // Returning the constructed validation rules object.
};
