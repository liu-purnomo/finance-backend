export const requireError = (name: string) => {
    return {
        code: 400,
        message: `${name} is required`
    };
};

export const notFoundError = (name: string) => {
    return {
        code: 404,
        message: `${name} not found`
    };
};

export const invalidError = (name: string) => {
    return {
        code: 400,
        message: `${name} is invalid`
    };
};

export const duplicateError = (name: string) => {
    return {
        code: 400,
        message: `${name} already exists`
    };
};

export const inactiveError = (name: string) => {
    return {
        code: 400,
        message: `${name} is inactive`
    };
};

export const customError = (code: number, message: string) => {
    return {
        code,
        message
    };
};
