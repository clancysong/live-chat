import User from './User'
import Channel from './Channel'

export default interface Group {
  id: number
  uuid: string
  name: string
  creator_id: number
  avatar: string
  cover: string
  members: User[]
  channels: Channel[]
}
