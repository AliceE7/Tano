const mongoose = require("mongoose");

const clientData = new mongoose.Schema({
  id: String,
  commandsUsed: { type: Number, default: "0" },
  
});

module.exports = new mongoose.model("client", clientData);
