const { EmbedBuilder } = require("discord.js");
const { time, TimestampStyles } = require("@discordjs/formatters");

module.exports = {
  data: {
    name: "uptime",
    aliases: [],
    category: "BOT",
  },

  info: {
    description: `Return's the bots uptime`,
    usage: `uptime`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
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
