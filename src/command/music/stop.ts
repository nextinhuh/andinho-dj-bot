import { Command } from '../interface/Command'
import { Player } from 'discord-player'
import { CommandInteraction, Client } from 'discord.js'
import { EmbedCustomBuild } from './music-message-embed'

export const Stop: Command = {
  name: 'stop',
  description: 'Pare de escutar a(s) música(s) do AndinhoDJ!',
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    if (interaction.guild != null) {
      const queue = clientPlayer.getQueue(interaction.guild)
      if ((queue == null) || !queue.playing) return await interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' })
      queue.destroy()

      return await interaction.followUp({
        embeds: [EmbedCustomBuild({
          typeEmbed: 'musicStop',
          queue
        })]
      })
    }
  }
}
