
// usamos nuestros tipos de bot para poder testear facilmente las interfaces

export interface TelegramBot {
  sendMessage: (chatId: string, message: string) => void
}

export interface TelegramMessage {
  chat: {id: string}
}
