import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, ContextMenuCommandInteraction, SlashCommandBuilder } from "discord.js";
import BaseCommand from "../../utils/structures/base_command.js";
import DiscordClient from "../../utils/client.js";

export default class Example extends BaseCommand {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("example")
            .setDescription("An example command"),
            10
        )
    }

    async autocomplete(client: DiscordClient, interaction: AutocompleteInteraction<CacheType>): Promise<void> {
        await interaction.respond([{ name: "This command has no autocomplete", value: "This command has no autocomplete"}]);
    }

    async execute(client: DiscordClient, interaction: ChatInputCommandInteraction<CacheType> | ContextMenuCommandInteraction<CacheType>): Promise<void> {
        await interaction.reply("Example reply");
    }

}