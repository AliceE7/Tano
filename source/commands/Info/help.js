const { EmbedBuilder } = require("discord.js");
module.exports = {
  DATA: {
    name: "help",
    aliases: [],
    category: "INFO",
  },

  INFO: {
    description: `Displays a list of available commands or detailed information for a specific command.`,
    usage: `help [command]`,
    examples: [`help`, "help ping"],
  },

  SETTINGS: {
    ownerOnly: false,
    commandBroken: false,
  },
  run: async (client, message, args) => {
    if (!args[0]) {
      info_all_commands(client, message);
    } else if (args[0]) {
      info_one_command(client, message, args);
    }
  },
};

function info_all_commands(client, message) {
  const commands = client.commands.map((cmd) => `${cmd.DATA.name}`).join(", ");

  const embed = new EmbedBuilder()
    .setDescription(`${commands}`)
    .setColor("Blurple");

  message.author
    .send({ embeds: [embed], content: `**Command used: help**` })
    .catch((e) => {
      message.channel.send(
        `Looks like you have DM's disabled, i can't send a command list here it might flood the chat!`
      );
    });
}

function info_one_command(client, message, args) {
  const command =
    client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0]);
  const embed = new EmbedBuilder();

  if (command) {
    if (command.DATA.name) {
      embed.addFields({ name: "Name:", value: command.DATA.name });
      if (command.DATA.aliases) {
        const s = command.DATA.aliases.map((m) => m).join(", ");
        embed.addFields({ name: "Aliases:", value: s || "N/A" });
        if (command.INFO.description) {
          embed.addFields({
            name: "Description:",
            value: command.INFO.description || "N/A",
          });
          if (command.INFO.usage) {
            embed.addFields({
              name: "Usage:",
              value: command.INFO.usage || "N/A",
            });

            embed.setColor("Red");
            message.channel.send({ embeds: [embed] });
          }
        }
      }
    }
  } else {
  }
}
