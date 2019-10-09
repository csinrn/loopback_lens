import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'update_time' } }
})
export class UpdateTime extends Entity {
  @property({
    type: 'string',
    required: false,
    generated: true,
    id: 1,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "id", "dataType": "varchar", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  id: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "update_from", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  updateFrom: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "update_to", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  updateTo: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "update_freq", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  updateFreq: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UpdateTime>) {
    super(data);
  }
}

export interface UpdateTimeRelations {
  // describe navigational properties here
}

export type UpdateTimeWithRelations = UpdateTime & UpdateTimeRelations;
