import { Command } from '../interface/Command'
import { Player, QueryType } from 'discord-player'
import { CommandInteraction, Client, GuildMember, ApplicationCommandOptionType } from 'discord.js'

export const Play: Command = {
  name: 'play',
  description: 'Escute uma música do AndinhoDJ!',
  options: [{
    name: 'url',
    description: 'link da música',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client: Client, interaction: CommandInteraction, clientPlayer: Player) => {
    const { value: musicUrl } = interaction.options.data[0]
    const member: GuildMember = interaction.member as GuildMember

    // search the track/playlist
    const searchResult = await clientPlayer
      .search(String(musicUrl), {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      })
      .catch((err) => {
        console.log('Error when search track/playlist: ', err)
      })

    // send feedback if not found
    if ((searchResult == null) || (searchResult.tracks.length === 0)) return await interaction.followUp({ content: '❌ | Eu não achei o carai dessa música não, arrombado!' })

    // send feedback if member is not in same channel
    if (!member.voice.channelId) return await interaction.reply({ content: 'Oxi, e eu vou tocar pra ninguém, é ?!', ephemeral: true })

    // send feedback if found
    await interaction.followUp({
      content: `⏱ | Deixe eu botar ${searchResult.playlist ? 'sua playlist' : 'sua música'} no pen drive carai, espera ai.. !`
    })

    if (interaction.guild != null) {
      // create the track queue
      const queue = clientPlayer.createQueue(interaction.guild, {
        ytdlOptions: {
          filter: 'audioonly',
          highWaterMark: 1 << 30,
          dlChunkSize: 0
        },
        metadata: {
          channel: interaction.channel
        }
      })

      // verify voice chanel connection
      try {
        if (!queue.connection) await queue.connect(member.voice.channelId)
      } catch {
        clientPlayer.deleteQueue(interaction.guild.id)
        return await interaction.followUp({ content: 'Deixe eu entrar nessa peste homi!' })
      }

      // add track(s) to queue
      (searchResult.playlist != null) ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])

      // starts the queue
      if (!queue.playing) {
        await queue.play()
      }
    }
  }
}
