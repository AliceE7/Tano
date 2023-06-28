const fs = require("fs");

module.exports = async (client) => {
  client.handleCommands = async () => {
    try {
      fs.readdirSync("./source/commands/").forEach((dir) => {
        const data = fs
          .readdirSync(`./source/commands/${dir}/`)
          .filter((file) => file.endsWith(".js"));
        for (const file of data) {
          const pull = require(`../../source/commands/${dir}/${file}`);
          if (pull.data.name) {
            client.commands.set(pull.data.name, pull);
          } else {
            console.warn(`Error: -> file <pull.name> missing name`);
            continue;
          }
          if (pull.data.aliases && Array.isArray(pull.data.aliases)) {
            pull.data.aliases.forEach((a) =>
              client.aliases.set(a, pull.data.name)
            );
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};
