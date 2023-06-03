const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "ping",
    aliases: [],
    category: "BOT",
  },

  INFO: {
    description: `Check the bot's response time.`,
    usage: `ping`,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setColor(client.embed.colors.grey)
      .setDescription(`**Ping:** \`${client.ws.ping}ms\``)
      .setFooter({ text: client.embed.texts.footer.replace("R", " ") });

    message.channel.send({ embeds: [embed] });
  },
};
