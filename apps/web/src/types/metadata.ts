import { IModel } from "./IModel"

export interface KeyType extends IModel {
  name: string,
  description: string,
  parent: string,
}

export interface KeyValue<T> extends IModel{
  key :string
  value: T | string | any
}

export type Metadata<T> = KeyValue<T>