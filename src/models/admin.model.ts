import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Admin extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  account: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  creatat?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
