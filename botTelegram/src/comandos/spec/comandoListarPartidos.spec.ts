import {MockBot} from "../../../test/mockBot/mockBot";
import {comandoListarPartidos} from "../comandoListarPartidos";
import {RepositorioDePartidosFalso} from "../../../test/RepositorioDePartidosFalso";

describe("comando listar partidos", () => {
  test("devuelve los partidos que consigue de la api", async () => {
    let bot = new MockBot()
    let retornoDePedido = [{id: "ejemplo", lugar: "ejemploLugar", fechaYHora: "ejemplo fecha y hora", jugadores: []}];
    let repoPartidos = new RepositorioDePartidosFalso(retornoDePedido)

    await comandoListarPartidos(bot, repoPartidos)(bot.sampleMessage())

    // esto capaz podemos
    expect(bot.messages).toEqual(["Los partidos son los siguientes:\n" +
    "      \n" +
    "      \n" +
    "        Partido ejemplo: \n" +
    "        Lugar: ejemploLugar \n" +
    "        Fecha y Hora: ejemplo fecha y hora\n" +
    "        "])
  })
})
