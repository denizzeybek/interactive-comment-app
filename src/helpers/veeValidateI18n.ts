import { setLocale } from 'yup'

export const initVeeValidateI18n = () => {
  setLocale({
    mixed: {
      default: () => 'default error',
      required: ({ label }) => label + ' field is a required',
      oneOf: ({ path, values }) => ({
        key: 'oneOf error',
        values: { path, values }
      })
    },
    string: {
      email: () => 'Invalid email',
      min: ({ min, label }) => label + ' must be at least ' + min + ' characters',
      matches: ({ path }) => 'Invalid ' + path
    }
  })
}
