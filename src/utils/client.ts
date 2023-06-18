import { Client, ClientOptions, Collection } from "discord.js";
import config from "../../config.js";
import BaseCommand from "./structures/base_command.js";

export default class DiscordClient extends Client {

    public commands: Collection<string, BaseCommand>= new Collection();
    public contexts: Collection<string, BaseCommand> = new Collection();
    public events: Collection<string, any> = new Collection();

    public config = config;

    public cooldowns: Collection<string, Collection<string, number>> = new Collection();

    private startTime: number;

    constructor(options: ClientOptions) {
        super(options);
        const date = new Date();
        this.startTime = date.getTime();
    }

    get uptime() {
        const date = new Date().getTime();
        return date - this.startTime;
    }

}