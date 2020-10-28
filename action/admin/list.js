const { composer, middleware } = require("../../core/bot");

const axios = require("axios");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const security = require("../security");
const database = require("../../database/db");

composer.command(`list`, async (ctx) => {
	const subscribers = async () => {
		return await axios
			.get(`https://api.genemator.me/subscriber`)
			.then((res) => {
				return res.data.join(`\n`);
			});
	};
	const subscribersCount = async () => {
		return await axios
			.get(`https://api.genemator.me/subscriber`)
			.then((res) => {
				return res.data.length;
			});
	};
	await security(ctx, async () => {
		const list = database.users["temporary"].join("\n");

		if (!list) {
			await ctx.replyWithAnimation(
				{ url: gifs.list },
				{
					parse_mode: "HTML",
					caption:
						`<b>Temporary admin list is empty!</b>` +
						`\n` +
						`\n` +
						`<b>Users: </b>` +
						`\n` +
						`<pre>${await subscribers()}</pre>` +
						`\n` +
						`\n` +
						`<b>Total users count:</b> ${await subscribersCount()}`,
				}
			);
		} else {
			await ctx.replyWithAnimation(
				{ url: gifs.list },
				{
					parse_mode: "HTML",
					caption:
						`<b>Temporary admins:</b>\n<code>${list}</code>` +
						`\n` +
						`\n` +
						`<b>Users: </b>` +
						`\n` +
						`<pre>${await subscribers()}</pre>` +
						`\n` +
						`\n` +
						`<b>Total users count:</b> ${await subscribersCount()}`,
				}
			);
		}
	});
});

middleware(composer);
consoles.module(__filename);
