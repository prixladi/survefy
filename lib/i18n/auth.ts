const auth = {
    email: '$t(email, capitalize)',
    emailRequired: '$t(auth.email) is required',
    emailInvalid: '$t(auth.email) is in invalid format',
    emailDuplicate: 'User with $t(pages.auth.email) already exists',
    password: '$t(password, capitalize)',
    passwordRequired: '$t(auth.password) is required',
    passwordShort: '$t(auth.password) must be at least 6 characters',
    signin: {
      title: '$t(login, capitalize) $t(appSuffix)',
      button: '$t(login, capitalize)',
      invalid: 'Invalid $t(email) or $t(password)',
      goToSignup: 'No account? $t(signUp)',
    },
    signup: {
      title: '$t(register, capitalize) $t(appSuffix)',
      button: '$t(register, capitalize)',
      goToSignin: 'Already have an account?',
    },
};

export default auth;
