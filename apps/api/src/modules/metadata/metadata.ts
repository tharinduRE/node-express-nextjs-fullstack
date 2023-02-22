export interface KeyType {
  name: string,
  description: string,
  parent: string,
}

export interface KeyValue<T> {
  key :string
  value: T | string | any
}

export type Metadata<T> = KeyValue<T>