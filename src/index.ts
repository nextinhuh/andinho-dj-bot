import * as dotenv from 'dotenv'
import { Client } from "discord.js";
import ready from "./listeners/ready";
import { Player } from "discord-player";
import interactionCreate from "./listeners/interactionCreate";

dotenv.config();

const client = new Client({
    intents: [
        'Guilds',
        'GuildVoiceStates'
    ]
});
const clientPlayer = new Player(client);

ready(client);
interactionCreate(client, clientPlayer);

client.login(process.env.DISCORD_TOKEN);