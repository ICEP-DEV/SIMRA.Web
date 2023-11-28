// actions/forgotPasswordActions.js
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const forgotPasswordRequest = (email) => ({
  type: FORGOT_PASSWORD_REQUEST,
  email,
});

export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  error,
});
