const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

composer.help(async (ctx) => {
	await ctx.replyWithAnimation(
		{ url: gifs.help },
		{
			parse_mode: "HTML",
			caption: message.help,
			reply_markup: keyboard.help,
		}
	);
});

middleware(composer);
consoles.module(__filename);
