const { body } = require("express-validator");

const sendValidations = [
  body("user").if(body('typeToken').not().equals('tuID')).isJWT().withMessage("The jwt must be a valid."),
  body("token").if(body('typeToken').equals('tuID')).notEmpty().withMessage("The token is mandatory"),
  body("mobileNumber")
    .isMobilePhone("any", { strictMode: true })
    .withMessage("The mobile number is invalid"),
  body("otpConfig")
    .optional()
    .isInt()
    .toInt()
    .custom(async (value, { req }) => {
      if (!value) return true;

      const foundConfigOtp = await req.system.otpConfigs.find(
        (element) => element.dataValues.id === value
      );

      if (!foundConfigOtp) {
        throw new Error(
          "OTP configuration does not exist or is not related to the system"
        );
      }

      return true;
    }),
];

const verifyValidations = [
  body("user").if(body('typeToken').not().equals('tuID')).isJWT().withMessage("The jwt must be a valid."),
  body("token").if(body('typeToken').equals('tuID')).notEmpty().withMessage("The token is mandatory"),
  body("mobileNumber")
    .isMobilePhone("any", { strictMode: true })
    .withMessage("The mobile number is invalid"),
  body("otp")
    .notEmpty()
    .isInt({ min: 100000, max: 999999 })
    .withMessage("The otp is invalid"),
];

module.exports = {
  sendValidations,
  verifyValidations,
};
