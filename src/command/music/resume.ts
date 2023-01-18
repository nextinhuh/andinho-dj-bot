import { Command } from '../interface/Command'
import { Player } from 'discord-player'
import { CommandInteraction, Client } from 'discord.js'
import { EmbedCustomBuild } from './music-message-embed'

export const Resume: Command = {
  name: 'resume',
  description: 'Peça pro AndinhoDJ voltar a tocar, esse corno!',
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    if (interaction.guild != null) {
      const queue = clientPlayer.getQueue(interaction.guild)

      if ((queue == null) || !queue.playing) return await interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' })

      queue.setPaused(false)

      return await interaction.followUp({
        embeds: [EmbedCustomBuild({
          typeEmbed: 'musicResume',
          queue
        })]
      })
    }
  }
}
