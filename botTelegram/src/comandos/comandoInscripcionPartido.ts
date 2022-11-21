import {errorMessage, TelegramBot, TelegramMessage} from "./TelegramBot";
import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";

export const comandoInscripcionPartido = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg: TelegramMessage, match) => {

  msg.flagMatched = true;
  const chatId = msg.chat.id;

  console.log('------>/inscribirme CUERPO');

  let parametros = match[1].split(',');

  if (parametros.length != 4) {
    bot.sendMessage(chatId,
      `FORMATO INVALIDO:\n Para inscribirse debe enviar sus datos con el siguiente formato: "/inscribirme idPartido,nombre y apellido,mail,telefono".
      Por ejemplo: /inscribirme 5,Pepe Rodriguez,peperodriguez@mail.com,112374637`
    );
    return
  }
  let [idPartido, nombreApellido, mail, telefono] = parametros

  await repo.inscribirseAPartido(idPartido, {telefono, mail, nombre: nombreApellido})
    .then(() =>{
    bot.sendMessage(chatId, `¡Felicidades ${nombreApellido}! te anotaste al partido correctamente`);
  }).catch((e) => {
      bot.sendMessage(chatId, errorMessage(e));
  })
};
