import * as yup from "yup";

/**
 @returns {object} {registerSchema} - the schema object for the registration form validation
 @returns {object} : {LoginSchema} - the schema object for the login form validation
 */
export const useSchemas = () => {
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
    categoryNameRequiredError: "Category name is required",
    categoryPriceRequiredError: "Category price is required",
    categoryIconRequiredError: "Category icon is required",
    budgetNameRequiredError: "Budget Name is required",
    budgetPriceRequiredError: "Budget price is required",
    budgetCategoryRequiredError: "Budget must have a category",
    budgetDateRequiredError: "Budget must have a Date",
    budgetTypeRequiredError: "Budget must have a Type",
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

  const categorySchema = yup.object({
    name: yup.string().required(errors.categoryNameRequiredError),
    limit: yup
      .number()
      .typeError("You have to provide a number")
      .required(errors.categoryPriceRequiredError),
    icon: yup.string().required(errors.categoryIconRequiredError),
  });

  const budgetSchema = yup.object({
    name: yup.string().required(errors.budgetNameRequiredError),
    price: yup
      .number()
      .typeError("You have to provide a number")
      .required(errors.budgetPriceRequiredError),
    category: yup.string().required(errors.budgetCategoryRequiredError),
    date: yup.date().required(errors.budgetDateRequiredError),
    type: yup.string().required(errors.budgetTypeRequiredError),
  });

  const editBudgetSchema = yup.object({
    name: yup.string().required(errors.budgetNameRequiredError),
    price: yup
      .number()
      .typeError("You have to provide a number")
      .required(errors.budgetPriceRequiredError),
    category: yup.object({
      name: yup.string().required(),
      limit: yup.number().required(),
      icon: yup.string().required(),
      id: yup.string().required(),
      userId: yup.string().required(),
    }),
    date: yup.date().required(errors.budgetDateRequiredError),
    type: yup.string().required(errors.budgetTypeRequiredError),
  });

  return {
    registerSchema,
    loginSchema,
    categorySchema,
    budgetSchema,
    editBudgetSchema,
  };
};
