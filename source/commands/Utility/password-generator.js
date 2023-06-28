const { EmbedBuilder, codeBlock } = require("discord.js");
const axios = require('axios');

module.exports = {
  data: {
    name: "password-generator",
    aliases: ["password-gen", "pwg"],
    category: "UTILS",
  },

  info: {
    description: ``,
    usage: `password-generator [length]`,
    examples: [`password-generator`, "password-generator 16"],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      let length = "16";
      if (args[0]) length = args[0];

      const res = await axios({
        url: `${process.env.NINJA_API}/passwordgenerator?length=${length}`,
        headers: { 'X-Api-Key': process.env.NINJA_API_KEY }
      });

      const toCode = codeBlock(res.data.random_password)
      message.author.send({ content: `Generated Password: ${toCode}` }).catch((e) => {
        message.channel.send("You have dms disabled! do you want me to send your password here 😅")
      })
    } catch (e) {
      console.log(e)
      message.channel.send(codeBlock(e))
    }
  },
};
