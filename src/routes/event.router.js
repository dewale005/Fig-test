const express = require("express");
const multer = require("multer");
const validate = require("../middlewares/validate");
const { eventController } = require("../controller");
const { eventValidation } = require("../validations");

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, "./upload/");
  },
  filename(req, file, next) {
    next(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, next) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    next(null, true);
  } else {
    next(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

router
  .route("/")
  .post(
    upload.single("thumbnail"),
    validate(eventValidation.createEvent),
    eventController.createEvent
  )
  .get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route("/:eventId")
  .get(validate(eventValidation.getEvent), eventController.getEvent)
  .put(validate(eventValidation.updateEvent), eventController.updateEvent)
  .patch(validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
