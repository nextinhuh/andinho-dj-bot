import { Command } from "../interface/Command";
import { Player } from "discord-player";
import { CommandInteraction, Client } from "discord.js";

export const Skip: Command = {
    name: 'skip',
    description: 'Peça pro AndinhoDJ pular essa música lixo, esse corno!',
    run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
        if (interaction.guild) {
            const queue = clientPlayer.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' });
            const currentTrack = queue.current;
            const success = queue.skip();

            return void interaction.followUp({
                content: success ? `✅ | Mudei esse caralho! **${currentTrack}**!` : '❌ | Vou mudar porra nenhuma não!'
            });
        }
    }
}