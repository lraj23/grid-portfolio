import app from "./client.js";
import { getGPortfolio, saveState } from "./datahandler.js";
import { projects } from "./projects.js";
const lraj23UserId = "U0947SL6AKB";
const lraj23BotTestingId = "C09GR27104V";

app.message("", async () => { });

app.command("/gportfolio-grid", async ({ ack, body: { user_id, channel_id }, respond }) => [await ack(), await respond({
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
			rows: [[projects[0], projects[1], projects[2]], [projects[3], projects[4], projects[5]], [projects[6], (projects[7] || [, ["", , "transparent"]]), (projects[8] || [, ["", , "transparent"]])]].map(row => row.map(project => ({
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
		{
			type: "actions",
			elements: [
				...(projects.map(project => ({
					type: "button",
					text: {
						type: "plain_text",
						text: ":" + project[1][2] + ": " + project[1][0],
						emoji: true
					},
					value: project[0],
					action_id: "learn-about-" + project[0]
				}))),
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":x: Cancel",
						emoji: true
					},
					value: "cancel",
					action_id: "cancel"
				}
			]
		}
	]
})
]);

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
			...(project[4].map(command => [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "*/" + project[3] + command[0] + "*: " + command[1][0] + "\n" + command[1][1]
					}
				},
				{
					type: "actions",
					elements: [
						{
							type: "button",
							text: {
								type: "plain_text",
								text: "Run Command",
								emoji: true
							},
							value: "run-command",
							action_id: "run-command-" + project[3] + "-" + command[0]
						}
					]
				}
			]).flat()),
			{
				type: "divider"
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: ":x: Cancel",
							emoji: true
						},
						value: "cancel",
						action_id: "cancel"
					}
				]
			}
		]
	});
});

app.action(/^run-command-.+$/, async ({ ack }) => await ack());

app.action(/^ignore-.+$/, async ({ ack }) => await ack());

app.action("cancel", async ({ ack, respond }) => [await ack(), await respond({ delete_original: true })]);

app.action("confirm", async ({ ack }) => await ack());

app.command("/gportfolio-help", async ({ ack, respond, payload: { user_id } }) => [await ack(), await respond("This bot lets you view <@" + lraj23UserId + ">'s projects and progress in a grid! _More information to come soon..._\nFor more information, check out the readme at https://github.com/lraj23/grid-portfolio"), user_id === lraj23UserId ? await respond("Test but only for <@" + lraj23UserId + ">. If you aren't him and you see this message, DM him IMMEDIATELY about this!") : null]);

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