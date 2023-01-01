import { Client } from "discord.js";
import * as dotenv from 'dotenv'
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { Player } from "discord-player";

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