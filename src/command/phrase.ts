import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Phrases } from "../utils/constants";
import { Command } from "./interface/Command";

export const Phrase: Command = {
    name: 'frase',
    description: 'Frase motivacionais do andinho.',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = Phrases[Math.floor(Math.random() * Phrases.length)];

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};