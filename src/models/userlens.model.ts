import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'userlens' } } })
export class Userlens extends Entity {
  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: { "columnName": "id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "userId", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  userid: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lensId", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  lensid: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lensCount", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  lenscount: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "lensTime", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  lenstime?: number;

  @property({
    type: 'string',
    required: true,
    mysql: { "columnName": "createAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  createat: string;

  @property({
    type: 'string',
    required: false,
    mysql: { "columnName": "updateAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  updateat?: string;

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
