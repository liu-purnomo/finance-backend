export const errorList = {
  dd: {
    code: 200,
    message: 'Success, But Die Dump',
  },
  tokenExpired: {
    code: 400,
    message: 'Token expired, a new token has been sent to your email',
  },
  invalidToken: {
    code: 400,
    message: 'Invalid code',
  },
  inactiveAccount: {
    code: 400,
    message: 'This account is inactive',
  },
  accessTokenNotFound: {
    code: 401,
    message: 'You do not have access',
  },
  invalidAccessToken: {
    code: 401,
    message: 'Invalid access token',
  },
  invalidOldPassword: {
    code: 400,
    message: 'Old password does not match',
  },
  invalidLogin: {
    code: 400,
    message: 'Incorrect email or password',
  },
  notFound: {
    code: 404,
    message: 'Not Found',
  },
  notAuthorized: {
    code: 401,
    message: 'Access denied',
  },
  updatedFailed: {
    code: 422,
    message: 'Failed to update data',
  },
};
