import { Command } from "../interface/Command";
import { Player } from "discord-player";
import { CommandInteraction, Client } from "discord.js";

export const Resume: Command = {
    name: 'resume',
    description: 'Peça pro AndinhoDJ voltar a tocar, esse corno!',
    run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
        if (interaction.guild) {
            const queue = clientPlayer.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' });
            const paused = queue.setPaused(false);

            return interaction.followUp({ content: paused ? '▶ | Ta ai, escute, tô alisando muito não!' : '❌ | Vou tocar mais porra nenhuma não!' });
        }
    }
}