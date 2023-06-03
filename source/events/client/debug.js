module.exports = async (client, info) => {
  if (info.startsWith("hit a 402")) {
    process.kill(1);
  }
};
