import { NestFactory } from '@nestjs/core';
import { AppModule } from './endpoints/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const TelegramBot = require('node-telegram-bot-api');

    const token = '5799433358:AAGFACI1cLAvthuUXwAI8NcNGyjPX4vFd9U';

    // Creamos el bot utilizando 'polling' para obtener nuevas actualizaciones
    const bot = new TelegramBot(token, {polling: true});
    
    console.log('Bot de Telegram esperando mensajes...');
    
    // Machea con "/echo [loQueSea]"
    bot.onText(/\/echo (.+)/, (msg, match) => 
    {
      // 'msg' es el mensaje recibido por Telegram
      // 'match' es el resultado de ejecutar la expresión regular anterior en el contenido de texto del mensaje

      const chatId = msg.chat.id;
      const resp = match[1]; //  "loQueSea"

      // Vuelve a enviar el mensaje "loQueSea" recibido por chat al chatID que lo envio en primer lugar.
      bot.sendMessage(chatId, resp);
    });

    // Machea con "/partidos"
    bot.onText(/\/partidos (.+)/, (msg, match) => 
    {
      console.log(msg);
      const chatId = msg.chat.id;
      const resp = 'INSERTE LISTA DE PARTIDOS AQUI'; 

      bot.sendMessage(chatId, resp);
    });

    // Machea con "/estadisticas"
    bot.onText(/\/estadisticas (.+)/, (msg, match) => 
    {
      console.log(msg);
      const chatId = msg.chat.id;
      const resp = 'INSERTE LAS ESTADISTICAS AQUI'; 
      
      bot.sendMessage(chatId, resp);
    });

    // Machea con "/inscribirme"
    bot.onText(/\/inscribirme (.+)/, (msg, match) => 
    {
      console.log(msg);
      const chatId = msg.chat.id;
      const resp = 'PEDIR LOS DATOS DE INSCRIPCION'; 
      
      bot.sendMessage(chatId, resp);
    });

    // Escucha todo tipo de mensajes, hay diferentes tipos.
    bot.on('message', (msg, match) => 
    {
      console.log(msg);
      console.log(match);

      let resp = 'No entendi tu mensaje, proba con el MENU';

      if(match[1] == '/partidos')
      {
         resp = 'INSERTE LISTA DE PARTIDOS AQUI'; 
      }

      const chatId = msg.chat.id;

      bot.sendMessage(chatId, resp)
    });

  //await app.listen(3000);
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