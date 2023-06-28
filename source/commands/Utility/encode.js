const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: "encode",
    aliases: [""],
    category: "UTILS",
  },

  info: {
    description: `Encodes a message using a specified key.`,
    usage: `encode <arg[all]>`,
    examples: [``],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      const decodedStringBtoA = args.slice(0).join(" ");

      if (!decodedStringBtoA) {
        const m = message.channel.send(
          ` \`\`\`ArgumentError: Atleast 1 argument is required to excute this command.\`\`\`\ `
        );
        return;
      }

      const encodedStringBtoA = btoa(decodedStringBtoA);

      message.channel.send(encodedStringBtoA);
    } catch (e) {
      message.channel.send(` \`\`\`${e}\`\`\`\ `);
    }
  },
};
