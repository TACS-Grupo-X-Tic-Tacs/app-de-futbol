import {MockBot} from "../../../test/mockBot/mockBot";
import {RepositorioDePartidosFalso} from "./RepositorioDePartidosFalso";
import {comandoInfoPartido, datosDeUnJugadorFormateados, datosDeUnPartidoFormateados} from "../comandoInfoPartido";

describe("comando infoPartido", () => {
  test("devuelve los partidos que consigue de la api", async () => {
    let bot = new MockBot()
    let idPartido = "unIdDeUnPartido";
    let lugarPartido = "ejemploLugar";
    let fechaYHoraPartido = "ejemplo fecha y hora";
    let jugadores = [
      {nombre: "nombreEjemplo", mail: "mailEjemplo", telefono: "telefonoEjemplo"}
    ];
    let retornoDePedido = {id: "unIdDeUnPartido", lugar: lugarPartido, fechaYHora: fechaYHoraPartido, jugadores};
    let partidoFormateado = datosDeUnPartidoFormateados(idPartido, {lugar: lugarPartido, fechaYHora: fechaYHoraPartido});
    let jugadorFormateado = datosDeUnJugadorFormateados(0, {jugadores})
    let repoPartidos = new RepositorioDePartidosFalso(retornoDePedido)

    await comandoInfoPartido(bot, repoPartidos)(bot.sampleMessage(), ["partidos", idPartido])

    expect(bot.messages).toEqual([partidoFormateado + jugadorFormateado])
  })
})
