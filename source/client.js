const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  AllowedMentionsTypes,
  WebhookClient,
} = require("discord.js");
const mongoose = require("mongoose");
const ansi = require("ansi-colors");
const fs = require("node:fs");
const system = require("systeminformation");
const path = require("path");

ansi.theme({
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
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
  allowedMention: [AllowedMentionsTypes.User, AllowedMentionsTypes.Role],
  closeTimeout: "3_000",
});

const logger = new WebhookClient({
  url: process.env.WEBHOOK_d58c2d594694f53a2d72c855d35e5fb,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = fs.readdirSync(path.join(__dirname, "/commands/"));
client.colors = ansi;
client.system = system;
client.embed = {
  colors: {
    grey: "2c2c2b",
    green: "9fffa6",
    red: "ff5b5b",
  },
  texts: {
    footer: "Tano Development R",
  },
};
client.logger = logger;
require("./handlers/functions.js")(client);

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

client.login(process.env.TOKEN);
