const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "koala",
    aliases: [],
    category: "IMAGES",
  },

  info: {
    description: `Generates a random image of a koala`,
    usage: ``,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message) => {
    const res = await axios({
      method: "get",
      url: "https://some-random-api.com/animal/koala",
    });

    const embed = new EmbedBuilder()
      .setDescription(`${res.data.fact}`)
      .setImage(res.data.image)
      .setColor(client.embed.colors.green)
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL(),
      });

    message.channel.send({ embeds: [embed] });
  },
};
