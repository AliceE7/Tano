const { EmbedBuilder } = require("discord.js");
const data = require("../../database/collection/client.js");

module.exports = {
  DATA: {
    name: "info",
    aliases: ["bot-info"],
    category: "BOT",
  },

  INFO: {
    description: ``,
    usage: ``,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message, args) => {
    const clientData = await data.findOne({ id: client.user.id });
    const embed = new EmbedBuilder()
      .setColor(client.embed.colors.grey)
      .addFields(
        {
          name: `➜ ${client.user.tag}`,
          value: `${client.user.id}`,
        },
        {
          name: "➜ Servers",
          value: `${client.guilds.cache.size}`,
        },
        {
          name: "➜ Total Users",
          value: `${client.users.cache.size}`,
        },
        {
          name: "➜ Created",
          value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`,
        },
        {
          name: "➜ Commands Used",
          value: `${clientData.commandsUsed}`,
        },
        {
          name: "➜ Node Version",
          value: `${process.version}`,
        },
        {
          name: "Uptime:",
          value: `<t:${Math.floor(
            Date.now() / 1000 - client.uptime / 1000
          )}:R>`,
        }
      )
      .setFooter({
        text: client.embed.texts.footer.replace("R", `| ${message.author.id}`),
      });
    message.channel.send({ embeds: [embed] });
  },
};
