import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'lens' } } })
export class Lens extends Entity {
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
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "lensPic", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  lenspic: string;

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
    precision: 12,
    mysql: { "columnName": "diameter", "dataType": "float", "dataLength": null, "dataPrecision": 12, "dataScale": null, "nullable": "N" },
  })
  diameter: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    mysql: { "columnName": "BC", "dataType": "float", "dataLength": null, "dataPrecision": 12, "dataScale": null, "nullable": "N" },
  })
  bc: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "power", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  power: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "water", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  water: number;

  @property({
    type: 'string',
    required: true,
    length: 8,
    mysql: { "columnName": "wearingTime", "dataType": "enum", "dataLength": 8, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  wearingtime: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "placeOfProd", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  placeofprod: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "price", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  price: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "specialPrice", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  specialprice: number;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: { "columnName": "eventDisp", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  eventdisp?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "license", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  license: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "newTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  newtag: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "hotsaleTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  hotsaletag: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "onsaleTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  onsaletag: number;

  @property({
    type: 'string',
    required: true,
    mysql: { "columnName": "launchAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  launchat: string;

  @property({
    type: 'string',
    required: false,
    mysql: { "columnName": "closeAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  closeat?: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: { "columnName": "url", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  url?: string;

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
