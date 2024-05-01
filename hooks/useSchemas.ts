import { CurrencyType } from "@prisma/client";
import { useTranslations } from "next-intl";
import * as yup from "yup";

/**
 @returns {object} {registerSchema} - the schema object for the registration form validation
 @returns {object} : {LoginSchema} - the schema object for the login form validation
 */
export const useSchemas = () => {
  const t = useTranslations("errors");
  const errors = {
    userNameRequiredError: t("userNameRequiredError"),
    userNameMinLengthError: t("userNameMinLengthError"),
    userEmailRequiredError: t("userEmailRequiredError"),
    userEmailFormatError: t("userEmailFormatError"),
    passwordRequiredError: t("passwordRequiredError"),
    confirmPasswordRequiredError: t("confirmPasswordRequiredError"),
    passwordMismatchError: t("passwordMismatchError"),
    passwordMinLengthError: t("passwordMinLengthError"),
    passwordUpperCaseError: t("passwordUpperCaseError"),
    passwordLowerCaseError: t("passwordLowerCaseError"),
    passwordSpecialCharacterError: t("passwordSpecialCharacterError"),
    passwordNumberRequiredError: t("passwordNumberRequiredError"),
    categoryNameRequiredError: t("categoryNameRequiredError"),
    categoryPriceRequiredError: t("categoryPriceRequiredError"),
    categoryIconRequiredError: t("categoryIconRequiredError"),
    budgetNameRequiredError: t("budgetNameRequiredError"),
    budgetPriceRequiredError: t("budgetPriceRequiredError"),
    budgetCategoryRequiredError: t("budgetCategoryRequiredError"),
    budgetDateRequiredError: t("budgetDateRequiredError"),
    budgetTypeRequiredError: t("budgetTypeRequiredError"),
    budgetCurrencyTypeRequiredError: t("budgetCurrencyTypeRequiredError"),
    requiredFieldError: t("requiredFieldError"),
    numberFieldError: t("numberFieldError"),
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
      .typeError(errors.numberFieldError)
      .required(errors.categoryPriceRequiredError),
    icon: yup.string().required(errors.categoryIconRequiredError),
    currencyType: yup
      .mixed()
      .oneOf(
        [CurrencyType.HUF, CurrencyType.USD],
        errors.budgetCurrencyTypeRequiredError
      )
      .required(errors.budgetCurrencyTypeRequiredError),
  });

  const budgetSchema = yup.object({
    name: yup.string().required(errors.budgetNameRequiredError),
    price: yup
      .number()
      .typeError(errors.numberFieldError)
      .required(errors.budgetPriceRequiredError),
    category: yup.string().required(errors.budgetCategoryRequiredError),
    date: yup.date().required(errors.budgetDateRequiredError),
    type: yup.string().required(errors.budgetTypeRequiredError),
    currencyType: yup
      .mixed()
      .oneOf(
        [CurrencyType.HUF, CurrencyType.USD],
        errors.budgetCurrencyTypeRequiredError
      )
      .required(errors.budgetCurrencyTypeRequiredError),
  });

  const reminderSchema = yup.object({
    title: yup.string().required(errors.requiredFieldError),
    date: yup.date().required(errors.requiredFieldError),
    priority: yup
      .number()
      .typeError(errors.numberFieldError)
      .required(errors.budgetPriceRequiredError),
    color: yup.string().required(errors.requiredFieldError),
  });

  const editBudgetSchema = yup.object({
    name: yup.string().required(errors.budgetNameRequiredError),
    price: yup
      .number()
      .typeError(errors.numberFieldError)
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
    currencyType: yup
      .mixed()
      .oneOf(
        [CurrencyType.HUF, CurrencyType.USD],
        errors.budgetCurrencyTypeRequiredError
      )
      .required(errors.budgetCurrencyTypeRequiredError),
  });

  return {
    registerSchema,
    loginSchema,
    categorySchema,
    budgetSchema,
    editBudgetSchema,
    reminderSchema,
  };
};
