import { Queue } from 'discord-player'
import { EmbedBuilder } from 'discord.js'

interface EmbedCustomProps {
  typeEmbed: 'musicPlay' | 'musicStop' | 'musicSkip' | 'musicAdd' | 'musicEnd' | 'musicPause' | 'musicResume' | 'queueEnded' | 'disconnectBot' | 'notMusicSkip'
  queueProps: Queue<any>
}

export function EmbedCustomBuild ({ typeEmbed, queueProps }: EmbedCustomProps): EmbedBuilder {
  switch (typeEmbed) {
    case 'musicPlay':
      // on start music player
      const currentSong = queueProps.current
      return new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Tocando agora!')
        .setThumbnail(currentSong.thumbnail)
        .addFields({
          name: 'To tocando esse carai! Me agunei não 🤬',
          value:
          `🔊 ${currentSong.title}` +
          `⌚ Duração: ${currentSong.duration} \n` +
          `⛓ Url: ${currentSong.url} \n` +
          `👁 Views: ${currentSong.views} \n`,
          inline: true
        })
        .setFooter({
          text: `Música pedida por ${currentSong.requestedBy.username}`,
          iconURL: `https://cdn.discordapp.com/avatars/${currentSong.requestedBy.id}/${currentSong.requestedBy.avatar}.png`
        })
      break
    case 'musicAdd':
      // on add new track in queue
      const addSong = queueProps.tracks[queueProps.tracks.length - 1]
      return new EmbedBuilder()
        .setColor('#00FFFF')
        .setTitle('Musica adicionada a fila')
        .setThumbnail(addSong.thumbnail)
        .addFields({
          name: 'Encontrei essa bomba aqui, espero que seja ela em ! 🤬',
          value:
            `🔊 ${addSong.title} \n` +
            `⌚ Duração: ${addSong.duration} \n` +
            `⛓ Url: ${addSong.url} \n` +
            `👁 Views: ${addSong.views} \n`,
          inline: true
        })
        .setFooter({
          text: `Música pedida por ${addSong.requestedBy.username}`,
          iconURL: `https://cdn.discordapp.com/avatars/${addSong.requestedBy.id}/${addSong.requestedBy.avatar}.png`
        })
      break
    case 'musicSkip':
      // on skiped track
      return new EmbedBuilder()
        .setColor('#00BFFF')
        .setTitle('Pulando para a proxima!')
      break
    case 'musicPause':
      // on pause music player
      const pausedSong = queueProps.current
      return new EmbedBuilder()
        .setColor('#FF1493')
        .setTitle('Musica pausada!')
        .setThumbnail(pausedSong.thumbnail)
        .addFields({
          name: 'Pronto ta pausado essa mizera!',
          value:
          `🔊 ${pausedSong.title}\n` +
          `⌚ Duração: ${pausedSong.duration} \n` +
          `⛓ Url: ${pausedSong.url} \n` +
          `👁 Views: ${pausedSong.views} \n`,
          inline: true
        })
        .setFooter({
          text: `Música pedida por ${pausedSong.requestedBy.username}`,
          iconURL: `https://cdn.discordapp.com/avatars/${pausedSong.requestedBy.id}/${pausedSong.requestedBy.avatar}.png`
        })
      break
    case 'musicResume':
      // on resume track in queue
      const resumeSong = queueProps.previousTracks[queueProps.previousTracks.length - 1]
      return new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('▶ | Voltando a tocar')
        .setThumbnail(resumeSong.thumbnail)
        .addFields({
          name: 'Encontrei essa bomba aqui, espero que seja ela em ! 🤬',
          value:
            `🔊 ${resumeSong.title} \n` +
            `⌚ Duração: ${resumeSong.duration} \n` +
            `⛓ Url: ${resumeSong.url} \n` +
            `👁 Views: ${resumeSong.views} \n`,
          inline: true
        })
        .setFooter({
          text: `Música pedida por ${resumeSong.requestedBy.username}`,
          iconURL: `https://cdn.discordapp.com/avatars/${resumeSong.requestedBy.id}/${resumeSong.requestedBy.avatar}.png`
        })
      break
    case 'musicStop':
      // on stop music player
      return new EmbedBuilder()
        .setColor('#B22222')
        .setTitle('🛑 | Parei esse carai !')
      break
    case 'queueEnded':
      // on ended queue
      return new EmbedBuilder()
        .setColor('#00FFFF')
        .setTitle('🎶 | Toquei sua música, então se lasque...')
      break
    case 'disconnectBot':
      // on ended queue
      return new EmbedBuilder()
        .setColor('#B22222')
        .setTitle('✔ | Terminei sa bosta, e va pa porra!')
      break
    case 'notMusicSkip':
      // on ended queue
      return new EmbedBuilder()
        .setColor('#B22222')
        .setTitle('❌ | Pular pra onde seu corno ? tem nada aqui não!')
      break
    default:
      return new EmbedBuilder()
        .setColor('#B22222')
        .setTitle('Coloque alguma coisa!')
      break
  }
}
