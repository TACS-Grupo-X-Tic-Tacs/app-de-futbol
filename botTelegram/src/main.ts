import {comandoEcho} from "./comandos/echo";
import {comandoListarPartidos} from "./comandos/comandoListarPartidos";
import {comandoInfoPartido} from "./comandos/comandoInfoPartido";
import {comandoInscripcionPartido} from "./comandos/comandoInscripcionPartido";
import {comandoAyuda} from "./comandos/comandoAyuda";
import {comandoEstadisticas} from "./comandos/comandoEstadisticas";
import {comandoCrearPartido} from "./comandos/comandoCrearPartido";
import {RepoDePartidosQueLePegaALaAPI} from "./repositorios/repositorioDePartidos";

const TelegramBot = require("node-telegram-bot-api")

  async function bootstrap() {

  const token = process.env.BOT_TOKEN;

  // Creamos el bot utilizando 'polling' para obtener nuevas actualizaciones
  const bot = new TelegramBot(token, { polling: true, port: process.env.PORT || 8443 });
  const repoPartidos = new RepoDePartidosQueLePegaALaAPI();

  console.log('Bot de Telegram esperando mensajes...');

  // Machea con "/echo [loQueSea]"
  bot.onText(/\/echo (.+)/, comandoEcho(bot));

  // Machea con "/partidos"
  bot.onText(/\/partidos/, comandoListarPartidos(bot, repoPartidos));

  // Machea con "/crearPartido"
  bot.onText(/\/crearPartido (.+)/, comandoCrearPartido(bot,process.env.API_URL)); //TODO: Pasarle el repo

  // Machea con "/partido idPartido"
  bot.onText(/\/partido (.+)/, comandoInfoPartido(bot, repoPartidos));

  // Machea con "/inscribirme idPartido"
  bot.onText(/\/inscribirme (.+)/, comandoInscripcionPartido(bot, repoPartidos));

  // Machea con "/inscribirme"
  bot.onText(/^\/ayuda/, comandoAyuda(bot));

  // Machea con "/estadisticas"
  bot.onText(/\/estadisticas/, comandoEstadisticas(bot,process.env.API_URL)); //TODO: Pasarle el repo
}
bootstrap();

