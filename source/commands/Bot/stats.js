const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "statistics",
    aliases: ["stats", "bot-stats"],
    category: "BOT",
  },

  info: {
    description: `Shows various statistics about the bot, including server count, and system info.`,
    usage: ``,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    const embed = new EmbedBuilder();
    const cpu = await client.system.cpu();
    const memory = await client.system.mem();
    const guilds = client.guilds.cache.size;

    embed
      .addFields(
        {
          name: "🤖",
          value: `\n**Name:** \`\`\`${client.user.username} - ${client.user.id}\`\`\`\n**Servers:** \`\`\`${guilds}\`\`\` `,
        },
        {
          name: "📂",
          value: `\n**Cores:** \`\`\`${cpu.cores}\`\`\`\n**Speed:** \`\`\`${cpu.speed}\`\`\`\n**Storage:** \`\`\`${memory.ram}\`\`\`\n**Version:** \`\`\`${process.version}\`\`\`  `,
        }
      )
      .setFooter({ text: client.embed.texts.footer.replace("R", " ") })
      .setColor(client.embed.colors.grey)
      .setAuthor({
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      });

    message.channel.send({ embeds: [embed] });
  },
};
