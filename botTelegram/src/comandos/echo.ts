export const comandoEcho = (bot) => (msg, match) =>{
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
}
