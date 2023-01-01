import { Command } from "./interface/Command";
import { Meme } from "./meme";
import { Phrase } from "./phrase";
import { Play } from "./music/play";
import { Stop } from "./music/stop";
import { Queue } from "./music/queue";
import { Pause } from "./music/pause";
import { Resume } from "./music/resume";
import { Skip } from "./music/skip";

export const Commands: Command[] = [Phrase, Meme, Play, Stop, Queue, Pause, Resume, Skip];