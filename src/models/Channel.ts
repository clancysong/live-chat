import Message from './Message'

export default interface Channel {
  id: number
  uuid: string
  name: string
  creator_id: number
  messages: Message[]
}
