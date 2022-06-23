const Joi = require("joi");

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

// validating the body of the events
const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    category: Joi.string().required(),
    isVirtual: Joi.boolean().default(false),
    date: Joi.date().required(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      address: Joi.string(),
      category: Joi.string(),
      isVirtual: Joi.boolean(),
      date: Joi.date(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
