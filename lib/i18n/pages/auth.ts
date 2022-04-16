const auth = {
  auth: {
    email: '$t(email, capitalize)',
    emailRequired: '$t(pages.auth.email) is required',
    emailInvalid: '$t(pages.auth.email) is in invalid format',
    password: '$t(password, capitalize)',
    passwordRequired: '$t(pages.auth.password) is required',
    passwordShort: '$t(pages.auth.password) must be at least 6 characters',
    signin: {
      title: '$t(login, capitalize) $t(appSuffix)',
      button: '$t(login, capitalize)',
      goToSignup: 'No account? $t(signUp)',
    },
    signup: {
      title: '$t(register, capitalize) $t(appSuffix)',
      button: '$t(register, capitalize)',
      goToSignin: 'Already have an account?',
    },
  },
};

export default auth;