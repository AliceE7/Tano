const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "advice",
    aliases: [],
    category: "MISC",
  },

  info: {
    description: `Provides advice from a specified category.`,
    usage: `advice []`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      const res = await axios({
        method: "get",
        url: "https://api.adviceslip.com/advice",
      });

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(res.data.slip.advice)
        .setFooter({ text: `ID: ${res.data.slip.id}` });

      message.channel.send({ embeds: [embed] });
    } catch (e) {
      message.channel.send(` \`\`\`${e}\`\`\` `);
    }
  },
};
