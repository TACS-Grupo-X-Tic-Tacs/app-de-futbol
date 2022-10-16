import axios from "axios";
import { TelegramBot } from './TelegramBot';

export const comandoEstadisticas = (bot: TelegramBot, apiURL:string) => async (msg, match) => {
  console.log('------> /estadisticas Muestra los partidos creados y jugadores anotados en las últimas horas');
  const chatId = msg.chat.id;

  let resp;

  try {
    let estadisticas: any = await axios.get(apiURL + "/estadisticas").then(response => response.data)

    resp = `En las últimas dos horas, se crearon ${estadisticas.partidosCreados} nuevos, y se anotaron ${estadisticas.jugadoresAnotados} en total`

  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};
