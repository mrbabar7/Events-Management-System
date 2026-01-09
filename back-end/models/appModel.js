const moongoose = require("mongoose");
const appSchema = new moongoose.Schema({
  eventId: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "EventModel",
    required: true,
  },
  userId: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "AuthModel",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },
});
module.exports = moongoose.model("AppModel", appSchema);
