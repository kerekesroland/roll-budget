import * as yup from "yup";

/**
 @returns {object} {registerSchema} - the schema object for the registration form validation
 @returns {object} : {LoginSchema} - the schema object for the login form validation
 */
export const useAuthSchemas = () => {
  const errors = {
    userNameRequiredError: "Username is required",
    userNameMinLengthError: "Username must be at least 6 characters long",
    userEmailRequiredError: "Email is required",
    userEmailFormatError: "Not a valid email",
    passwordRequiredError: "Password is required",
    confirmPasswordRequiredError: "Confirm Password is required",
    passwordMismatchError: "Passwords do not match",
    passwordMinLengthError: "Password must be at least 6 characters long",
    passwordUpperCaseError: "Password must have an upper case character",
    passwordLowerCaseError: "Password must have an lower case character",
    passwordSpecialCharacterError: "Password must have a special character",
    passwordNumberRequiredError: "Password must have a number included",
    propertyTypeRequiredError: "You must select a property type",
    countryRequiredError: "You must select a country",
    propertyImageRequiredError: "You must upload an image for your property",
    propertyTitleRequiredError: "You must have a title for your property",
    propertyDescriptionRequiredError:
      "You must have a description for your property",
    propertyPriceRequiredError: "You must have a price for your property",
  };

  const registerSchema = yup.object({
    password: yup
      .string()
      .required(errors.passwordRequiredError)
      .min(6, errors.passwordMinLengthError)
      .test("UpperCaseError", errors.passwordUpperCaseError, function (value) {
        const regex = /[A-Z]/;
        if (value?.match(regex)) {
          return true;
        }
        const { path, createError } = this;

        return createError({
          path,
          message: errors.passwordUpperCaseError,
        });
      })
      .test("LowerCaseError", errors.passwordLowerCaseError, function (value) {
        const regex = /[a-z]/;
        if (value?.match(regex)) {
          return true;
        }
        const { path, createError } = this;

        return createError({
          path,
          message: errors.passwordLowerCaseError,
        });
      })
      .test(
        "SpecialCharacter",
        errors.passwordSpecialCharacterError,
        function (value) {
          const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
          if (value?.match(regex)) {
            return true;
          }
          const { path, createError } = this;

          return createError({
            path,
            message: errors.passwordSpecialCharacterError,
          });
        }
      )
      .test(
        "IncludeNumber",
        errors.passwordNumberRequiredError,
        function (value) {
          const regex = /\d/;
          if (value?.match(regex)) {
            return true;
          }
          const { path, createError } = this;

          return createError({
            path,
            message: errors.passwordNumberRequiredError,
          });
        }
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), "null"], errors.passwordMismatchError)
      .required(errors.confirmPasswordRequiredError),
  });

  const loginSchema = yup.object({
    email: yup
      .string()
      .email(errors.userEmailFormatError)
      .required(errors.userEmailRequiredError),
    password: yup.string().required(errors.passwordRequiredError),
  });

  return {
    registerSchema,
    loginSchema,
  };
};
