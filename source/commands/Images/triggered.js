const { AttachmentBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "triggered",
    aliases: [],
    category: "IMAGES",
  },

  info: {
    description: ``,
    usage: `triggered <user> `,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!user) return;

    const member = message.guild.members.cache.get(user.id);

    if (!member) return;

    const res = await axios({
      method: "get",
      url: `https://some-random-api.com/canvas/overlay/triggered?avatar=${member.user.displayAvatarURL(
        { extension: "png" }
      )}`,
      responseType: "stream",
    });

    const image = new AttachmentBuilder(res.data, { name: "triggerd_SRA.png" });

    message.channel.send({ files: [image] });
  },
};
