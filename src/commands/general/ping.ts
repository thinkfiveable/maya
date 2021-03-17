import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Colors } from "../../utils";

export default class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "pong", "latency"],
      category: "general",
      description: { content: "Checks the latency of the bot." },
      cooldown: 15000,
    });
  }

  async exec(message: any) {
    const pong = await message.channel.send("Pong!");
    const latency =
      (pong.editedTimestamp || pong.createdTimestamp) -
      (message.editedTimestamp || message.createdTimestamp);

    const pingEmbed = new MessageEmbed()
      .setColor(Colors.BLANK)
      .setDescription(
        `🏓 **Gateway Ping:** ${latency.toString()}ms\n🔄 **API Ping:** ${Math.round(
          this.client.ws.ping
        ).toString()}ms`
      );

    pong.delete();
    return message.channel.send(pingEmbed);
  }
}
