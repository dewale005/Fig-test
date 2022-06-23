const express = require("express");
const validate = require("../middlewares/validate");
const { eventController } = require("../controller.js");
const { eventValidation } = require("../validations");

const router = express.Router();

router
  .route("/")
  .post(validate(eventValidation.createEvent), eventController.createEvent)
  .get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route("/:eventId")
  .get(validate(eventValidation.getEvent), eventController.getEvent)
  .put(validate(eventValidation.updateEvent), eventController.updateEvent)
  .patch(validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
