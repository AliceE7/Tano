const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
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
      all_commands(client, message);
    } else if (args[0]) {
      one_command(client, message, args);
    }
  },
};

async function all_commands(client, message) {
  const commands = client.commands.map((cmd) => `${cmd.DATA.name}`).join(", ");

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("info")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1115613724082962565")
        .setLabel("Information")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("utility")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1115615101991522374")
        .setLabel("Utility")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("image")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1115615797662986301")
        .setLabel("Image")
    );

  const embed = new EmbedBuilder()
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle(`${client.user.username} Commands list`)
    .addFields(
      {
        name: "<:Discord_info_white_theme:1115613724082962565> ✦ Information",
        value: `\`Click The Information Button\``,
      },
      {
        name: "<:Discord_Settings:1115615101991522374> ✦ Utility",
        value: `\`Click The Utility Button\``,
      },
      {
        name: "<:camera:1115615797662986301> ✦ Images",
        value: `\`Click The Images Button\``,
      }
    )
    .setColor(client.embed.colors.green);

  const msg = await message.channel.send({
    embeds: [embed],
    components: [buttons],
  });

  const collector = message.channel.createMessageComponentCollector({
    time: 120000,
  });

  collector.on("collect", async (i) => {
    await i.deferUpdate();
    if (i.customId === "info") {
      const info = cmds(client, "INFO");
      await msg.edit({
        embeds: [info],
        components: [buttons],
      });
    } else if (i.customId === "utility") {
      const utils = cmds(client, "UTILS");
      await msg.edit({
        embeds: [utils],
        components: [buttons],
      });
    } else if (i.customId === "image") {
      const img = cmds(client, "IMAGES");
      await msg.edit({
        embeds: [img],
        components: [buttons],
      });
    }
  });

  collector.on("end", (collected) => {
    return;
  });
}

function cmds(client, i) {
  const cmds = client.commands
    .filter((cmd) => cmd.DATA.category === i)
    .map((cmd) => `${cmd.DATA.name}`)
    .join(", ");
  const embed = new EmbedBuilder()
    .setDescription(cmds)
    .setColor(client.embed.colors.green);
  return embed;
}

function one_command(client, message, args) {
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
