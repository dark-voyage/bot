const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

composer.start(async (ctx) => {
	await ctx.replyWithAnimation(
		{ url: gifs.start },
		{
			parse_mode: "HTML",
			caption: message.start,
			reply_markup: keyboard.start,
		}
	);
});

middleware(composer);
consoles.module(__filename);
