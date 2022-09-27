import axios from "axios";

export const comandoListarPartidos = (bot, apiURL) => async (msg) => {
  console.log('------> /partidos: Muestra la lista de partidos disponibles.');
  const chatId = msg.chat.id;
  let resp;

  try {
    let partidos: any = await axios.get(apiURL + "/partidos").then(response => response.data)

    console.log("los partidos son")
    console.log(partidos)

    resp = `Los partidos anotados en el sistema son:\n`

    partidos.forEach(partido=> {
      resp = resp + `
      Partido ${partido.id}: 
      Lugar: ${partido.lugar} 
      Fecha y Hora: ${partido.fechaYHora}
      `
      partido.jugadores.forEach((jugador, i) =>{
        resp = resp + `Jugador ${i + 1}. 
            Nombre: ${jugador.nombre} 
            Mail: ${jugador.mail} 
            Telefono: ${jugador.telefono}.
        `;
      })
    });

  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};
