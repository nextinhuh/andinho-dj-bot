import { Command } from "../interface/Command";
import { Player } from "discord-player";
import { CommandInteraction, Client } from "discord.js";

export const Queue: Command = {
    name: 'queue',
    description: 'Listar a(s) música(s) do AndinhoDJ!',
    run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
        if (interaction.guild) {
            const queue = clientPlayer.getQueue(interaction.guild);

            if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' });

            const currentTrack = queue.current;
            const tracks = queue.tracks.slice(0, 9).map((m, i) => {
                return `${i + 1}. **${m.title}** ([link](${m.url}))`;
            });

            return void interaction.followUp({
                embeds: [
                    {
                        title: 'Fila de músicas',
                        description: `${tracks.join('\n')}}`,
                        color: 0xff0000,
                        fields: [{ name: 'Tô tocando essa carai', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }],
                        image: { url: currentTrack.thumbnail }
                    }
                ]
            });
        }
    }
}