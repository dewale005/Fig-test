const httpStatus = require("http-status");
const pick = require("../util/pick");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");
const { eventService } = require("../services");

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["title", "isVirtual", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await eventService.queryEvents(filter, options);
  res.send(result);
});

const getEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  res.send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  const user = await eventService.updateEventById(req.params.eventId, req.body);
  res.send(user);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
