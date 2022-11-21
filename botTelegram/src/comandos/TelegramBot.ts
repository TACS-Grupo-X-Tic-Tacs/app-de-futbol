
// usamos nuestros tipos de bot para poder testear facilmente las interfaces

export interface TelegramBot {
  sendMessage: (chatId: string, message: string) => void
}

export interface TelegramMessage {
  chat: {id: string}
  flagMatched: boolean
}


//feo, mal, nonono
export const errorMessage = (error): string => error.response?.data.message || 'Hubo un problema interno, intente mas tarde.'
