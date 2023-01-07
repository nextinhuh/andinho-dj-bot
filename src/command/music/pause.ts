import { Command } from '../interface/Command'
import { Player } from 'discord-player'
import { CommandInteraction, Client } from 'discord.js'

export const Pause: Command = {
  name: 'pause',
  description: 'Peça pro AndinhoDJ fazer uma pausa!',
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    if (interaction.guild) {
      const queue = clientPlayer.getQueue(interaction.guild)
      if (!queue?.playing) return await interaction.followUp({ content: '❌ | Tô tocando nada não porra, e não me abuse não!' })
      const paused = queue.setPaused(true)

      return await interaction.followUp({ content: paused ? '⏸ | Parei de tocar já, arrombado!' : '❌ | Quebro essa peste, deixa eu ver aqui..' })
    }
  }
}
