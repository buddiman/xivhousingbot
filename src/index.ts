import { Bot } from "grammy";
import {handleListCommand} from "./commands";
import dotenv from 'dotenv';

dotenv.config()

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("list", async (ctx) => {
    const message = await handleListCommand(ctx)
    await ctx.reply(message)
})

bot.start();