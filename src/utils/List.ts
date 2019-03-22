interface Item {
  id: number
}

class List {
  private items: Item[]

  constructor(items: Item[] = []) {
    this.items = items
  }

  public init = (items: Item[]) => (this.items = items)

  public get = (id: number) => this.items.find(item => item.id === id)

  public getAll = () => this.items

  public add = (item: Item) => this.items.push(item)

  public remove = (id: number) => this.items.filter(item => item.id !== id)
}

export default List
