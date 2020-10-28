const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const database = require("../../database/db");

composer.command(`links`, async (ctx) => {
	const links = database.links["links"];

	await ctx.replyWithAnimation(
		{ url: gifs.links },
		{
			caption: message.links,
			parse_mode: "HTML",
			reply_markup: await keyboard.links(links),
		}
	);
});

middleware(composer);
consoles.module(__filename);
