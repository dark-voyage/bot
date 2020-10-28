const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const ds = require("../../database/ds");
const env = require("../../core/env");

composer.command(`minecraft`, async (ctx) => {
	await ctx.replyWithAnimation(
		{ url: gifs.minecraft_w },
		{
			parse_mode: "HTML",
			caption: `<b>Please, wait a minute. We are processing your request!</b>`,
		}
	);

	const database = await ds(env.MINECRAFT);
	if (database === null || database["debug"].ping === false) {
		await ctx.replyWithAnimation(
			{
				url: gifs.minecraft_r,
			},
			{
				caption: `<b>Unavailable at the moment! Please, try again later...</b>`,
				parse_mode: "HTML",
				reply_markup: keyboard.minecraft,
			}
		);
	} else {
		await ctx.replyWithAnimation(
			{
				url: gifs.minecraft_r,
			},
			{
				reply_markup: keyboard.minecraft,
				parse_mode: "HTML",
				caption: await message.minecraft(database),
			}
		);
	}
});

middleware(composer);
consoles.module(__filename);
