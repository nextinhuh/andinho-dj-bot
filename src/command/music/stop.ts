import { Command } from "../interface/Command";
import { Player } from "discord-player";
import { CommandInteraction, Client } from "discord.js";

export const Stop: Command = {
    name: 'stop',
    description: 'Pare de escutar a(s) música(s) do AndinhoDJ!',
    run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
        if (interaction.guild) {
            const queue = clientPlayer.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' });
            queue.destroy();

            return void interaction.followUp({ content: '🛑 |  Parei esse caralho!' });
        }
    }
}