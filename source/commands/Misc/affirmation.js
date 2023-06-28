const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "affirmation",
    aliases: [],
    category: "MISC",
  },

  info: {
    description: `Provides a positive affirmation from a specified category, such as self-confidence, motivation, or gratitude.`,
    usage: `affirmation []`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
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
