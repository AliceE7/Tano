const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "avatar",
    aliases: ["av", "pfp"],
    category: "UTILS",
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
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!user) user = message.author;

    const member = message.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.displayAvatarURL(),
      })
      .setImage(
        `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=512`
      )
      .setColor("Blue");

    message.channel.send({ embeds: [embed] });
  },
};
