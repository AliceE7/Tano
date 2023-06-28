const { EmbedBuilder, codeBlock } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: {
    name: "baby-names",
    aliases: [""],
    category: "MISC",
  },

  info: {
    description: `This command retrieves a list of popular baby names from a database.`,
    usage: `baby-names [gender]`,
    examples: [`baby-names girl`, "baby-names boy"],
  },

  access: {
    developersOnly: false,
    public: true,
  },

  run: async (client, message, args) => {
    try {
      let gender = "neutral";
      if (args[0]) gender = args[0];
      console.log(gender);

      const res = await axios({
        url: `${process.env.NINJA_API}/babynames?gender=${gender}`,
        headers: { "X-Api-Key": process.env.NINJA_API_KEY },
      });

      message.channel.send(res.data.map((m) => m).join(", "));
    } catch (e) {
      message.channel.send(codeBlock(e));
    }
  },
};
