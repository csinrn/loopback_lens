import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Userlens extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userid: string;

  @property({
    type: 'number',
    required: true,
  })
  lensid?: string;

  @property({
    type: 'number',
  })
  lenscount?: number;

  @property({
    type: 'number',
  })
  lenstime?: number;

  @property({
    type: 'number',
    required: false,
  })
  createat: string;

  @property({
    type: 'number',
    required: false,
  })
  updateat: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Userlens>) {
    super(data);
  }
}

export interface UserlensRelations {
  // describe navigational properties here
}

export type UserlensWithRelations = Userlens & UserlensRelations;
