import Group from './Group'

export default interface User {
  id: number
  email: string
  name: string
  password: string
  status: string
  groups: Group[]
  permission_level: number
}
