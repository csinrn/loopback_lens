import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'userlens' } } })
export class Userlens extends Entity {
  @property({
    type: 'number',
    precision: 11,
    generated: true,
    required: false,
    id: 1,
    scale: 0,
    mysql: { "columnName": "id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "user_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lens_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  lensId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lens_count", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  lensCount: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lens_time", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  lensTime?: number;

  @property({
    type: 'date',
    required: true,
    mysql: { "columnName": "create_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  createAt: Date;

  @property({
    type: 'date',
    required: false,
    mysql: { "columnName": "update_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  updateAt?: Date;

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
