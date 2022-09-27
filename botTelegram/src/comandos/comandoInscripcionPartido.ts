import axios from "axios";

export const comandoInscripcionPartido = (bot, apiURL) => async (msg, match) => {

  msg.flagMatched = true;
  const chatId = msg.chat.id;

  console.log('------>/inscribirme CUERPO');

  let parametros = match[1].split(',');

  if (parametros.length != 4) {
    bot.sendMessage(chatId,
      `FORMATO INVALIDO:\n Para inscribirse debe enviar sus datos con el siguiente formato: "/inscribirse idPartido,nombre y apellido,mail,telefono".
      Por ejemplo: /inscribirse 5,Pepe Rodriguez,peperodriguez@mail.com,112374637`
    );
    return
  }
  
  let [idPartido, nombreApellido, mail, telefono] = parametros
  let partido: any = await axios.post(apiURL + "/partidos/" + idPartido + "/jugadores", {
    telefono,
    mail,
    nombre: nombreApellido
  }).then(response => response.status)

  // resp= ´No se encontró el partido de id ${idPartido}´;
  // resp= 'Ya se ha completado el cupo de jugadores para este partido.';

  if (partido === 200) {
    bot.sendMessage(chatId, `¡Felicidades ${nombreApellido}! te anotaste al partido correctamente`);
  } else {
    bot.sendMessage(chatId, "No se pudo anotar al partido, intente más tarde");
  }
};
