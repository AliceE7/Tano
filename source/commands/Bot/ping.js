const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "ping",
    aliases: [],
    category: "BOT",
  },

  info: {
    description: `Check the bot's response time.`,
    usage: `ping`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setColor(client.embed.colors.grey)
      .setDescription(`**Ping:** \`${client.ws.ping}ms\``)
      .setFooter({ text: client.embed.texts.footer.replace("R", " ") });

    message.channel.send({ embeds: [embed] });
  },
};
