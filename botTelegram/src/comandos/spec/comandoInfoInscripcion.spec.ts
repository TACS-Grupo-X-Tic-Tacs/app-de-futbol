import {MockBot} from "../../../test/mockBot/mockBot";
import {comandoInfoPartido, datosDeUnJugadorFormateados, datosDeUnPartidoFormateados} from "../comandoInfoPartido";
import {RepositorioDePartidosFalso} from "../../../test/RepositorioDePartidosFalso";
import {comandoInfoInscripcion} from "../comandoInfoInscripcion";

describe("comando infoInscrpcion", () => {
  test("devuelve info sobre como mandar los datos de la inscrpcion", async () => {
    let bot = new MockBot()

    comandoInfoInscripcion(bot)(bot.sampleMessage())

    expect(bot.messages).toEqual(['Para inscribirse debe enviar: "/inscribirse idPartido,nombre y apellido,mail,telefono'])
  })
})
