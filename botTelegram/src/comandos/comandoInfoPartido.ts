
import {errorMessage, TelegramBot, TelegramMessage} from "./TelegramBot";
import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";

export const comandoInfoPartido = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg: TelegramMessage, match) => {
  console.log('------> /partido id: Muestra la informacion del partido.');
  const chatId = msg.chat.id;

  let idPartido = match[1];
  let resp;

  try {
    let partido: any = await repo.pedirPartido(idPartido)
    resp = datosDeUnPartidoFormateados(idPartido, partido)

    let n = partido.jugadores.length;
    let numeroJugador = 0;
    while (numeroJugador < n) {
      resp = resp + datosDeUnJugadorFormateados(numeroJugador, partido);
      numeroJugador++;
    }

  } catch (e) {
    resp = errorMessage(e);
  }

  bot.sendMessage(chatId, resp);
};

export function datosDeUnPartidoFormateados(idPartido, partido: {lugar: string, fechaYHora: string}) {
  return `Los datos del partido ${idPartido} son: 
    Lugar: ${partido.lugar} 
    Fecha y Hora: ${partido.fechaYHora}
    `;
}

export function datosDeUnJugadorFormateados(indiceJugador: number, partido: { jugadores: {nombre: string, mail: string, telefono: string}[] }) {
  return `Jugador ${indiceJugador + 1}. 
        Nombre: ${partido.jugadores[indiceJugador].nombre} 
        Mail: ${partido.jugadores[indiceJugador].mail} 
        Telefono: ${partido.jugadores[indiceJugador].telefono}.
    `;
}
