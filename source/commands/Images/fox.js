const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  DATA: {
    name: "fox",
    aliases: [],
    category: "IMAGES",
  },

  INFO: {
    description: `Generates a random image of a fox`,
    usage: ``,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message) => {
    const res = await axios({
      method: "get",
      url: "https://some-random-api.com/animal/fox",
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
