const puppeteer = require("puppeteer");

const getImageFile = async (code, theme) => {
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

      await carbonPage.goto(
        `https://carbon.now.sh/?code=${encodeURIComponent(code)}&t=${theme}`
      );
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

const checkTheme = async (theme) => {
  const themes = [
    "3024-night",
    "a11y-dark",
    "base16-dark",
    "base16-light",
    "blackboard",
    "cobalt",
    "duotone-dark",
    "hopscotch",
    "lucario",
    "material",
    "monokai",
    "night-owl",
    "nord",
    "oceanic-next",
    "one-light",
    "one-dark",
    "panda-syntax",
    "paraiso-dark",
    "seti",
    "shades-of-purple",
    "solarized+dark",
    "solarized+light",
    "synthwave-84",
    "twilight",
    "verminal",
    "vscode",
    "yeti",
    "zenburn",
  ];

  return themes.includes(theme);
};

module.exports = { getImageFile, checkTheme };
