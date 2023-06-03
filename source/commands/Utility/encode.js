const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "encode",
    aliases: [""],
    category: "UTILS",
  },

  INFO: {
    description: `Encodes a message using a specified key.`,
    usage: ``,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
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
