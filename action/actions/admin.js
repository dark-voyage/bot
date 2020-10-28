const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const database = require("../../database/db");

composer.action(`admins`, async (ctx) => {
	const admins = Object.keys(database.admins);

	await ctx.editMessageMedia(
		{
			type: "animation",
			media: gifs.admin,
			caption: message.admin_menu,
		},
		{
			parse_mode: "HTML",
			reply_markup: await keyboard.admin_list(admins),
		}
	);
});
try {
	composer.action(/admin_(.+)/gi, async (ctx) => {
		const match = ctx.match[1];
		const admins = database.admins;
		const found = admins[match];

		await ctx.editMessageMedia(
			{
				type: "photo",
				caption: message.admin_view(found, match),
				media: { source: found["avatar"] },
			},
			{
				parse_mode: "HTML",
				disable_web_page_preview: true,
				reply_markup: keyboard.admin_view(found),
			}
		);
	});
} catch (err) {
	console.log(err);
}

middleware(composer);
consoles.module(__filename);
