import axios from "axios";

export const comandoInscripcionPartido = (bot, apiURL) => async (msg, match) => {

  msg.flagMatched = true;

  console.log('------>/inscribirme CUERPO');

  let parametros = match[1].split(',');
  let idPartido = parametros[0];
  let nombreApellido = parametros[1];
  let mail = parametros[2];
  let telefono = parametros[3];

  const chatId = msg.chat.id;

  if (parametros.length != 4) {
    bot.sendMessage(chatId,
      'FORMATO INVALIDO -> Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono'
    );
    return
  }
  let partido: any = await axios.post(apiURL + "/partidos/" + idPartido + "/jugadores", {
    telefono,
    mail,
    nombre: nombreApellido
  }).then(response => response.status)

  // resp= ´No se encontró el partido de id ${idPartido}´;
  // resp= 'Ya se ha completado el cupo de jugadores para este partido.';

  if (partido === 200) {
    bot.sendMessage(chatId, "felicidades: " + nombreApellido + " te anotaste al partido correctamente");
  } else {
    bot.sendMessage(chatId, "no se pudo anotar al partido intente mas tarde");
  }
};
