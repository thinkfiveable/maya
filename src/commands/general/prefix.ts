import { Command } from "discord-akairo";
import { Message, Util } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Colors } from "../../utils";

export default class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      aliases: ["prefix"],
      args: [
        {
          id: "newPrefix",
          type: "string",
      },
      ],
      category: "general",
      description: { content: "Sets or displays the current prefix." },
    });
  }

  async exec(message: Message, { newPrefix }: { newPrefix?: string}) {
    if(newPrefix) {
      newPrefix = Util.escapeMarkdown(newPrefix);
      await this.client.settings.set(message.guild!.id, "prefix", newPrefix);

      return message.channel.send(
        new MessageEmbed()
          .setColor(Colors.BLUE)
          .setDescription(`Sucessfully set this guild's prefix to \`${newPrefix}\``)
      )
    }

    const prefix = await this.client.settings.get(
      message.guild!.id,
      "prefix",
    ) ?? this.client.config.DEFAULT_PREFIX;
    return message.channel.send(
      new MessageEmbed()
        .setColor(Colors.BLUE)
        .setDescription(`This guild uses \`${prefix}\` as a prefix.`)
    );
  }
}
