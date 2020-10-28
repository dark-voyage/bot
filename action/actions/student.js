const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const database = require("../../database/db");

composer.action(`students`, async (ctx) => {
	const students = Object.keys(database.students);

	await ctx.editMessageMedia(
		{
			type: "animation",
			media: gifs.student,
			caption: message.student_menu,
		},
		{
			parse_mode: "HTML",
			reply_markup: await keyboard.student_list(students),
		}
	);
});
try {
	composer.action(/student_(.+)/gi, async (ctx) => {
		const match = ctx.match[1];
		const students = database.students;
		const found = students[match];

		await ctx.editMessageMedia(
			{
				type: "photo",
				caption: message.student_view(found, match),
				media: { source: found["avatar"] },
			},
			{
				parse_mode: "HTML",
				disable_web_page_preview: true,
				reply_markup: keyboard.student_view(found),
			}
		);
	});
} catch (err) {
	console.log(err);
}

middleware(composer);
consoles.module(__filename);
