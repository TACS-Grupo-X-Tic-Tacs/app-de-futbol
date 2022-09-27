import axios from "axios";

export const comandoInfoPartido = (bot, apiURL) => async (msg, match) => {
  console.log('------> /partido id: Muestra la informacion del partido.');
  const chatId = msg.chat.id;

  let idPartido = match[1];
  let resp;

  try {
    let partido: any = await axios.get(apiURL + "/partidos/" + idPartido).then(response => response.data)

    resp = `Los datos del partido ${idPartido} son: 
    Lugar: ${partido.lugar} 
    Fecha y Hora: ${partido.fechaYHora}
    `

    let n = partido.jugadores.length;
    let i = 0;
    while (i < n) {
      resp = resp + `Jugador ${i + 1}. 
        Nombre: ${partido.jugadores[i].nombre} 
        Mail: ${partido.jugadores[i].mail} 
        Telefono: ${partido.jugadores[i].telefono}.
    `;
      i++;
    }

  } catch (e) {
    resp = e.message;
  }

  bot.sendMessage(chatId, resp);
};
