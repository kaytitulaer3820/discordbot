import { configDotenv } from "dotenv";
import DiscordClient from "./utils/client.js";
import Registry from "./registry.js";
import { ActivityType } from "discord.js";


(async () => {

    configDotenv();

    const client = new DiscordClient({
        intents: [
            "Guilds",
            "DirectMessages",
            "GuildMembers",
            "MessageContent",
            "AutoModerationConfiguration",
            "AutoModerationExecution"
        ]
    });

    const registry = new Registry(client);
    await registry.commands("./build/src/interactions/commands", client.commands);
    await registry.commands("./build/src/interactions/contexts", client.contexts);
    await registry.events("./build/src/events");
    await registry.deploy();

    await client.login(process.env.token);

})();