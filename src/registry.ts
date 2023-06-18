import { promises as fs } from "node:fs";
import path from "node:path";
import { Collection, REST, Routes } from "discord.js";
import DiscordClient from "./utils/client.js";
import BaseCommand from "./utils/structures/base_command.js";
import BaseEvent from "./utils/structures/base_event.js";

export default class Registry {
    
    private client: DiscordClient;

    constructor(client: DiscordClient) {
        this.client = client;
    }

    async commands(dir: string, collection: Collection<string, any>) {
        const contents = await fs.readdir(dir);
        for (const content of contents) {
            const stat = await fs.lstat(path.join(dir, content));
            if (stat.isDirectory()) await this.commands(path.join(dir, content), collection)
            else if (content.endsWith(".ts") || content.endsWith(".js")) {
                const cmd = await import("file://" + path.resolve(path.join(dir, content)));
                const command: BaseCommand = new cmd.default();
                console.log("Registerd command", command.builder.name);
                collection.set(command.builder.name, command);
            }
        }
    }

    async events(dir: string) {
        const contents = await fs.readdir(dir);
        for (const content of contents) {
            const stat = await fs.lstat(path.join(dir, content));
            if (stat.isDirectory()) await this.events(path.join(dir, content))
            else if (content.endsWith(".ts") || content.endsWith(".js")) {
                const evnt = await import("file://" + path.resolve(path.join(dir, content)));
                const event: BaseEvent = new evnt.default();
                this.client.on(event.name, (...args: any[]) => {event.execute(this.client, ...args)});
            }
        }
    }

    async deploy() {
        if (!process.env.token || !process.env.client_id) return;
        let interactions = [];
        for (const [key, value] of this.client.commands) {
            interactions.push(value.JSONBody)
        }
        for (const [key, value] of this.client.contexts) {
            interactions.push(value.JSONBody)
        }
        const rest = new REST().setToken(process.env.token);
        try {
            console.log(`Started refreshing ${interactions.length} interactions.`);
                const data = await rest.put(
                Routes.applicationGuildCommands(process.env.client_id, this.client.config.test_guild),
                { body: interactions },
            );
            // @ts-expect-error
            console.log(`Successfully reloaded ${data.length} interactions.`);
        } catch (error) {
            console.error(error);
        }
    }

}