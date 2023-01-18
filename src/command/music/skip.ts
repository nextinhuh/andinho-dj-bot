import { Command } from '../interface/Command'
import { Player } from 'discord-player'
import { CommandInteraction, Client } from 'discord.js'
import { EmbedCustomBuild } from './music-message-embed'

export const Skip: Command = {
  name: 'skip',
  description: 'Peça pro AndinhoDJ pular essa música lixo, esse corno!',
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    if (interaction.guild != null) {
      const queue = clientPlayer.getQueue(interaction.guild)
      if ((queue == null) || !queue.playing) return await interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' })
      const success = queue.skip()

      return await interaction.followUp({
        embeds: success
          ? [EmbedCustomBuild({
              typeEmbed: 'musicSkip',
              queue
            })]
          : [EmbedCustomBuild({
              typeEmbed: 'notMusicSkip',
              queue
            })]
      })
    }
  }
}
