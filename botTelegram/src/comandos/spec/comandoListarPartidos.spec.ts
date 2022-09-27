import {MockBot} from "../../../test/mockBot/mockBot";
import {
  comandoListarPartidos,
  formatearDatosDeJugadorListarPartidos,
  formatearDatosDePartidoListarPartidos
} from "../comandoListarPartidos";
import {RepositorioDePartidosFalso} from "../../../test/RepositorioDePartidosFalso";

describe("comando listar partidos", () => {
  test("devuelve los partidos que consigue de la api", async () => {
    let bot = new MockBot()
    let jugadores = [{nombre: "pepito", mail:"test@xd.com", telefono: "444444"}];
    let datosDePartido = {id: "ejemplo", lugar: "ejemploLugar", fechaYHora: "ejemplo fecha y hora", jugadores};
    let retornoDePedido = [datosDePartido];
    let repoPartidos = new RepositorioDePartidosFalso(retornoDePedido)

    await comandoListarPartidos(bot, repoPartidos)(bot.sampleMessage())

    // esto capaz podemos
    expect(bot.messages).toEqual([
      `Los partidos son los siguientes:\n\n` +
      formatearDatosDePartidoListarPartidos(datosDePartido) +
      formatearDatosDeJugadorListarPartidos(1, jugadores[0])
    ])
  })
})
