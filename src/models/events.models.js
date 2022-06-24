const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

// define the database model for events
const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    timeZone: {
      type: String,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

/**
 * Check if title is taken
 * @param {string} title - The event's title
 * @param {ObjectId} [excludeEventId] - The id of the event to be excluded
 * @returns {Promise<boolean>}
 */
eventSchema.statics.isTitleTaken = async function (title, excludeEventId) {
  const event = await this.findOne({ title, _id: { $ne: excludeEventId } });
  return !!event;
};

/**
 * @typedef Event
 */
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
