const buffer = require("buffer");
const { default: axios } = require("axios");
const { getConfig, SERVICE_BROKER } = require("./configService");

const sendSMS = async (message, cellphone, sender) => {
  const serviceBroker = await getConfig(SERVICE_BROKER);

  try {

    const hexMessage = messageToHex(message);

    const response = await axios.get(serviceBroker.url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${serviceBroker.user}:${serviceBroker.password}`
        ).toString("base64")}`,
      },
      params: {
        sender,
        message: hexMessage,
        receiver: cellphone,
      },
    });

    return response.data;
  } catch (error) {
    // Segun la documentacion el service broker responde los errores retornando 500 y un codigo de error en el body.
    if (error?.response?.status == 500) {
      throw new SmsError(
        `Error response sending sms to: ${cellphone}`,
        error.response.data
      );
    }
  }
};

class SmsError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "SmsError";
    this.data = data;
  }
}

const messageToHex = (message) => {
  const hex = buffer
    .transcode(Buffer.from(message), "utf8", "latin1")
    .toString("hex");
  return hex;
};

module.exports = {
  sendSMS,
  SmsError,
};
