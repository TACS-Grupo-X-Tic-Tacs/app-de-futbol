import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";
import {TelegramBot} from "./TelegramBot";

export const comandoListarPartidos = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg) => {
  console.log('------> /partidos: Muestra la lista de partidos disponibles.');
  const chatId = msg.chat.id;
  let resp;

  try {
    let partidos: any = await repo.pedirPartidos()

    console.log("los partidos son")
    console.log(partidos)

    resp = `Los partidos anotados en el sistema son:\n`

    partidos.forEach(partido=> {
      resp = resp + formatearDatosDePartidoListarPartidos(partido)

      partido.jugadores.forEach((jugador, i) =>{
        resp = resp + formatearDatosDeJugadorListarPartidos(i + 1, jugador)
      })
    });

  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};


export function formatearDatosDePartidoListarPartidos(partido) {
  return `
        Identificador del partido: ${partido.id} 
        Lugar: ${partido.lugar} 
        Fecha y Hora: ${partido.fechaYHora}
        `;
}

export function formatearDatosDeJugadorListarPartidos(numeroJugador: number, jugador: any) {
  return `Jugador ${numeroJugador}. 
            Nombre: ${jugador.nombre} 
            Mail: ${jugador.mail} 
            Telefono: ${jugador.telefono}.
        `;
}
