const { EmbedBuilder, codeBlock } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: {
    name: "ip-lookup",
    aliases: ["ipl"],
    category: "UTILS",
  },

  info: {
    description: `Lookup information about an IP address.`,
    usage: `ip-lookup [address]`,
    examples: [`ip-lookup 162.28.128.243`],
  },

  access: {
    developersOnly: false,
    public: true,
  },
  run: async (client, message, args) => {
    try {
      let ip = "162.28.128.243";
      if (args[0]) ip = args[0];

      const res = await axios({
        url: `${process.env.NINJA_API}/iplookup?address=${ip}`,
        headers: { "X-Api-Key": process.env.NINJA_API_KEY },
      });

      if (res.data.is_valid) {
        const country = res.data.country;
        const country_code = res.data.country_code;
        const region = res.data.region;
        const region_code = res.data.region_code;
        const city = res.data.city;
        const zip = res.data.zip;
        const lat = res.data.lat;
        const lon = res.data.lon;
        const timezone = res.data.timezone;
        const isp = res.data.isp;
        const address = res.data.address;

        const embed = new EmbedBuilder()
          .addFields(
            {
              name: "Address:",
              value: `${address}`,
            },
            {
              name: "Country:",
              value: `${country || "N/A"}`,
            },
            {
              name: "Country Code:",
              value: `${country_code || "N/A"}`,
            },
            {
              name: "Region:",
              value: `${region || "N/A"}`,
            },
            {
              name: "Region Code:",
              value: `${region_code || "N/A"}`,
            },
            {
              name: "City:",
              value: `${city || "N/A"}`,
            },
            {
              name: "Zip:",
              value: `${zip || "N/A"}`,
            },
            {
              name: "latitude:",
              value: `${lat || "N/A"}`,
            },
            {
              name: "longitude:",
              value: `${lon || "N/A"}`,
            },
            {
              name: "Timezone:",
              value: `${timezone || "N/A"}`,
            },
            {
              name: "ISP:",
              value: `${isp || "N/A"}`,
            }
          )
          .setColor("Green");
        message.channel.send({ embeds: [embed] });
      } else {
        message.channel.send(
          codeBlock(`Error: is_valid = false ; invalid ip address`)
        );
      }
    } catch (e) {
      console.log(e);
      message.channel.send(codeBlock(e));
    }
  },
};
