const httpStatus = require("http-status");
const { Event } = require("../models");
const ApiError = require("../util/ApiError");

/**
 * Create an event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */

const createEvent = async (eventBody) => {
  if (!eventBody.thumbnail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image is required");
  }
  if (await Event.isTitleTaken(eventBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Title already taken");
  }
  return Event.create(eventBody);
};

/**
 * Query for events
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEvents = async (filter, options) => {
  const events = await Event.paginate(filter, options);
  return events;
};

/**
 * Get events by id
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * Get event by title
 * @param {string} title
 * @returns {Promise<Event>}
 */
const getEventByTitle = async (title) => {
  return Event.findOne({ title });
};

/**
 * Update event by id
 * @param {ObjectId} eventId
 * @param {Object} updateBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (eventId, updateBody) => {
  const eventData = await getEventById(eventId);
  if (!eventData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  if (
    updateBody.title &&
    (await Event.isTitleTaken(updateBody.title, eventId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(eventData, updateBody);
  await eventData.save();
  return eventData;
};

/**
 * Delete event by id
 * @param {ObjectId} event
 * @returns {Promise<Event>}
 */
const deleteEventById = async (event) => {
  const eventData = await getEventById(event);
  if (!eventData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await eventData.remove();
  return eventData;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  getEventByTitle,
  updateEventById,
  deleteEventById,
};
