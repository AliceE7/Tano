const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "red-panda",
    aliases: ["redpanda", "red_panda"],
    category: "IMAGES",
  },

  info: {
    description: `Generates a random image of a cat`,
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
      url: "https://some-random-api.com/animal/red_panda",
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
