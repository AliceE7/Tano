const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  AllowedMentionsTypes
} = require("discord.js");
const mongoose = require("mongoose");
const ansi = require("ansi-colors");
const fs = require("node:fs");
const system = require("systeminformation");

ansi.theme({
  error: ansi.bold.red,
  warn: ansi.bold.redBright,
  ok: ansi.italic.bold.green,
  afterOk: ansi.underline.bold.blue,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
  allowedMention: [AllowedMentionsTypes.User, AllowedMentionsTypes.Role],
  closeTimeout: "3_000"
});

client.commands = new Collection();
client.aliases = new Collection();
client.colors = ansi;
client.system = system;
client.embed = {
  colors: {
    grey: "2c2c2b",
    green: "9fffa6",
  },
  texts: {
    footer: "Tano Development R",
  },
};

["event", "command"].forEach((file) => {
  require(`./handlers/${file}.js`)(client);
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 90000,
    keepAlive: true,
  })
  .then(() =>
    console.log(ansi.ok("[MONGO] ->"), ansi.afterOk("Connected to mongoDB"))
  );

client.handleEvents();
client.handleCommands();

process
  .on("uncaughtException", (err, orgin) => {
    fs.writeFile(
      "./err/uncaughtException.txt",
      `\nerror: ${err}\norgin: ${orgin}\nAt: ${Date.now()}\n`,
      (err) => console.log(err)
    );
  })
  .on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  })
  .on("warning", (warning) => {
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
  });

client.login(process.env.TOKEN);
