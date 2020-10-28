const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

composer.command(`stream`, async (ctx) => {
	await ctx.replyWithAnimation(
		{ url: gifs.stream },
		{
			caption: message.stream,
			parse_mode: "HTML",
			reply_markup: keyboard.stream,
		}
	);
});

middleware(composer);
consoles.module(__filename);
