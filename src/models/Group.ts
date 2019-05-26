import User from './User'
import Channel from './Channel'

export default interface Group {
  id: number
  uuid: string
  name: string
  creator_id: number
  members: User[]
  channels: Channel[]
}
