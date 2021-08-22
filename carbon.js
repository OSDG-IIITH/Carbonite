const puppeteer = require("puppeteer");
const { languageList, themeList } = require("./config.json");

const getImageFile = async (code, theme, language) => {
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
            const link = `https://carbon.now.sh/?code=${code}&t=${theme}&l=${language}`;
            await carbonPage.goto(link);

            await carbonPage.waitForSelector("#export-container");
            const element = await carbonPage.$("#export-container");

            const carbonPic = await element.screenshot({
                type: "png",
            });

            await carbonPage.close();
            await browser.close();

            resolve(carbonPic);
        } catch (e) {
            reject(e);
        }
    });
};

const checkTheme = (theme) => themeList.includes(theme);

const getLanguage = (language) => languageList[language] ?? "auto";

module.exports = { getImageFile, checkTheme, getLanguage };
