
import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";
import {TelegramBot} from "./TelegramBot";

export const comandoListarPartidos = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg) => {
  console.log('------> /partidos: Muestra la lista de partidos disponibles.');
  const chatId = msg.chat.id;
  let resp;

  try {
    let partidos: any = await repo.pedirPartidos()

    resp = `Los partidos son los siguientes:
      
      `
    let m = partidos.length;
    let j = 0;

    while (j < m) {
      resp = resp + `
        Partido ${partidos[j].id}: 
        Lugar: ${partidos[j].lugar} 
        Fecha y Hora: ${partidos[j].fechaYHora}
        `

      let n = partidos[j].jugadores.length;
      let i = 0;
      while (i < n) {
        resp = resp + `Jugador ${i + 1}. 
            Nombre: ${partidos[j].jugadores[i].nombre} 
            Mail: ${partidos[j].jugadores[i].mail} 
            Telefono: ${partidos[j].jugadores[i].telefono}.
        `;
        i++;
      }

      j++;
    }


  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};
