const Discord = require("discord.js");
const { getImageFile, checkLanguage } = require("./carbon");
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
		// parses out the language specified in ```language
		let mdLanguage = mdCode.split(" ")[0].split("\n")[0].substring(3);
		// first word in code (specifies language, and beginning of code)
		let language = await checkLanguage(mdLanguage);

		if (
			mdCode.startsWith(`\`\`\`${mdLanguage}\n`) &&
			mdCode.endsWith("\n```")
		) {
			// remove the words with ``` from the code
			mdCode = mdCode.replace(`\`\`\`${mdLanguage}\n`, "");
			mdCode = mdCode.replace("\n```", "");

			const codeImage = await getImageFile(mdCode, language);
			msg.channel.send({ files: [{ attachment: codeImage }] });
		} else msg.reply("Invalid syntax. Could not parse message.");
	}
});

client.login(process.env.DISCORD_TOKEN);
