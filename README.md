# Carbonite

A Discord Bot that takes code messages and converts them into beautiful images. Powered by [Carbon](https://carbon.now.sh).

![image](https://user-images.githubusercontent.com/37783178/130370494-a75fdf2d-bbdf-4891-b7c3-5c0dded1dc3b.png)


### Get it working

The repo is written in JavaScript. To run in you need to have `node 16` installed. Follow these steps to get started:

```
git clone https://github.com/OSDG-IIITH/Carbonite.git
cd Carbonite
npm i
node index.js
```

Note that to run the bot, you need to set up a Discord bot in the Discord Developer Platform and get a bot token. Save this token in a file called `.env` at the root directory of the project as:

```
DISCORD_TOKEN=YOUR_TOKEN_HERE
```

In the channel, invite Carbonite. You can now invoke it using the `carbonite` keyword, followed by the code on a new line. For example, send the following message on the channel that Carbonite has access to:

    carbonite
    ```
    print("Hello World")
    ```

### How does it work?

The Bot has 2 main parts:

1. The Bot interface, powered by `Discord.js v13`, that handles receiving, parsing and sending messages.

2. The "Carbonizer", powered by `Puppeteer`. It spawns a headless browser that modifies the Carbon webpage's contents to accomodate for the code, then screenshots the DOM element that has the prettified code image and returns a byte stream of the image data back to the bot to send to Discord.

### Future Plans

1. Delete the original message requesting the carbonification.
2. Add a "Carbonite is typing..." prompt to Discord while the bot generates and sends the image.
3. Create a help event that explains bot usage.
4. Create a list event that lists available themes and languages
