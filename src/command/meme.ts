import { Memes } from '../utils/constants'
import { Command } from './interface/Command'
import { CommandInteraction, Client, ApplicationCommandType, EmbedBuilder } from 'discord.js'

export const Meme: Command = {
  name: 'meme',
  description: 'Memes do Andinho.',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = Memes[Math.floor(Math.random() * Memes.length)]

    await interaction.followUp({
      ephemeral: true,
      embeds: [new EmbedBuilder().setColor('Blue').setTitle(content.text).setImage(content.photoUrl)]
    })
  }
}
