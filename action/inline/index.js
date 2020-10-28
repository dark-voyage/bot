const { composer, middleware } = require("../../core/bot");

const fuzzy = require("fuzzy");

const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");
const ds = require("../../database/ds");

composer.on("inline_query", async ({ inlineQuery, answerInlineQuery }) => {
	let results = [],
		indexation = 1,
		base = `https://github.com/genemators/`,
		thumb = `https://genemator.me/favicon.png`;
	let repos = await Object.values(
		await ds("https://api.github.com/users/genemators/repos")
	).map(function (obj) {
		return obj["name"];
	});
	let similarities = await fuzzy
		.filter(inlineQuery.query, repos)
		.sort()
		.slice(0, 20);
	let found = await similarities.map(function (obj) {
		return obj.string;
	});
	for (let key of found) {
		let data = await ds(`https://api.github.com/repos/genemators/${key}`);
		results.push({
			type: "article",
			id: indexation,
			url: base + key,
			title: key,
			thumb_url: thumb,
			description: `${data["description"]}`,
			reply_markup: keyboard.inline(data),
			input_message_content: {
				message_text: message.inline(data),
				parse_mode: "HTML",
				disable_web_page_preview: true,
			},
		});
		indexation++;
	}
	return answerInlineQuery(results);
});

middleware(composer);
consoles.module(__filename);
