import { body, validationResult } from "express-validator";
import { isCnicTaken, isEmailTaken, isPhoneTaken, isUserExist } from "../helper/helper.js";

export const createUserValidator = [
  body("full_name").notEmpty().withMessage("Full name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (email) => {
      if (await isEmailTaken(email)) {
        throw new Error(`Email is already taken`);
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation does not match password"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Phone number is not valid")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone Number must be 11 characters long")
    .custom(async (phone) => {
      if (await isPhoneTaken(phone)) {
        throw new Error(`Phone is already taken`);
      }
      return true;
    }),

  body("cnic")
    .notEmpty()
    .withMessage("CNIC is required")
    .bail()
    .isLength({ min: 13, max: 13 })
    .withMessage("CNIC must be 13 characters long")
    .custom(async (cnic) => {
      if (await isCnicTaken(cnic)) {
        throw new Error(`Cnic is already taken`);
      }
      return true;
    }),

  body("profile_pic")
    .notEmpty()
    .withMessage("Profile picture is required")
    .bail()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];


export const loginUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isEmail()
    .withMessage("Email is not valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
]


export const changePasswordValidator = [
  body("old_password")
    .notEmpty()
    .withMessage("Old Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Old Password must be at least 6 characters long"),

  body("new_password")
    .notEmpty()
    .withMessage("New Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("New Password must be at least 6 characters long"),

  body("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .bail()
    .custom((value, { req }) => value === req.body.new_password)
    .withMessage("Password confirmation does not match password"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
]


export const forgetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isEmail()
    .withMessage("Email is not valid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
]


export const forgetPasswordVerificationValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isEmail()
    .withMessage("Email is not valid"),

  body("otp")
    .notEmpty()
    .withMessage("Otp is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isNumeric()
    .withMessage("Otp must be number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
]




export const forgetChangePasswordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation does not match password"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];


export const updateUserValidator = [
  body("full_name").notEmpty().withMessage("Full name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail() // Stop running validations if any of the previous ones have failed.
    .isEmail()
    .withMessage("Email is not valid"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Phone number is not valid")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone Number must be 11 characters long"),

  body("cnic")
    .notEmpty()
    .withMessage("CNIC is required")
    .bail()
    .isLength({ min: 13, max: 13 })
    .withMessage("CNIC must be 13 characters long"),

  body("profile_pic")
    .notEmpty()
    .withMessage("Profile picture is required")
    .bail()
    .isURL()
    .withMessage("Profile picture must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];