const { composer, middleware } = require("../../core/bot");

const gifs = require("../../database/db").gifs;
const consoles = require("../../layouts/consoles");
const database = require("../../database/db");

composer.command(`stats`, async (ctx) => {
	const subscriber = ctx.from.id;
	const status = {
		id: ctx.from.id,
		first_name: ctx.from.first_name,
		last_name: ctx.from.last_name,
		username: ctx.from.username,
		lang: ctx.from.language_code,
		superuser: async () => {
			if (
				database.users["eternal"].includes(ctx.from.id) ||
				database.users["temporary"].includes(ctx.from.username)
			) {
				return `admin`;
			} else {
				return `non-admin`;
			}
		},
	};

	await ctx.replyWithAnimation(
		{ url: gifs.stats },
		{
			caption:
				`<b>User status preview:</b>` +
				`\n` +
				`\n` +
				`<b>ID:</b> <code>${status.id}</code>` +
				`\n` +
				`<b>First Name:</b> <code>${status.first_name}</code>` +
				`\n` +
				`<b>Last Name:</b> <code>${status.last_name}</code>` +
				`\n` +
				`<b>Username:</b> <code>${status.username}</code>` +
				`\n` +
				`<b>Language:</b> <code>${status.lang}</code>` +
				`\n` +
				`<b>Status:</b> <code>${await status.superuser()}</code>`,
			parse_mode: "HTML",
		}
	);
});

middleware(composer);
consoles.module(__filename);
