export const comandoInfoInscripcion = (bot) => msg => {

  if (msg.flagMatched) return;

  console.log('------> Muestra la info necesaria para inscribirse.');
  const chatId = msg.chat.id;
  const resp = 'Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono';

  bot.sendMessage(chatId, resp)
};
