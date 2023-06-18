import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandInteraction, ApplicationCommandType } from "discord.js";
import BaseCommand from "../../utils/structures/base_command.js";
import DiscordClient from "../../utils/client.js";

export default class Example extends BaseCommand {

    constructor() {
        super(
            new ContextMenuCommandBuilder()
            .setName("example")
            .setType(ApplicationCommandType.User)
        )
    }

    async autocomplete(client: DiscordClient, interaction: AutocompleteInteraction<CacheType>): Promise<void> {
        await interaction.respond([{ name: "This command has no autocomplete", value: "This command has no autocomplete"}]);
    }

    async execute(client: DiscordClient, interaction: ChatInputCommandInteraction<CacheType> | ContextMenuCommandInteraction<CacheType>): Promise<void> {
        await interaction.reply("Example reply");
    }

}