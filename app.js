import app from "./client.js";
import { getGPortfolio, saveState } from "./datahandler.js";
const lraj23UserId = "U0947SL6AKB";
const lraj23BotTestingId = "C09GR27104V";
const projects = Object.entries({
	chessEmojis: ["Chess Emojis", "U09H7B3GHJM", "chess-emojis", "chess-emojis-", Object.entries({
		"data-opt-in": "Opts you in to data collection",
		"data-opt-out": "Opts you out of data collection",
		"react-opt-in": "Opts you in to Chess Emojis's reactions",
		"react-opt-out": "Opts you out of Chess Emojis's reactions",
		"explain-opt-in": "Opts you in to explanations",
		"explain-opt-out": "Opts you out of explanations",
		"channel-opt-in": "Opts the channel in to NORMAL reactions",
		"channel-opt-out": "Opts the channel out of NORMAL reactions"
	})],
	competitiveChessEmojis: ["Competitive Chess Emojis", "U09GYKW530C", "competitive-chess-emojis", "ccemojis-", Object.entries({
		"data-opt-in": "Opts you in to COMPETITIVE data collection",
		"data-opt-out": "Opts you out of COMPETITIVE data collection",
		"game-opt-in": "Opts you in to the Competitive Chess Emojis game",
		"game-opt-out": "Opts you out of the Competitive Chess Emojis game",
		"explain-opt-in": "Opts you in to COMPETITIVE explanations",
		"explain-opt-out": "Opts you out of COMPETITIVE explanations",
		"start-game": "Starts a conversation game against someone else!",
		leaderboard: "Shows you the COMPETITIVE leaderboard!",
		"resign-game": "Resigns you from your current game!",
		help: "Helps you navigate this bot!",
		"channel-opt-in": "Opts the channel in to COMPETITIVE reactions!",
		"channel-opt-out": "Opts the channel out of COMPETITIVE reactions!"
	})],
	magicalChessEmojis: ["Magical Chess Emojis", "U09K74K0TN1", "magical-chess-emojis", "mchessemojis-", Object.entries({
		help: "Helps you navigate this bot!",
		"channel-opt-in": "Opts the channel in to MAGICAL reactions!",
		"channel-opt-out": "Opts the channel out of MAGICAL reactions!",
		"edit-opts": "Lets you change your MAGICAL opts!",
		"use-magic": "Lets you use your hard-earned magic!"
	})],
	secretSignalService: ["Secret Signal Service", "U09N2MNHSUQ", "secret-signal-service", "ssservice-", Object.entries({
		"edit-opts": "Lets you change your Secret Signal Service opts!",
		"send-signal": "Lets you send a secret signal to someone!",
		"guess-signal": "Lets you guess the signal being sent to you!",
		leaderboard: "Shows you the Secret Signal Service leaderboard!",
		"signal-value": "Shows you your Secret Signal Service signal info!",
		help: "Helps you navigate this bot!",
		shop: "Lets you spend your hard-earned Secret Signal Service coins!"
	})],
	youMustBeActive: ["You-must-be-active Manager", "U09N7BHFK3K", "you-must-be-active", "ymbactive-", Object.entries({
		"join-channel": "Lets you join the private channel!",
		"join-testing": "Lets you join the private testing channel!",
		leaderboard: "Shows you the ACTIVITY leaderboard!",
		"edit-reminds": "Lets you change your ACTIVE reminder interval!",
		help: "Helps you navigate this bot!",
		admin: "Admin controls for this bot!",
		"add-others": "Lets you kidnap people to #you-must-be-active"
	})],
	countDraqula: ["Count Draqula", "U09PD1N6J11", "count-draqula", "cdraqula-", Object.entries({
		help: "Helps you navigate this bot!",
		admin: "Admin controls for this bot!",
		shop: "Lets you spend your hard-earned Counting coins!"
	})],
	gridPortfolio: ["Grid Portfolio", "U09RMTPUB4J", "grid-portfolio", "gportfolio-", Object.entries({
		help: "Helps you navigate this bot!",
		grid: "Lets you learn about @lraj23's projects!"
	})]
});

app.message("", async () => { });

app.command("/gportfolio-grid", async ({ ack, body: { user_id, channel_id }, respond }) => {
	await ack();
	const gridResult = projects.map(project => "" + project[1][2] + "")
	await respond({
		text: "Here is a grid view of <@" + lraj23UserId + ">'s bots:",
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: "Here is a grid view of <@" + lraj23UserId + ">'s bots: (testing)"
				}
			},
			{
				type: "table",
				rows: [[projects[0], projects[1], projects[2]], [projects[3], projects[4], projects[5]], [projects[6], [, ["", , "transparent"]], [, ["", , "transparent"]]]].map(row => row.map(project => ({
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
	});
});

app.action(/^learn-about-.+$/, async ({ ack }) => await ack());

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