const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const axios = require("axios");
module.exports = {
  data: {
    name: "https-cat",
    aliases: ["httpscat", "hcc"],
    category: "IMAGES",
  },

  info: {
    description: ``,
    usage: ``,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      const code = args[0];
      if (!code) return;

      const r = await f(code);
      message.channel.send(r);
    } catch (e) {
      message.channel.send(` \`\`\`${e}\`\`\` `);
    }
  },
};

async function f(code) {
  const URL = "https://http.cat";
  const res = await axios({
    method: "get",
    url: `${URL}/${code}`,
    responseType: "stream",
  });

  const bytes = res.data;
  const image = new AttachmentBuilder(bytes, { name: "https_cat.png" });

  return { files: [image] };
}
