const { EmbedBuilder } = require("discord.js");
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
    const embed = new EmbedBuilder()
      .setDescription(
        `**Uptime:** <t:${Math.floor(
          Date.now() / 1000 - client.uptime / 1000
        )}:R>`
      )
      .setFooter({ text: client.embed.texts.footer.replace("R", " ") })
      .setColor(client.embed.colors.grey);

    message.channel.send({ embeds: [embed] });
  },
};
