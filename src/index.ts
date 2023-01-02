import * as dotenv from 'dotenv'
import { Client } from 'discord.js'
import { Player } from 'discord-player'

import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'

dotenv.config()

const client = new Client({
  intents: [
    'Guilds',
    'GuildVoiceStates'
  ]
})
const clientPlayer = new Player(client)

ready(client)
interactionCreate(client, clientPlayer)

void client.login(process.env.DISCORD_TOKEN)
