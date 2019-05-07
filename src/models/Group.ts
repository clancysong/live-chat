import User from './User'
import Message from './Message'

export default interface Group {
  id: number
  uuid: string
  name: string
  creator: number
  members: User[]
  messages: Message[]
}
