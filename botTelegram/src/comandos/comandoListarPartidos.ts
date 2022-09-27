import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";
import {TelegramBot} from "./TelegramBot";

export const comandoListarPartidos = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg) => {
  console.log('------> /partidos: Muestra la lista de partidos disponibles.');
  const chatId = msg.chat.id;
  let resp;

  try {
    let partidos: any = await repo.pedirPartidos()

    resp = `Los partidos son los siguientes:\n\n`
    let m = partidos.length;
    let j = 0;

    while (j < m) {
      let partido = partidos[j];
      resp = resp + formatearDatosDePartidoListarPartidos(partido)

      let n = partido.jugadores.length;
      let i = 0;
      while (i < n) {
        let jugador = partido.jugadores[i];
        let numeroJugador = i + 1;
        resp = resp + formatearDatosDeJugadorListarPartidos(numeroJugador, jugador);
        i++;
      }

      j++;
    }


  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};


export function formatearDatosDePartidoListarPartidos(partido) {
  return `
        Partido ${partido.id}: 
        Lugar: ${partido.lugar} 
        Fecha y Hora: ${partido.fechaYHora}
        `;
}

export function formatearDatosDeJugadorListarPartidos(numeroJugador: number, jugador: {nombre: string, mail: string, telefono: string}) {
  return `Jugador ${numeroJugador}. 
            Nombre: ${jugador.nombre} 
            Mail: ${jugador.mail} 
            Telefono: ${jugador.telefono}.
        `;
}
