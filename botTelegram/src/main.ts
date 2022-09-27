import {comandoEcho} from "./comandos/echo";
import {comandoListarPartidos} from "./comandos/comandoListarPartidos";
import {comandoInfoPartido} from "./comandos/comandoInfoPartido";
import {comandoInscripcionPartido} from "./comandos/comandoInscripcionPartido";
import {comandoInfoInscripcion} from "./comandos/comandoInfoInscripcion";
import {RepoDePartidosQueLePegaALaAPI} from "./repositorios/repositorioDePartidos";

const TelegramBot = require("node-telegram-bot-api")

  async function bootstrap() {

  const token = process.env.BOT_TOKEN;

  // Creamos el bot utilizando 'polling' para obtener nuevas actualizaciones
  const bot = new TelegramBot(token, { polling: true, port: 8443 });
  const repoPartidos = new RepoDePartidosQueLePegaALaAPI();

  console.log('Bot de Telegram esperando mensajes...');

  // Machea con "/echo [loQueSea]"
  bot.onText(/\/echo (.+)/, comandoEcho(bot));

  // Machea con "/partidos"
  bot.onText(/\/partidos/, comandoListarPartidos(bot, repoPartidos));

  // Machea con "/partido idPartido"
  bot.onText(/\/partido (.+)/, comandoInfoPartido(bot, repoPartidos));

  // Machea con "/inscribirme idPartido"
  bot.onText(/\/inscribirme (.+)/, comandoInscripcionPartido(bot, repoPartidos));

    // Machea con "/inscribirme"
  bot.onText(/^\/inscribirme/, comandoInfoInscripcion(bot));
}
bootstrap();

