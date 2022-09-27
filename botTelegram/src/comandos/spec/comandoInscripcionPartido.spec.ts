import {MockBot} from "../../../test/mockBot/mockBot";
import {comandoInfoPartido, datosDeUnJugadorFormateados, datosDeUnPartidoFormateados} from "../comandoInfoPartido";
import {RepositorioDePartidosFalso} from "../../../test/RepositorioDePartidosFalso";
import {comandoInscripcionPartido} from "../comandoInscripcionPartido";

describe("comando inscripcion partido", () => {
  test("si recibe menos de 4 parametros rompe", async () => {
    let bot = new MockBot()
    let idPartido = "unIdDeUnPartido";
    let repoPartidos = new RepositorioDePartidosFalso(undefined)

    await comandoInscripcionPartido(bot, repoPartidos)(bot.sampleMessage(), ["inscribirme",  `${idPartido},un parametro de relleno`])

    expect(bot.messages).toEqual(['FORMATO INVALIDO -> Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono'])
  })

  test("si el pedido es procesado correctamente, se devuelve el mensaje de inscripcion correcta al usuario", async () => {
    let bot = new MockBot()
    let idPartido = "unIdDeUnPartido";
    let unNombreDeJugador = "pepitoMartinez"
    let repoPartidos = new RepositorioDePartidosFalso(201)

    await comandoInscripcionPartido(bot, repoPartidos)(bot.sampleMessage(), ["inscribirme",
      `${idPartido}, ${unNombreDeJugador}, "ejemploMail@xd.com", "42042042"`])


    expect(bot.messages).toEqual(["felicidades:  " + unNombreDeJugador + " te anotaste al partido correctamente"])
  })

  test("si el pedido es procesado incorrectamente se le pide al usuario que vuelva a intentarlo mas tarde", async () => {
    let bot = new MockBot()
    let idPartido = "unIdDeUnPartido";
    let unNombreDeJugador = "pepitoMartinez"
    let repoPartidos = new RepositorioDePartidosFalso(400)

    await comandoInscripcionPartido(bot, repoPartidos)(bot.sampleMessage(), ["inscribirme",
      `${idPartido}, ${unNombreDeJugador}, "ejemploMail@xd.com", "42042042"`])


    expect(bot.messages).toEqual(["no se pudo anotar al partido intente mas tarde"])
  })
})
