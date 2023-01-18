import { Commands } from '../command'
import { Player, Queue } from 'discord-player'
import { CommandInteraction, Client, Interaction } from 'discord.js'
import { EmbedCustomBuild } from '../command/music/music-message-embed'

export default (client: Client, clientPlayer: Player): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction, clientPlayer)
    }
  })

  // create event when music start
  clientPlayer.on('trackStart', (queue: Queue<any>) => {
    queue.metadata.channel.send({
      embeds: [EmbedCustomBuild({
        typeEmbed: 'musicPlay',
        queue
      })]
    })
  })

  // create event when add music in queue
  clientPlayer.on('trackAdd', (queue: Queue<any>) => {
    queue.metadata.channel.send({
      embeds: [EmbedCustomBuild({
        typeEmbed: 'musicAdd',
        queue
      })]
    })
  })

  // create event when disconnect bot
  clientPlayer.on('botDisconnect', (queue: Queue<any>) => {
    queue.metadata.channel.send({
      embeds: [EmbedCustomBuild({
        typeEmbed: 'disconnectBot',
        queue
      })]
    })
  })

  // create event when music end
  clientPlayer.on('queueEnd', (queue: Queue<any>) => {
    queue.metadata.channel.send({
      embeds: [EmbedCustomBuild({
        typeEmbed: 'queueEnded',
        queue
      })]
    })
  })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, clientPlayer: Player): Promise<void> => {
  // handle slash command here
  const slashCommand = Commands.find(c => c.name === interaction.commandName)
  if (slashCommand == null) {
    await interaction.reply('Ocorreu um erro ao carregar os camandos de barra!')
    return
  }

  await interaction.deferReply()

  await slashCommand.run(client, interaction, clientPlayer)
}
