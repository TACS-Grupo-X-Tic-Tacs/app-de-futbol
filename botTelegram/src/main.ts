async function bootstrap() {

  const TelegramBot = require('node-telegram-bot-api');

  const token = '5476709500:AAE5wnInHHynv3-5eb0N4bROnjS7rfLHJvg';

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
  bot.onText(/\/partidos/, (msg) => {
    console.log('------> /partidos: Muestra la lista de partidos disponibles.');
    const chatId = msg.chat.id;
    let resp;

    try
    {
      //TODO: Integrar con metodos de API REST.
      let partidos = [{ id: "5", fechaYHora: "2020-07-01 15:00", lugar: "la canchita",
      jugadores:  [
        {telefono: '03030456',mail: 'juancarlosvillanueva@gmail.com', nombre: 'Juan Carlos Villanueva'},
        {telefono: '123123',mail: '123123@gmail.com', nombre: '123123'}
      ], creadoEl: new Date(2022, 8, 5)},

      { id: "55", fechaYHora: "2020-07-01 15:00", lugar: "el pastito",
      jugadores:  [
        {telefono: '1111',mail: '111@gmail.com', nombre: '111'},
        {telefono: '222',mail: '222@gmail.com', nombre: '222'}
      ], creadoEl: new Date(2022, 8, 5)}]

      resp = `Los partidos son los siguientes:
      
      `
      let m=partidos.length;
      let j=0;

      while(j<m)
      {
        resp = resp + `
        Partido ${partidos[j].id}: 
        Lugar: ${partidos[j].lugar} 
        Fecha y Hora: ${partidos[j].fechaYHora}
        `

        let n= partidos[j].jugadores.length;
        let i=0;
        while (i<n)
        {
          resp = resp + `Jugador ${i+1}. 
            Nombre: ${partidos[j].jugadores[i].nombre} 
            Mail: ${partidos[j].jugadores[i].mail} 
            Telefono: ${partidos[j].jugadores[i].telefono}.
        `;
          i++;
        }

        j++;
      }



    }
    catch(e)
    {
      resp = e.message;
    }

    bot.sendMessage(chatId, resp);
  });

  // Machea con "/partido idPartido"
  bot.onText(/\/partido (.+)/, (msg, match) => {
    console.log('------> /partido id: Muestra la informacion del partido.');
    const chatId = msg.chat.id;

    let idPartido = match[1];
    let resp;

    try
    {
      //TODO: Integrar con metodos de API REST.
      let partido = { id: "5", fechaYHora: "2020-07-01 15:00", lugar: "la canchita",
      jugadores:  [
        {telefono: '03030456',mail: 'juancarlosvillanueva@gmail.com', nombre: 'Juan Carlos Villanueva'},
        {telefono: '123123',mail: '123123@gmail.com', nombre: '123123'}
      ], creadoEl: new Date(2022, 8, 5)}

      resp = `Los datos del partido ${idPartido} son: 
      Lugar: ${partido.lugar} 
      Fecha y Hora: ${partido.fechaYHora}
      `

      let n= partido.jugadores.length;
      let i=0;
      while (i<n)
      {
        resp = resp + `Jugador ${i+1}. 
          Nombre: ${partido.jugadores[i].nombre} 
          Mail: ${partido.jugadores[i].mail} 
          Telefono: ${partido.jugadores[i].telefono}.
      `;
        i++;
      }

    }
    catch(e)
    {
      resp = e.message;
    }

    bot.sendMessage(chatId, resp);
  });

  // Machea con "/inscribirme idPartido"
  bot.onText(/\/inscribirme (.+)/, (msg, match) => {

    msg.flagMatched=true;

    console.log('------>/inscribirme CUERPO');

    let parametros = match[1].split(',');
    let idPartido = parametros[0];
    let nombreApellido = parametros[1];
    let mail = parametros[2];
    let telefono = parametros[3];

    let resp;
    const chatId = msg.chat.id;

    if(parametros.length != 4)
    {
      resp='FORMATO INVALIDO -> Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono'
    }
    else
    {
      try
      {
        //TODO: Integrar con metodos de API REST.
        throw new Error(`No se ha encontra el partido de id ${idPartido}.`);
        resp= 'Se inscribió correctamente.';
      }
      catch(e)
      {
        resp = e.message;
      }

      // resp= ´No se encontró el partido de id ${idPartido}´;
      // resp= 'Ya se ha completado el cupo de jugadores para este partido.';

    }
    bot.sendMessage(chatId, resp);

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
