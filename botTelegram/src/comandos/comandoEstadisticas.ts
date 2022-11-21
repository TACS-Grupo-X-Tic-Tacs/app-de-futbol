import axios from "axios";
import {errorMessage, TelegramBot} from './TelegramBot';

export const comandoEstadisticas = (bot: TelegramBot, apiURL:string) => async (msg, match) => {
  console.log('------> /estadisticas Muestra los partidos creados y jugadores anotados en las últimas horas');
  const chatId = msg.chat.id;

  let resp;

  try {
    let estadisticas: any = await axios.get(apiURL + "/estadisticas").then(response => response.data)

    resp = `En las últimas dos horas, se crearon ${estadisticas.partidosCreados} partidos nuevos, y se anotaron ${estadisticas.jugadoresAnotados} jugadores en total`

  } catch (e) {
    resp = errorMessage(e);
  }

  bot.sendMessage(chatId, resp);
};
