import app from "./client.js";
import { getGPortfolio, saveState } from "./datahandler.js";
import { projects } from "./projects.js";
const lraj23UserId = "U0947SL6AKB";
const lraj23BotTestingId = "C09GR27104V";
const gPortfolioBotId = "U09RMTPUB4J";
const gPortfolioDmId = "C09GR27104V";
const commands = {};
const gridify = (array, filler, oneFiller, isFields) => {
	let filledOneFiller = false;
	let response = [];
	const sec = (s, len) => {
		let res = [];
		for (let i = s; i < s + len; i++) {
			if (array[i]) res.push(array[i]);
			else if (filler && oneFiller) {
				res.push(filler);
				filledOneFiller = true;
				break;
			}
			else if (filler) res.push(filler);
			else break;
		}
		return res;
	};

	switch ([array.length <= 2, array.length <= 4, array.length <= 6, array.length && isFields, array.length <= 9, array.length <= 10 && isFields, array.length <= 12].indexOf(true)) {
		case 0:
			response = [sec(0, 2)];
			break;
		case 1:
			response = [sec(0, 2), sec(2, 2)];
			break;
		case 2:
			response = isFields ? [sec(0, 2), sec(2, 2), sec(4, 2)] : [sec(0, 3), sec(3, 3)];
			break;
		case 3:
			response = [sec(0, 2), sec(2, 2), sec(4, 2), sec(6, 2)];
			break;
		case 4:
			response = isFields ? [sec(0, 2), sec(2, 2), sec(4, 2), sec(6, 2), sec(8, 2)] : [sec(0, 3), sec(3, 3), sec(6, 3)];
			break;
		case 5:
			response = [sec(0, 2), sec(2, 2), sec(4, 2), sec(6, 2), sec(8, 2)];
			break;
		case 6:
			response = isFields ? [sec(0, 2), sec(2, 2), sec(4, 2), sec(6, 2), sec(8, 2), sec(10, 2)] : [sec(0, 3), sec(3, 3), sec(6, 3), sec(9, 3)];
			break;
	}

	if (oneFiller && (!filledOneFiller)) response.push([filler]);
	return response;
};

app.message("", async () => { });

commands.grid = async ({ ack, respond }) => [await ack(), await respond({
	text: "Here is a grid view of <@" + lraj23UserId + ">'s bots:",
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "Here is a grid view of <@" + lraj23UserId + ">'s bots:"
			}
		},
		{
			type: "table",
			rows: gridify(projects, [, ["", , "transparent"]], false).map(row => row.map(project => ({
				type: "rich_text",
				elements: [
					{
						type: "rich_text_section",
						elements: [
							{
								type: "emoji",
								name: project[1][2]
							},
							{
								type: "text",
								text: " " + project[1][0],
								style: {
									bold: true
								}
							}
						]
					}
				]
			})))
		},
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "To learn more about, or interact with, any of these bots, select the button below!"
			}
		},
		...(gridify(projects, [, ["Cancel", , "x"]], true).map(row => ({
			type: "actions",
			elements: row.map(project => ({
				type: "button",
				text: {
					type: "plain_text",
					text: ":" + project[1][2] + ": " + project[1][0],
					emoji: true
				},
				value: project[0] || "cancel",
				action_id: project[0] ? "learn-about-" + project[0] : "cancel"
			}))
		})))
	]
})];
app.command("/gportfolio-grid", commands.grid);

app.action(/^learn-about-.+$/, async ({ ack, action: { value }, body: { user: { id: user }, channel: { id: channel } }, respond }) => {
	await ack();
	console.log(value, user);
	const project = Object.fromEntries(projects)[value];
	await app.client.chat.postEphemeral({
		channel,
		user,
		text: "Information about <@" + project[1] + ">:",
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: ":" + project[2] + ": <@" + project[1] + ">:\n" + project[5]
				}
			},
			{
				type: "divider"
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: "Commands:"
				}
			},
			...(gridify(project[4], [, ["", , "transparent"]], false, true).map(row => ({
				type: "section",
				fields: row.map(command => ({
					type: "mrkdwn",
					text: command[0] ? "*/" + project[3] + command[0] + "*: " + command[1][0] + "\n" + command[1][1] : " "
				}))
			}))),
			{
				type: "divider"
			},
			...(gridify(project[4], [, ["Cancel", , "x"]], true).map(row => ({
				type: "actions",
				elements: row.map(command => ({
					type: "button",
					text: {
						type: "plain_text",
						text: command[0] ? "/" + project[3] + command[0] : ":x: Cancel",
						emoji: true,
					},
					value: command[0] ? project[3] + "+" + command[0] : "cancel",
					action_id: command[0] ? "run-command-" + project[3] + command[0] : "cancel"
				}))
			})))
		]
	});
});

app.action(/^run-command-.+$/, async ({ ack, action: { value }, body: { user: { id: user }, channel: { id: channel } }, respond }) => {
	await ack();
	console.log(value, user, channel);
	const project = projects.find(proj => proj[1][3] === value.split("+")[0])[1];
	console.log(project, project[1], value.split("+")[1] + ";" + user + ";" + channel);
	if (project[1] === gPortfolioBotId) return commands[value.split("+")[1]]({
		ack: _ => _,
		body: {
			user_id: user,
			channel_id: channel
		},
		respond: (response) => {
			if (typeof response === "string") return app.client.chat.postEphemeral({
				channel,
				user,
				text: response
			});
			if (!response.channel) response.channel = channel;
			if (!response.user) response.user = user;
			app.client.chat.postEphemeral(response);
		}
	});
	await app.client.chat.postMessage({
		channel: project[1],
		text: value.split("+")[1] + ";" + user + ";" + channel
	});
});

app.action(/^ignore-.+$/, async ({ ack }) => await ack());

app.action("cancel", async ({ ack, respond }) => [await ack(), await respond({ delete_original: true })]);

app.action("confirm", async ({ ack }) => await ack());

app.command("/gportfolio-help", commands.help);
commands.help = async ({ ack, respond, body: { user_id } }) => [await ack(), await respond("This bot lets you view <@" + lraj23UserId + ">'s projects and progress in a grid! _More information to come soon..._\nFor more information, check out the readme at https://github.com/lraj23/grid-portfolio"), user_id === lraj23UserId ? await respond("Test but only for <@" + lraj23UserId + ">. If you aren't him and you see this message, DM him IMMEDIATELY about this!") : null];

app.message(/secret button/i, async ({ message: { channel, user, thread_ts, ts } }) => await app.client.chat.postEphemeral({
	channel, user,
	text: "<@" + user + "> mentioned the secret button! Here it is:",
	thread_ts: ((thread_ts == ts) ? undefined : thread_ts),
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "<@" + user + "> mentioned the secret button! Here it is:"
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Secret Button"
					},
					action_id: "button_click"
				}
			]
		}
	]
}));

app.action("button_click", async ({ body: { channel: { id: cId }, user: { id: uId }, container: { thread_ts } }, ack }) => [await ack(), await app.client.chat.postEphemeral({
	channel: cId,
	user: uId,
	text: "You found the secret button. Here it is again.",
	thread_ts,
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "You found the secret button. Here it is again."
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Secret Button"
					},
					action_id: "button_click"
				}
			]
		}
	]
})]);