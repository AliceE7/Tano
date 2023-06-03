const fs = require("fs");

module.exports = async (client) => {
  client.handleEvents = async () => {
    fs.readdirSync("./source/events/").forEach((dir) => {
      const data = fs
        .readdirSync(`./source/events/${dir}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of data) {
        const name = file.split(".")[0];
        const pull = require(`../../source/events/${dir}/${file}`);
        try {
          client.on(name, pull.bind(null, client));
          delete require.cache[
            require.resolve("../../source/events/" + dir + "/" + file)
          ];
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
};
