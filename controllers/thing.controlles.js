const { Thing } = require('../models');

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [newThing] = await Thing.create(body);
    if (newThing) {
      return res.status(201).send({ data: newThing });
    }
    return res.status(400).send(); //bad practice
  } catch (err) {
    next(err);
  }
};

module.exports.getAllThings = async (req, res, next) => {
  try {
    const arrayOfThings = await Thing.findAll();
    if (arrayOfThings.length) {
      return res.status(200).send({ data: arrayOfThings });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.getThingById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const [thing] = await Thing.findByPk(id);
    if (thing) {
      return res.status(200).send({ data: thing });
    }
    return res.status(404).send(); //bad practice
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const [thing] = await Thing.deleteByPk(id);
    if (thing) {
      return res.status(200).send({ data: thing });
    }
    return res.status(404).send(); //bad practice
  } catch (err) {
    next(err);
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const [thing] = await Thing.updateByPk(id, body);
    if (thing) {
      return res.status(202).send({ data: thing });
    }
    return res.status(400).send('get lost'); //bad practice
  } catch (err) {
    next(err);
  }
};
