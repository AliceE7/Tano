const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "",
    aliases: [],
    category: "",
  },

  info: {
    description: ``,
    usage: ``,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {},
};
