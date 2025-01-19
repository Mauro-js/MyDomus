const { query } = require("express-validator");
/**
 * Validaciones usadas en comun por las rutas de admin
 */
module.exports = {
  pagination: [
    query(["limit", "offset"]).optional().isInt({ min: 0, max: 1000 }).toInt(),
  ],
};