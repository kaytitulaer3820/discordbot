import {
    SlashCommandBuilder,
    ContextMenuCommandBuilder,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    AutocompleteInteraction
} from "discord.js";
import DiscordClient from "../client.js";
import config from "../../../config.js";

export default abstract class BaseCommand {

    public builder: SlashCommandBuilder | ContextMenuCommandBuilder;
    public JSONBody: RESTPostAPIChatInputApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody;
    public cooldown: number;

    constructor(builder: SlashCommandBuilder | ContextMenuCommandBuilder, cooldown?: number) {
        this.builder = builder;
        this.JSONBody = builder.toJSON();
        this.cooldown = cooldown || config.default_cooldown_length;
    }

    abstract autocomplete(client: DiscordClient, interaction: AutocompleteInteraction): Promise<void>;

    abstract execute(client: DiscordClient, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction): Promise<void>;

}