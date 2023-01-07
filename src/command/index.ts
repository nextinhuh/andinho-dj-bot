import { Command } from './interface/Command'
import { Meme } from './meme'
import { Phrase } from './phrase'
import { Play } from './music/play'
import { Stop } from './music/stop'
import { Queue } from './music/queue'
import { Pause } from './music/pause'
import { Resume } from './music/resume'
import { Skip } from './music/skip'

export const Commands: Command[] = [
  // music
  Play,
  Pause,
  Resume,
  Skip,
  Stop,
  Queue,

  // others
  Phrase,
  Meme
]
