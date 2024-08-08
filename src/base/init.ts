// Taro
// Developed by Yaroslav Volkivskyi (TheLaidSon)

// Actual v0.9.2 Beta

// Initialization File

import { Telegraf } from "telegraf";
import { createClient } from "redis";
import initWeb from "./init/initWeb";
import connectMongodb from "./init/mongoConnect";
import dotenv from "dotenv";

dotenv.config();

export default async function init() {
  console.log(`\n\n  Taro v0.9.2 Beta\n\n   Developed by Yaroslav Volkivskyi (TheLaidSon)\n\n`)
  console.log("Creating redis client...");
  const redis = createClient();
  redis.on("error", (err) => console.log("Redis Client Error", err));
  console.log("Done");

  console.log("Connecting to redis server...");
  await redis.connect();
  console.log("Done");

  console.log("Creating telegraf bot instanse...");
  const bot = new Telegraf(process.env.TOKEN ?? '');
  console.log("Done");
  const mongo = await connectMongodb(),
    webApp = await initWeb(Boolean(process.env.LAN));

  bot.use(async (ctx, next) => {
    const originalReply = ctx.reply;

    ctx.reply = async (text: string, extra?: any) => {
      let finalExtra = { ...extra, parse_mode: 'HTML' };
      if (extra && !extra.reply_markup) {
        finalExtra.reply_markup = { remove_keyboard: true };
      }
      return originalReply.call(ctx, text, finalExtra);
    };

    await next();
  })

  // wrap redis with helper functions
  const wRedis = ({
    getAll: (id: number) => async () => redis.hGetAll(`${id}`),
    getAllKeys: async () => redis.keys('*'),
    get: (id: number) => async (property: string) => await redis.hGet(`${id}`, property),
    set: (id: number) => (property: string) => async (new_value: string) => await redis.hSet(`${id}`, property, new_value)
  })

  return [bot, wRedis, mongo, webApp] as const;
}