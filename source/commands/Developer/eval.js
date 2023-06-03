const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "eval",
    aliases: [],
    category: "DEV",
  },

  INFO: {
    description: ``,
    usage: ``,
    examples: [``],
  },

  SETTINGS: {
    ownerOnly: true,
    commandBroken: false,
  },
  run: async (client, message, args) => {
    const arg = args.slice(0).join(" ");
    if (!arg) return;

    try {
      if (arg === "client") return;

      const evaled = eval(arg);
      const cleaned = await clean(evaled);

      message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
    } catch (err) {
      console.log(err);
      message.channel
        .send(`\`\`\`xl\n${err}\`\`\``)
        .catch(message.channel.send);
    }
  },
};

const clean = async (text) => {
  if (text && text.constructor.name == "Promise") text = await text;

  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));

  return text;
};
