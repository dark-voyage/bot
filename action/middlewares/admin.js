const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const database = require("../../database/db");

composer.command(`admins`, async (ctx) => {
  const admins = Object.keys(database.admins);

  await ctx.replyWithAnimation(
    { url: gifs.admin },
    {
      parse_mode: "HTML",
      caption: message.admin_menu,
      reply_markup: await keyboard.admin_list(admins),
    }
  );
});

middleware(composer);
consoles.module(__filename);
