import DiscordClient from "../utils/client.js";
import BaseEvent from "../utils/structures/base_event.js"
import { ActivityType, Events } from "discord.js";

export default class ReadyEvent extends BaseEvent {

    constructor() {
        super(Events.ClientReady)
    }

    async execute(client: DiscordClient): Promise<void> {
        console.log(`Client logged in as '${client.user?.tag}' with id '${client.user?.id}'`);
    }

}