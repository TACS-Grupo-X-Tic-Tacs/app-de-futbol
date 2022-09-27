import {TelegramBot, TelegramMessage} from "../../src/comandos/TelegramBot";

export class MockBot implements TelegramBot {

  public messages: string[]

  constructor() {
    this.messages = []
  }

  sendMessage(chatId: string, message: string) {
    this.messages.push(message)
  }

  sampleMessage(): TelegramMessage {
    return {chat: {id: "sampleChatId"}, flagMatched: false}
  }
}
