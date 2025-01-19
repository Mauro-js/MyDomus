const { Op } = require("sequelize");

const getWhereOperation = (key, val) => {
  if (!val) return null;

  if (key == "id") return { [key]: { [Op.eq]: val } };

  if (key.includes("createdAt") || key.includes("updatedAt")) {
    if (key.includes("From"))
      return { [key.replace("From", "")]: { [Op.gt]: val } };
    if (key.includes("To"))
      return { [key.replace("To", "")]: { [Op.lt]: val } };
  }

  return { [key]: { [Op.like]: `%${val}%` } };
};

module.exports = getWhereOperation;
