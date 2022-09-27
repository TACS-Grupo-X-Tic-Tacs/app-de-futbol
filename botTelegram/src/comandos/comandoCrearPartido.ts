import axios from "axios";

export const comandoCrearPartido = (bot, apiURL) => async (msg, match) => {

    msg.flagMatched = true;

    console.log('------>/crearPartido CUERPO');

    const chatId = msg.chat.id;
    let parametros = match[1].split(',');

    if (parametros.length != 3) {
        bot.sendMessage(chatId,
            'FORMATO INVALIDO:\n-Para crear un partido se debe enviar con el siguiente formato "/crearPartido lugar,fecha,hora" \n-Para la fecha se requiere utilizar el formato aaaa-mm-dd Por ejemplo: 2022-08-22 siendo el 22 de Agosto del 2022. \n-Para la hora se requiere utilizar el formato hh:mm Por ejemplo: 14:00 serían las 2pm. \n\nUn ejemplo de creación de partido sería: \n/crearPartido Chacarita,2022-09-11,15:45'
        );
        return
    }

    let [lugar, fecha, hora] = parametros
    
    let partido: any = await axios.post(apiURL + "/partidos", {
        fechaYHora: `${fecha} ${hora}`,
        lugar
    }).then(response => response.status)

    if (partido === 201) {
        bot.sendMessage(chatId, `¡Felicidades! Se ha creado el partido correctamente en ${lugar} el día ${fecha} a las ${hora}hs`);
    } else {
        bot.sendMessage(chatId, "No se pudo crear el partido, intente más tarde");
    }
};
