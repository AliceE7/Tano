const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  DATA: {
    name: "affirmation",
    aliases: [],
    category: "MISC",
  },

  INFO: {
    description: `Provides a positive affirmation from a specified category, such as self-confidence, motivation, or gratitude.`,
    usage: `affirmation []`,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message, args) => {
    try {
      const res = await axios("https://www.affirmations.dev");

      message.channel.send(res.data.affirmation);
    } catch (e) {
      message.channel.send(` \`\`\`${e}\`\`\` `);
    }
  },
};
