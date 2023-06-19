const cooldown = new Set();
const clientDB = require("../../database/collection/client.js");
const guildDB = require("../../database/collection/guild.js");
const memberDB = require("../../database/collection/member.js");
const ms = require("ms");
const {
  PermissionsBitField: { Flags },
  EmbedBuilder,
} = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.guild) {
    if (
      !message.guild.members.me.permissions.has(
        Flags.ViewChannel,
        Flags.SendMessages
      )
    ) {
      return;
    }
  }

  /* let memberData = await memberDB.findOne({ id: message.user.id })
  if (!memberData) nemberData = await new memberDB({ id: message.user.id }); 
  memberData.$inc(`messages_sent`, 1)
  memberData.save()*/

  let data = await guildDB.findOne({ id: message.guild.id });
  if (!data) data = await new guildDB({ id: message.guild.id }).save();
  const prefix = data.prefix;

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  if (command.SETTINGS.commandBroken) {
    const embed = new EmbedBuilder()
      .setColor("#f0fa37")
      .setDescription(
        `🐞 Looks like there is an error with this command, this has been reported to developers! 🍌`
      );
    message.channel.send({ embeds: [embed] });
    return;
  }

  if (command.SETTINGS.ownerOnly) {
    if (!message.author.id === "940282986853728338") return;
  }

  command.run(client, message, args).then(async () => {
    await clientDB.findOneAndUpdate(
      { id: client.user.id },
      { $inc: { commandsUsed: 1 } },
      { upsert: true }
    );
  });
};
