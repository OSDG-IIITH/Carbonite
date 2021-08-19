const puppeteer = require('puppeteer');

const getImageFile = async (code) => {

    return new Promise(async (resolve, reject) => {

        try {
            const browser = await puppeteer.launch();
            const carbonPage = await browser.newPage({ waitUntil: 'networkidle0', timeout: 0 });
            await carbonPage.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 2.5
            });

            await carbonPage.goto(`https://carbon.now.sh/?code=${encodeURIComponent(code)}`);
            await carbonPage.waitForSelector('#export-container');
            const element = await carbonPage.$('#export-container');

            const carbonPic = await element.screenshot({
                type: 'jpeg',
                quality: 100,
            });

            await carbonPage.close();
            await browser.close();

            resolve(carbonPic);

        }
        catch (e) {
            reject(e);
        }

    });
}

module.exports = { getImageFile };