const { SmsOtp } = require("../models");
const { getConfig, SMS_OTP } = require("./configService");

const verifyOTP = async (attempt, mobileNumber, systemId) => {
  const { maxVerificationAttempts } = await getConfig(SMS_OTP);
  const otp = await SmsOtp.findOne({
    where: {
      mobileNumber,
      systemId,
    },
  });


  if (!otp) {
    return false;
  }

  if (otp.otp === attempt) {
    await otp.destroy();
    return true;
  }

  if (otp.attempts + 1 > maxVerificationAttempts) {
    await otp.destroy();
    return false;
  } else {
    await otp.increment("attempts", { by: 1 });
    return false;
  }
};

module.exports = {
  verifyOTP,
};
