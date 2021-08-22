const puppeteer = require("puppeteer");
const languageList = require('./config.json');

const getImageFile = async (code, language) => {
	return new Promise(async (resolve, reject) => {
		try {
			const browser = await puppeteer.launch();
			const carbonPage = await browser.newPage({
				waitUntil: "networkidle0",
				timeout: 0,
			});

			await carbonPage.setViewport({
				width: 1920,
				height: 1080,
				deviceScaleFactor: 2.5,
			});

			code = encodeURIComponent(code);
			link = `https://carbon.now.sh/?code=${code}&l=${language}`;

			await carbonPage.goto(link);

			await carbonPage.waitForSelector("#export-container");
			const element = await carbonPage.$("#export-container");

			const carbonPic = await element.screenshot({
				type: "jpeg",
				quality: 100,
			});

			await carbonPage.close();
			await browser.close();

			resolve(carbonPic);
		} catch (e) {
			reject(e);
		}
	});
};

const checkLanguage = language => languageList[language] ?? "auto";

module.exports = { getImageFile, checkLanguage };
