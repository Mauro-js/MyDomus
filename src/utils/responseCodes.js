const CODE_2001 = "code_2001";
const CODE_2002 = "code_2002";
const CODE_4001 = "code_4001";
const CODE_4002 = "code_4002";
const CODE_4003 = "code_4003";
const CODE_4004 = "code_4004";
const CODE_5001 = "code_5001";
const CODE_5002 = "code_5002";

const responseCodes = {
  [CODE_2001]: {
    code: 2001,
    message: "The OTP was sent",
  },
  [CODE_2002]: {
    code: 2002,
    message: "The OTP was verified.",
  },
  [CODE_4001]: {
    code: 4001,
    message: "The service is blocked",
  },
  [CODE_4002]: {
    code: 4002,
    message: "OTP not sent.",
  },
  [CODE_4003]: {
    code: 4003,
    message: "The verification attempt went wrong.",
  },
  [CODE_4004]: {
    code: 4004,
    message: "The token is expired or malformed.",
  },
  [CODE_5001]: {
    code: 5001,
    message: "Error sending the OTP.",
  },
  [CODE_5002]: {
    code: 5002,
    message: "Error validating the OTP.",
  },
};

const getResponse = (code) => {
  return responseCodes[code];
};

module.exports = {
  getResponse,
  CODE_2001,
  CODE_2002,
  CODE_4001,
  CODE_4002,
  CODE_4003,
  CODE_4004,
  CODE_5002,
};
