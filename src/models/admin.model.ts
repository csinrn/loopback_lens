import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'admin' } } })
export class Admin extends Entity {
  @property({
    type: 'number',
    precision: 10,
    generated: true,
    required: false,
    id: 1,
    scale: 0,
    mysql: { "columnName": "id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
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
    mysql: { "columnName": "create_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  createAt: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    length: 50,
    mysql: { "columnName": "is_Admin", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  isAdmin: number;

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
