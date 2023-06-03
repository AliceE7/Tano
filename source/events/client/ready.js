const guild = require("../../database/collection/guild.js");

module.exports = async (client) => {
  console.log(
    client.colors.ok("[CLIENT] ->"),
    client.colors.afterOk(client.user.username)
  );

  require("../../../web/app.js")(client);
};
