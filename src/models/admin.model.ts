import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'admin' } } })
export class Admin extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 50,
    id: 1,
    mysql: { "columnName": "account", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  account: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: { "columnName": "password", "dataType": "varchar", "dataLength": 100, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    mysql: { "columnName": "create_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  createAt: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  name: string;

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
