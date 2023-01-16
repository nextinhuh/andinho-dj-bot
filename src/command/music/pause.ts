import { Command } from '../interface/Command'
import { Player } from 'discord-player'
import { CommandInteraction, Client } from 'discord.js'
import { EmbedCustomBuild } from './music-message-embed'

export const Pause: Command = {
  name: 'pause',
  description: 'Peça pro AndinhoDJ fazer uma pausa!',
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    if (interaction.guild) {
      const queue = clientPlayer.getQueue(interaction.guild)
      if (!queue?.playing) return await interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' })
      queue.setPaused(true)

      return await interaction.followUp({
        embeds: [EmbedCustomBuild({
          typeEmbed: 'musicPause',
          queueProps: queue
        })]
      })
    }
  }
}
