const { Model, Op } = require("sequelize");
const getWhereOperation = require("./utils");

const Controller = (model = Model) => ({
  add: async (req, res, next) => {
    try {
      console.log(req.body);
      const obj = await model.create(req.body);
      res.json(obj);
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const obj = await model.findByPk(req.params.id);
      return obj != null ? res.json(obj) : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const { offset, limit } = req.query;

      let where = {};
      let include = [];
      if (req.query) {
        if (req.query.include) {
          include = req.query.include;
          delete req.query.include;
        }

        delete req.query.offset;
        delete req.query.limit;

        where = {
          [Op.and]: Object.keys(req.query).map((key) =>
            getWhereOperation(key, req.query[key])
          ),
        };
      }

      await model
        .findAndCountAll({ where, include, offset, limit })
        .then(({ rows, count }) => res.json({ count, data: rows }));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      await model.update(req.body, { where: { id: req.params.id } });
      const obj = await model.findOne({ where: { id: req.params.id } });
      return obj != null ? res.json(obj) : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const deleted = await model.destroy({ where: { id: req.params.id } });
      deleted > 0 ? res.status(200).end() : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },
});

module.exports = Controller;
