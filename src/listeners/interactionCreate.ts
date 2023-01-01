import { Commands } from "../command";
import { Phrases } from "../utils/constants";
import { Player, Queue } from "discord-player";
import { CommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client, clientPlayer: Player): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction, clientPlayer);
        }
    });

    // create event when music start
    clientPlayer.on("trackStart", (queue: Queue<any>, track) => queue.metadata.channel.send(`🎶 | Tô tocando essa aqui ó  **${track.title}**!`));

    // create event when music end
    clientPlayer.on("trackEnd", (queue: Queue<any>) => queue.metadata.channel.send(`🎶 | Toquei sua música, então se lasque..`));
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, clientPlayer: Player): Promise<void> => {
    // handle slash command here
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.reply("An error has occurred");
        return;
    }

    await interaction.deferReply();

    await slashCommand.run(client, interaction, clientPlayer);
};