const Discord = require("discord.js");
const { getImageFile, checkTheme } = require("./carbon");
require("dotenv").config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Carbonite is active as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content.startsWith("carbonite")) {
    let theme = msg.content.match(/\S+/gi)[1];

    theme = (await checkTheme(theme)) ? theme : "nord";

    let mdCode = msg.content.substring(msg.content.indexOf("\n") + 1);
    if (mdCode.startsWith("```\n") && mdCode.endsWith("\n```")) {
      mdCode = mdCode.replace("```\n", "");
      mdCode = mdCode.replace("\n```", "");
      const codeImage = await getImageFile(mdCode, theme);
      msg.channel.send({ files: [{ attachment: codeImage }] });
    } else msg.reply("Invalid syntax. Could not parse message.");
  }
});

client.login(process.env.DISCORD_TOKEN);
