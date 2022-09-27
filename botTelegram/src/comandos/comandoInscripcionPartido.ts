import axios from "axios";
import {TelegramBot, TelegramMessage} from "./TelegramBot";
import {RepositorioDePartidos} from "../repositorios/repositorioDePartidos";

export const comandoInscripcionPartido = (bot: TelegramBot, repo: RepositorioDePartidos) => async (msg: TelegramMessage, match) => {

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
  let partido: any = await repo.inscribirseAPartido(idPartido, {telefono, mail, nombre: nombreApellido})

  // resp= ´No se encontró el partido de id ${idPartido}´;
  // resp= 'Ya se ha completado el cupo de jugadores para este partido.';

  if (partido === 201) {
    bot.sendMessage(chatId, "felicidades: " + nombreApellido + " te anotaste al partido correctamente");
  } else {
    bot.sendMessage(chatId, "no se pudo anotar al partido intente mas tarde");
  }
};
