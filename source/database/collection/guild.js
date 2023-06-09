const mongoose = require("mongoose");

const guilddata = new mongoose.Schema({
  id: String,
  prefix: { type: String, default: "t!" },
});

module.exports = new mongoose.model("guild", guilddata);
