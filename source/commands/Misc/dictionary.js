const { EmbedBuilder, codeBlock } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: {
    name: "dictionary",
    aliases: ["dict"],
    category: "MISC",
  },

  info: {
    description: `Look up the definition of a word in the dictionary.`,
    usage: `dictionary [word]`,
    examples: [`dictionary cat`],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      if (args[0]) {
        let word = args[0];
        const res = await axios({
          url: `${process.env.NINJA_API}/dictionary?word=${word}`,
          headers: { "X-Api-Key": process.env.NINJA_API_KEY },
        });

        if (res.data.valid) {
          const definition = res.data.definition;
          const word = res.data.word;
          const embed = new EmbedBuilder();

          if (definition.length > 4095) {
            embed
              .setDescription(
                `The definition is too long! you can go here to view the definition: https://cookiez.ml/dict?word=${word}`
              )
              .setColor("Red");
            message.channel.send({ embeds: [embed] });
          } else {
            embed
              .setDescription(`# ${word}\n- ${definition}`)
              .setColor("Green");
            message.channel.send({ embeds: [embed] });
          }
        } else {
          message.channel.send(codeBlock(`Error: valid: false; invalid word`));
        }
      } else {
        message.channel.send(codeBlock(`Error: expected 1 arguments got 0`));
      }
    } catch (e) {
      message.channel.send(codeBlock(e));
    }
  },
};
