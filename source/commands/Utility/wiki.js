const { EmbedBuilder } = require("discord.js");
const fetch = require("fetch");

module.exports = {
  data: {
    name: "wiki",
    aliases: [],
    category: "UTILS",
  },

  info: {
    description: `Fetch a page from wikipedia.org and get info from discord!`,
    usage: `wiki <args[1]>`,
    examples: [`wiki discord`, "wiki cats"],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {},
};
