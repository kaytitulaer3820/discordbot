import { Collection, Events, Interaction } from "discord.js";
import BaseEvent from "../utils/structures/base_event.js";
import DiscordClient from "../utils/client.js";

export default class InteractionCreateEvent extends BaseEvent {

    constructor() {
        super(Events.InteractionCreate);
    }

    async execute(client: DiscordClient, interaction: Interaction): Promise<void> {
        
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply({ content: "This interaction does not seem to exist. This has been reported to the developers and will be fixed as soon as possible.", ephemeral: true });
                return;
            }

            if (!client.cooldowns.has(command.builder.name)) {
                client.cooldowns.set(command.builder.name, new Collection());
            }
            
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.builder.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
            
            if (timestamps && timestamps.has(interaction.user.id)) {
                // @ts-ignore this is already checked for and this error is bullshit
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    await interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.builder.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                    return;
                }
            }

            // @ts-ignore
            timestamps.set(interaction.user.id, now);
            // @ts-ignore
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                command.execute(client, interaction);
            } catch (error) {
                console.log(error);
                if (interaction.replied) interaction.reply({ content: "I encountered an error while executing this interaction. This has been reported to the developers and will  be fixed as soon as possible.", ephemeral: true });
                else interaction.followUp({ content: "I encountered an error while executing this interaction. This has been reported to the developers and will  be fixed as soon as possible.", ephemeral: true });
            }

        }

        if (interaction.isContextMenuCommand()) {

            const context = client.contexts.get(interaction.commandName);

            if (!context) {
                interaction.reply({ content: "This interaction does not seem to exist. This has been reported to the developers and will be fixed as soon as possible.", ephemeral: true });
                return;
            }

            if (!client.cooldowns.has(context.builder.name)) {
                client.cooldowns.set(context.builder.name, new Collection());
            }
            
            const now = Date.now();
            const timestamps = client.cooldowns.get(context.builder.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (context.cooldown ?? defaultCooldownDuration) * 1000;
            
            if (timestamps && timestamps.has(interaction.user.id)) {
                // @ts-ignore this is already checked for and this error is bullshit
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    await interaction.reply({ content: `Please wait, you are on a cooldown for \`${context.builder.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                    return;
                }
            }

            // @ts-ignore
            timestamps.set(interaction.user.id, now);
            // @ts-ignore
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                context.execute(client, interaction);
            } catch (error) {
                console.log(error);
                if (interaction.replied) interaction.reply({ content: "I encountered an error while executing this interaction. This has been reported to the developers and will  be fixed as soon as possible.", ephemeral: true });
                else interaction.followUp({ content: "I encountered an error while executing this interaction. This has been reported to the developers and will  be fixed as soon as possible.", ephemeral: true });
            }

        }

        if (interaction.isAutocomplete()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) {
                return;
            }

            try {
                command.autocomplete(client, interaction);
            } catch (error) {
                console.log(error);
            }

        }

    }

}