# Grid Portfolio

### Main Purpose

The point of this project is to allow people to more easily learn about lraj23's (my) bots, as well as to be more easily able to interact with said bots. Running the command /gportfolio-grid brings up the initial interface, from which any specific bot can be accessed. Clicking on that bot will result in a dashboard coming up. This dashboard contains a brief description of the bot overall, followed by a description of every command in the bot. Finally, there are the button options to run any of the mentioned commands, or just to close the dashboard.

### Commands

This bot, just like all of mine in the past, function on commands. However, this bot has the least commands out of any of my bots, *almost* by far ([Count Draqula](https://www.github.com/lraj23/count-draqula) only had 3 commands). This bot only has two commands.

#### /gportfolio-grid
This is basically the only important command in this entire bot. As mentioned above, this brings up an interface from which all bots I have made can be readily accessed. Then, selecting a specific brings up essentially an entire article about the bot, from which any of its commands can be run.

#### /gportfolio-help
This command is supposed to provide a user with some information about this bot, but, just like with any other bot, the GitHub repository readme always has more information. Especially in *this* bot, which is DESIGNED to provide information about my bots, this command is nearly utterly pointless.

### Relations With Other Bots

In order to remotely run commands on other bots, I have needed to devise a specific plan, as well as (most likely) implement something on my other bots. My plan was as follows: when a user presses a button for a command on a different bot, Grid Portfolio sends a direct message to the other bot (ex. Count Draqula). Then, the other bot, with the help of the new feature I added, reads the direct message and parses it to gain the information it needs about the command (which command, channel in which it was run, and user who ran it). Finally, since I have converted all my commands in all of my bots to functions, the other bot can, with ease, run the function for the command it needs.

At the time of creation of this bot, it works with [Chess Emojis](https://www.github.com/lraj23/chess-emojis), [Competitive Chess Emojis](https://www.github.com/lraj23/competitive-chess-emojis), [Magical Chess Emojis](https://www.github.com/lraj23/magical-chess-emojis), [Secret Signal Service](https://www.github.com/lraj23/secret-signal-service), [#You-must-be-active Manager](https://www.github.com/lraj23/you-must-be-active), [Count Draqula](https://www.github.com/lraj23/count-draqula), and itself!

### Links, Channels, Hackatime, etc.

The dedicated channel for testing this bot is [#lraj23-bot-testing](https://hackclub.slack.com/archives/C09GR27104V). The GitHub repo is literally [right here](https://www.github.com/lraj23/grid-portfolio). The Hackatime projects I attached this time are grid-portfolio, you-must-be-active, secret-signal-service, magical-chess-emojis, competitive-chess-emojis, and chess-emojis. The reason I have attached the Hackatime projects for (almost) all of my bots is because of the feature I have added in them where they respond to direct messages from my bot with running a command. If you're paying attention, the only bot I didn't include was Count Draqula, which is because it was my project for last week, and so I had been working on it quite a bit this week, making features that were not relevant to this week's project for at least 2 hours, which really shouldn't count.