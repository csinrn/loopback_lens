import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Lens extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  lensid: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  lenspic: number[];

  @property({
    type: 'string',
    required: true,
  })
  lensname: string;

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

  constructor(data?: Partial<Lens>) {
    super(data);
  }
}

export interface LensRelations {
  // describe navigational properties here
}

export type LensWithRelations = Lens & LensRelations;
