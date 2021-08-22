const Discord = require("discord.js");
const { getImageFile, checkTheme, getLanguage } = require("./carbon");
require("dotenv").config();

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.on("ready", () => {
    console.log(`Carbonite is active as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
    if (msg.content.startsWith("carbonite")) {
        let mdCode = msg.content.substring(msg.content.indexOf("\n") + 1);
        const lines = mdCode.split("\n");

        const initLineRE = /```[\w#\+-\/]*/;
        if (
            initLineRE.test(lines[0]) &&
            lines[lines.length - 1].endsWith("```")
        ) {
            const userLanguage = lines[0].slice(3);
            const userTheme = msg.content.split("\n")[0].split(" ")[1];
            const userCode = lines.slice(1, -1);

            const language = getLanguage(userLanguage);
            const theme = checkTheme(userTheme) ? userTheme : "one-dark";
            const code = userCode.join("\n");

            await msg.channel.sendTyping();
            const codeImage = await getImageFile(code, theme, language);
            await msg.channel.send({ files: [{ attachment: codeImage }] });
            if(msg.deletable && !msg.deleted){
                await msg.delete();
            }
        } else msg.reply("Invalid syntax. Could not parse message.");
    }
});

client.login(process.env.DISCORD_TOKEN);
