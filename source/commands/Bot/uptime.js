const { EmbedBuilder } = require("discord.js");
const { time, TimestampStyles } = require("@discordjs/formatters");

module.exports = {
  DATA: {
    name: "uptime",
    aliases: [],
    category: "BOT",
  },

  INFO: {
    description: `Return's the bots uptime`,
    usage: `uptime`,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message) => {
    const timestamp = Math.floor(Date.now() / 1000 - client.uptime / 1000);

    const embed = new EmbedBuilder()
      .setDescription(
        `**Uptime:** ${time(timestamp, TimestampStyles.RelativeTime)}`
      )
      .setFooter({ text: client.embed.texts.footer.replace("R", " ") })
      .setColor(client.embed.colors.grey);

    message.channel.send({ embeds: [embed] });
  },
};
