import {
    ClientEvents
} from "discord.js";
import DiscordClient from "../client.js";

export default abstract class BaseEvent {

    public name: keyof ClientEvents;

    constructor(name: keyof ClientEvents) {
        this.name = name;
    }

    abstract execute(client: DiscordClient, ...args: any[]): Promise<void>;

}