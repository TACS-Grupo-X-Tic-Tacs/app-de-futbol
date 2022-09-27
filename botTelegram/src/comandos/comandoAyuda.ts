export const comandoAyuda = (bot) => msg => {

  if (msg.flagMatched) return;

  console.log('------> Muestra los comandos del bot.');
  const chatId = msg.chat.id;
  const resp = `
  ¡Bienvenido/a! Para utilizar este bot tiene los siguientes comandos:
  \n/partidos -> Puede visualizar los partidos que se encuentran en el sistem
  \n/partido [id] -> Escribiendo un id de partido, puede visualizar los datos del mismo. Por ejemplo: /partido 5
  \n/crearPartido [lugar],[fecha],[hora] -> Escribiendo un lugar, fecha y hora, puede crear un nuevo partido. Debe tener en cuenta que:\n-Para la fecha se requiere utilizar el formato aaaa-mm-dd Por ejemplo: 2022-08-22 siendo el 22 de Agosto del 2022. \n-Para la hora se requiere utilizar el formato hh:mm \nPor ejemplo: 14:00 serían las 2pm. \n\nUn ejemplo de creación de partido sería: \n/crearPartido Chacarita,2022-09-11,15:45
  \n/inscribirme [idPartido],[nombre y apellido],[mail],[telefono]' -> Escribiendo un id, nombre y apellido, mail y un telefono puede inscribirse en el partido que desee. Por ejemplo: /inscribirse 5,Pepe Rodriguez,peperodriguez@mail.com,112374637
  \n/estadisticas -> Puede visualizar la cantidad de partidos creados y jugadores anotados en las últimas dos horas`;

  bot.sendMessage(chatId, resp)
};
