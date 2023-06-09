const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  id: String,
  userId: String,
  messages_sent: { type: Number, default: "0" },
});

module.exports = new mongoose.model("member", memberSchema);
