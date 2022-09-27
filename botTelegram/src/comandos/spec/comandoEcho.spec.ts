import {MockBot} from "../../../test/mockBot/mockBot";
import {comandoEcho} from "../echo";

describe("comando echo", () => {
  test("devuelve lo que se le envía", () => {
    let bot = new MockBot()
    let mensajeEnviado = "un mensaje cualquiera";

    comandoEcho(bot)(bot.sampleMessage(), ["echo", mensajeEnviado])

    expect(bot.messages).toEqual([mensajeEnviado])
  })
})
