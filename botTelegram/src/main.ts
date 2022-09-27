import {comandoEcho} from "./comandos/echo";
import {comandoListarPartidos} from "./comandos/comandoListarPartidos";
import {comandoInfoPartido} from "./comandos/comandoInfoPartido";
import {comandoInscripcionPartido} from "./comandos/comandoInscripcionPartido";
import {comandoAyuda} from "./comandos/comandoAyuda";
import {comandoEstadisticas} from "./comandos/comandoEstadisticas";
import { comandoCrearPartido } from "./comandos/comandoCrearPartido";

const TelegramBot = require("node-telegram-bot-api")

  async function bootstrap() {

  const token = process.env.BOT_TOKEN;
  const apiURL = process.env.API_URL;

  // Creamos el bot utilizando 'polling' para obtener nuevas actualizaciones
  const bot = new TelegramBot(token, { polling: true, port: 8443 });

  console.log('Bot de Telegram esperando mensajes...');

  // Machea con "/echo [loQueSea]"
  bot.onText(/\/echo (.+)/, comandoEcho(bot));

  // Machea con "/partidos"
  bot.onText(/\/partidos/, comandoListarPartidos(bot,apiURL));

  // Machea con "/crearPartido"
  bot.onText(/\/crearPartido (.+)/, comandoCrearPartido(bot,apiURL));

  // Machea con "/partido idPartido"
  bot.onText(/\/partido (.+)/, comandoInfoPartido(bot, apiURL));

  // Machea con "/inscribirme idPartido"
  bot.onText(/\/inscribirme (.+)/, comandoInscripcionPartido(bot,apiURL));

  // Machea con "/inscribirme"
  bot.onText(/^\/ayuda/, comandoAyuda(bot));

  // Machea con "/estadisticas"
  bot.onText(/\/estadisticas/, comandoEstadisticas(bot,apiURL));
}
bootstrap();

