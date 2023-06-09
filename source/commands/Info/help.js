const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
module.exports = {
  data: {
    name: "help",
    aliases: [],
    category: "INFO",
  },

  info: {
    description: `Displays a list of available commands or detailed information for a specific command.`,
    usage: `help [command]`,
    examples: [`help`, "help ping"],
  },

  access: {
    developersOnly: false,
    public: true,
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
  const commands = client.commands.map((cmd) => `${cmd.data.name}`).join(", ");

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("info")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("ℹ️")
        .setLabel("Information")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("utility")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🛠️")
        .setLabel("Utility")
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("image")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("📷")
        .setLabel("Image")
    );

  const embed = new EmbedBuilder()
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle(`${client.user.username} Commands list`)
    .addFields(
      {
        name: "ℹ️ ✦ Information",
        value: `\`Click The Information Button\``,
      },
      {
        name: "🛠 ✦ Utility",
        value: `\`Click The Utility Button\``,
      },
      {
        name: "📷 ✦ Images",
        value: `\`Click The Images Button\``,
      }
    )
    .setColor(client.embed.colors.green);

  const msg = await message.channel.send({
    embeds: [embed],
    components: [buttons],
  });

  const collector = message.channel.createMessageComponentCollector();

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
    .filter((cmd) => cmd.data.category === i)
    .map((cmd) => `${cmd.data.name}`)
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
    if (command.data.name) {
      embed.addFields({ name: "Name:", value: command.data.name });
      if (command.data.aliases) {
        const s = command.data.aliases.map((m) => m).join(", ");
        embed.addFields({ name: "Aliases:", value: s || "N/A" });
        if (command.info.description) {
          embed.addFields({
            name: "Description:",
            value: command.info.description || "N/A",
          });
          if (command.info.usage) {
            embed.addFields({
              name: "Usage:",
              value: command.info.usage || "N/A",
            });

            embed.setColor("Red");
            message.channel.send({ embeds: [embed] });
          }
        }
      }
    }
  }
}
