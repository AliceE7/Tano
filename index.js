const { ShardingManager, ShardEvents } = require("discord.js");
const ansi = require("ansi-colors");
const fs = require("fs");

const manager = new ShardingManager("./source/client.js", {
  totalShards: "auto",
  token: process.env.TOKEN,
  respawn: true,
});

manager.on("shardCreate", (shard) => {
  console.log(
    ansi.bold.red(`[SHARD]`) + ansi.italic.yellow(` ${shard.id} launched`)
  );
});

manager.spawn();

process.on("uncaughtException", (err, orgin) => {
  console.log(err, orgin)
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise)
});

process.on("warning", (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.stack);
});