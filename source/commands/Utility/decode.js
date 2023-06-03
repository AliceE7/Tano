const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "decode",
    aliases: [],
    category: "UTILS",
  },

  INFO: {
    description: `decode an encrypted message`,
    usage: `decode [message]`,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
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
