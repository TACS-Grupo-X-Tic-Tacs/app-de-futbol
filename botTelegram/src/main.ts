import axios from "axios";
const TelegramBot = require("node-telegram-bot-api")

async function bootstrap() {

  const token = process.env.BOT_TOKEN;
  const apiURL = process.env.API_URL;

  // Creamos el bot utilizando 'polling' para obtener nuevas actualizaciones
  const bot = new TelegramBot(token, { polling: true, port: 8443 });

  console.log('Bot de Telegram esperando mensajes...');

  // Machea con "/echo [loQueSea]"
  bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' es el mensaje recibido por Telegram
    // 'match' es el resultado de ejecutar la expresión regular anterior en el contenido de texto del mensaje

    const chatId = msg.chat.id;
    const resp = match[1]; //  "loQueSea"

    console.log('MSG:');
    console.log(msg);

    console.log('MATCH:');
    console.log(match);
    // Vuelve a enviar el mensaje "loQueSea" recibido por chat al chatID que lo envio en primer lugar.
    bot.sendMessage(chatId, resp);
  });

  // Machea con "/partidos"
  bot.onText(/\/partidos/, async (msg) => {
    console.log('------> /partidos: Muestra la lista de partidos disponibles.');
    const chatId = msg.chat.id;
    let resp;

    try {
      let partidos: any = await axios.get(apiURL + "/partidos").then(response => response.data)

      console.log("los partidos son")
      console.log(partidos)

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
  });

  // Machea con "/partido idPartido"
  bot.onText(/\/partido (.+)/, async (msg, match) => {
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
  });

  // Machea con "/inscribirme idPartido"
  bot.onText(/\/inscribirme (.+)/, async (msg, match) => {

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

    if (partido === 201) {
      bot.sendMessage(chatId, "felicidades: " + nombreApellido+ " te anotaste al partido correctamente");
    } else {
      bot.sendMessage(chatId, "no se pudo anotar al partido intente mas tarde");
    }
  });

  // Machea con "/inscribirme"
  bot.onText(/^\/inscribirme/, (msg, match) => {

    if(msg.flagMatched) return;

    console.log('------> Muestra la info necesaria para inscribirse.');
    const chatId = msg.chat.id;
    const resp = 'Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono';

    bot.sendMessage(chatId, resp)
  });

  // // Escucha todo tipo de mensajes, hay diferentes tipos.
  // bot.on('message', (msg, match) =>
  // {
  //   let resp = 'Mensaje Generico';

  //   const chatId = msg.chat.id;

  //   bot.sendMessage(chatId, resp)
  // });

  bot.l
}
bootstrap();

//Metada recibida desde el bot:

// {
//   message_id: numbre,
//   from: {
//     id: numbre,
//     is_bot: boolean,
//     first_name: string,
//     last_name: string,
//     username: strin,
//     language_code: string
//   },
//   chat: {
//     id: numbre,
//     first_name: string,
//     last_name: string,
//     username: string,
//     type: string
//   },
//   date: 1663804435 (number),
//   text: '/echo hola', (mensaje recibido, string)
//   entities: [ { offset: 0, length: 5, type: 'bot_command' } ]
// }
