const { Markup, Extra } = require("telegraf");

exports.start = Markup.inlineKeyboard([
	[Markup.callbackButton("Show detailed information", "help")],
]);

exports.help = Markup.inlineKeyboard([
	[Markup.switchToCurrentChatButton("Search Projects", "")],
]);

exports.student_view = (data) =>
	Markup.inlineKeyboard([
		[Markup.urlButton(`Website`, data["profile"])],
		[
			Markup.urlButton(`Github`, `https://github.com/${data["github"]}`),
			Markup.urlButton(`Telegram`, `https://t.me/${data["telegram"]}`),
		],
		[Markup.callbackButton(`⬅ Back`, `students`)],
	]);

exports.student_list = async (data) => {
	const list = [];
	for (let student of data) {
		list.push([Markup.callbackButton(student, `student_${student}`)]);
	}
	return Markup.inlineKeyboard(list);
};

exports.check = Markup.inlineKeyboard([
	Markup.callbackButton(`🔃 Refresh`, `check`),
]);

exports.form_accept = Markup.inlineKeyboard([
	[Markup.urlButton(`Community Channel`, `https://t.me/genemators`)],
]);

exports.form_decline = Markup.inlineKeyboard([
	[Markup.urlButton(`Feedback Zone`, `https://t.me/genemator_bot`)],
]);

exports.form_complete = Markup.inlineKeyboard([
	[Markup.callbackButton(`Completed...`, `respond_complete`)],
	[
		Markup.urlButton(
			`Check pending invitations`,
			`https://github.com/orgs/chiseldevs/people/pending_invitations`
		),
	],
	[
		Markup.urlButton(
			`Check pending collaborators`,
			`https://github.com/orgs/chiseldevs/pending_collaborators`
		),
	],
]);

exports.form_request = Markup.inlineKeyboard([
	[
		Markup.urlButton(
			`Check pending invitations`,
			`https://github.com/orgs/chiseldevs/people/pending_invitations`
		),
	],
	[
		Markup.urlButton(
			`Check pending collaborators`,
			`https://github.com/orgs/chiseldevs/pending_collaborators`
		),
	],
]);

exports.form_admin = (data) =>
	Markup.inlineKeyboard([
		[
			Markup.callbackButton(`✅`, `accept_form_${data}`),
			Markup.callbackButton(`❌`, `decline_form_${data}`),
		],
		[
			Markup.urlButton(
				`Check pending invitations`,
				`https://github.com/orgs/chiseldevs/people/pending_invitations`
			),
		],
		[
			Markup.urlButton(
				`Check pending collaborators`,
				`https://github.com/orgs/chiseldevs/pending_collaborators`
			),
		],
	]);

exports.invalid = Markup.inlineKeyboard([
	Markup.callbackButton(`Show available commands`, `help`),
]);

exports.photo = Markup.inlineKeyboard([
	[Markup.urlButton(`Upload your own art!`, `https://t.me/genemator_bot`)],
	[Markup.urlButton(`Community Channel`, `https://t.me/genemators`)],
]);

exports.video = Markup.inlineKeyboard([
	[Markup.urlButton(`Upload your own video!`, `https://t.me/genemator_bot`)],
	[Markup.urlButton(`Community Channel`, `https://t.me/genemators`)],
]);

exports.audio = Markup.inlineKeyboard([
	[
		Markup.urlButton(
			`Upload your own music & audio!`,
			`https://t.me/genemator_bot`
		),
	],
	[Markup.urlButton(`Community Channel`, `https://t.me/genemators`)],
]);

exports.inline = (data) =>
	Markup.inlineKeyboard(
		[
			Markup.urlButton(`GitHub`, `${data["html_url"]}`),
			Markup.urlButton(
				`Download`,
				`https://github.com/${data["full_name"]}/archive/master.zip`
			),
			Markup.switchToCurrentChatButton(`Repositories`, ``),
		],
		{ columns: 2 }
	);

exports.error_admin = Markup.inlineKeyboard([
	Markup.urlButton(`Contact with admin`, `https://t.me/genemator`),
]);

exports.links = async (links) => {
	const keyboard = [];
	for (let link of links) {
		keyboard.push([Markup.urlButton(link["name"], link["url"])]);
	}
	return Markup.inlineKeyboard(keyboard);
};

exports.stream = Markup.inlineKeyboard([
	[Markup.urlButton(`Twitch`, `http://twitch.com/genemators`)],
	[
		Markup.urlButton(
			`YouTube`,
			`https://www.youtube.com/channel/UCuF2yVTeVW6vcwXobvXXvZg`
		),
	],
]);

exports.minecraft = Markup.inlineKeyboard([
	[Markup.callbackButton("🔃 Refresh", "minecraft")],
	[Markup.urlButton("🌐 Website", "https://genemator.aternos.me/")],
]);
