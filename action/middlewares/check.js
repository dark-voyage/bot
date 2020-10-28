const { composer, middleware } = require("../../core/bot");
const isReachable = require("is-reachable");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

composer.command(`check`, async (ctx) => {
	const uptime = await new Date().toLocaleString();

	const github = async () => {
		if (await isReachable("api.github.com")) {
			return "STABLE";
		} else {
			return "UNSTABLE";
		}
	};

	const telegram = async () => {
		if (await isReachable("api.telegram.org")) {
			return "STABLE";
		} else {
			return "UNSTABLE";
		}
	};

	const website = async () => {
		if (await isReachable("genemator.me")) {
			return "STABLE";
		} else {
			return "UNSTABLE";
		}
	};

	await ctx.replyWithAnimation(
		{ url: gifs.check },
		{
			caption: await message.check(
				await github(),
				await telegram(),
				await website(),
				uptime
			),
			reply_markup: keyboard.check,
			parse_mode: "HTML",
		}
	);
});

middleware(composer);
consoles.module(__filename);
