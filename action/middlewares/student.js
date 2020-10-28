const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const database = require("../../database/db");

composer.command(`students`, async (ctx) => {
	const students = Object.keys(database.students);

	await ctx.replyWithAnimation(
		{ url: gifs.student },
		{
			parse_mode: "HTML",
			caption: message.student_menu,
			reply_markup: await keyboard.student_list(students),
		}
	);
});

middleware(composer);
consoles.module(__filename);
