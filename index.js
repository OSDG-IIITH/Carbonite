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

		const lines = mdCode.split('\n');
		console.log(lines);

		const initLineRE = /```[\w#\+-\/]*/;

		if (
			initLineRE.test(lines[0]) &&
			lines[lines.length - 1].endsWith("```")
		) {
			const mdLanguage = lines[0].slice(3);
			const codeLines = lines.slice(1, -1);
			const code = codeLines.join('\n');
			const language = checkLanguage(mdLanguage);

			const codeImage = await getImageFile(code, language);
			msg.channel.send({ files: [{ attachment: codeImage }] });
		} else msg.reply("Invalid syntax. Could not parse message.");
	}
});

client.login(process.env.DISCORD_TOKEN);
