import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv";
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from "./utils/translations.json";
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(
      `\r${gradient(["purple", "pink"])(`Connecting${".".repeat(ponto)}`)}`
    );
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang("pt");
  } else {
    setlang("en");
  }
  if (client.guilds.cache.get("1014921352500756500")) {
    if (
      client.guilds.cache
        .get("1014921352500756500")
        .channels.cache.get("1173960818841354382")
    ) {
      (
        client.guilds.cache
          .get("1014921352500756500")
          .channels.cache.get("1173960818841354382") as TextChannel
      )
        .send({ content: "Hello world" })
        .catch((error) => {});
    } else {
      console.log("...");
    }
  } else {
    console.log(gradient(["red", "orange"])(t("nosvr")));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId("790062369740292108")
    .setType("PLAYING")
    .setURL("https://discord.gg/MGxaUJcj49")
    .setName("☣ JTPlayz Productions")
    .setState("🛠 Running...")
    .setDetails("The best provider of FiveM CAD/MDTs")
    .setAssetsLargeImage(
      "hhttps://cdn.discordapp.com/icons/825739135608029184/d84e03ad2d7d00abbfc1be2ef74e8398.webp?size=240"
    )
    .setAssetsLargeText("JTPlayz Productions")
    .setAssetsSmallImage(
      "https://cdn.discordapp.com/icons/825739135608029184/d84e03ad2d7d00abbfc1be2ef74e8398.webp?size=240"
    )
    .setAssetsSmallText("Join")
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t("join"), "https://discord.gg/MGxaUJcj49");
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(
    gradient(["purple", "pink"])("Your token (Not a bot token)\n» "),
    (input) => {
      if (input.trim() === "") {
        console.log(gradient(["red", "orange"])("this token is empty"));
        process.kill(1);
      } else {
        client.login(input).catch((error) => {
          if (error.message === "An invalid token was provided.") {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(
              gradient(["red", "orange"])(
                `Erro ao fazer login: ${error.message}`
              )
            );
          }
        });
      }
    }
  );
} else {
  console.clear();
  client.login(token).catch((error) => {
    console.clear();
    if (error.message === "An invalid token was provided.") {
      console.log(gradient(["red", "orange"])("Invalid token"));
    } else {
      console.clear();
      console.error(gradient(["red", "orange"])(error.message));
    }
  });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;
