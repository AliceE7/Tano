const { AttachmentBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "wasted",
    aliases: [],
    category: "IMAGES",
  },

  info: {
    description: ``,
    usage: `wasted <user>`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    if (!args[0]) return;
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    const member = message.guild.members.cache.get(user.id);

    if (!member) return;

    const res = await axios({
      method: "get",
      url: `https://some-random-api.com/canvas/overlay/wasted?avatar=${member.user.displayAvatarURL(
        { extension: "png" }
      )}`,
      responseType: "stream",
    });

    const image = new AttachmentBuilder(res.data, { name: "wasted_SRA.png" });

    message.channel.send({ files: [image] });
  },
};
