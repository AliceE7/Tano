const { EmbedBuilder } = require("discord.js");
const { codeBlock } = require("@discordjs/formatters");
module.exports = {
  data: {
    name: "eval",
    aliases: [],
    category: "DEV",
  },

  info: {
    description: ``,
    usage: ``,
    examples: [``],
  },

  access: {
    developersOnly: true,
    public: false,
  },
  run: async (client, message, args) => {
    try {
      const arg = args.slice(0).join(" ");
      if (!arg) return;
      if (args[0] === "client") return;

      const evaled = eval(arg);
      const raw = evaled;
      const cleaned = await clean(evaled);

      const embed = new EmbedBuilder()
        .setDescription(codeBlock("js", cleaned))
        .setColor(client.embed.colors.green);

      const rawEmbed = new EmbedBuilder()
        .setDescription(codeBlock("js", raw))
        .setColor(client.embed.colors.green);

      message.channel.send({ embeds: [embed] }).catch(console.error);
      message.channel.send({ embeds: [rawEmbed] }).catch(console.error);
    } catch (e) {
      console.log(e);
      message.channel.send(codeBlock("json", e));
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
