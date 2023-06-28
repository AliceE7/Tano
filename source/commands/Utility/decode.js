const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "decode",
    aliases: [],
    category: "UTILS",
  },

  info: {
    description: `decode an encrypted message`,
    usage: `decode [message]`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      const encodedStringBtoA = args.slice(0).join(" ");

      if (!encodedStringBtoA) {
        const m = message.channel.send(
          ` \`\`\`ArgumentError: Atleast 1 argument is required to excute this command.\`\`\`\ `
        );
        return;
      }

      const decodedStringAtoB = atob(encodedStringBtoA);

      message.channel.send(decodedStringAtoB);
    } catch (e) {
      message.channel.send(` \`\`\`${e}\`\`\`\ `);
    }
  },
};
