const gifs = require("../../database/db").gifs;
const database = require("../../database/db");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

module.exports = async (ctx, func) => {
	if (
		database.users["eternal"].includes(ctx.from.id) ||
		database.users["temporary"].includes(ctx.from.username)
	) {
		await func();
	} else {
		await ctx.replyWithAnimation(
			{ url: gifs.security },
			{
				parse_mode: "HTML",
				caption: message.error_admin,
				reply_markup: keyboard.error_admin,
			}
		);
	}
};
