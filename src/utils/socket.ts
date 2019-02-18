interface Event {
  type: string
  method: (data: any) => any
}

enum EVENT_TYPE {
  INIT_OTHER_PLAYERS = 'init other players',
  CREATE_PLAYER = 'create player',
  PLAYER_MOVEMENT = 'player movement',
  ADD_OTHER_PLAYER = 'add other player',
  REMOVE_PLAYER = 'remove player'
}

class Socket {
  private WS_URL = 'ws://127.0.0.1:10000'

  private ws: WebSocket
  private events: Event[]

  constructor() {
    this.events = []
    this.ws = new WebSocket(this.WS_URL)
    this.ws.onmessage = this.onmessage
  }

  public send = (type: EVENT_TYPE, data: any) => {
    this.ws.send(JSON.stringify({ type, body: data }))
  }

  public on = (eventType: EVENT_TYPE, callback: (data: any) => any) => {
    this.events.push({ type: eventType, method: data => callback(data) })
  }

  public emit = (eventType: EVENT_TYPE, data: any) => {
    this.events.forEach(event => {
      if (event.type === eventType) event.method(data)
    })
  }

  private onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)

    if (Object.values(EVENT_TYPE).includes(data.type)) this.emit(data.type, data.body)
    else throw new Error('Event type error')
  }
}

export default new Socket()
export { EVENT_TYPE }
