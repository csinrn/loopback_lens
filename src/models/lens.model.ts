import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Lens extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  lens_id: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  lens_pic: number[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  diameter: number;

  @property({
    type: 'number',
    required: true,
  })
  BC: number;

  @property({
    type: 'number',
    required: true,
  })
  power: number;

  @property({
    type: 'number',
    required: true,
  })
  water: number;

  @property({
    type: 'number',
    required: true,
  })
  wearing_time: number;    ///////////////////////////enum

  @property({
    type: 'string',
    required: true,
  })
  place_of_prod: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: false,
  })
  special_price: number;

  @property({
    type: 'string',
    required: false,
  })
  event_disp: string;

  @property({
    type: 'string',
    required: true,
  })
  license: string;

  @property({
    type: 'boolean',
    required: true,
  })
  new_tag: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  hotsale_tag: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  onsale_tag: boolean;

  @property({
    type: 'Date',
    required: true,
  })
  launch_at: Date;

  @property({
    type: 'Date',
    required: false,
  })
  close_at: Date;

  @property({
    type: 'string',
    required: false,
  })
  url: string;

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
