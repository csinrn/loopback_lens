import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'lens' } } })
export class Lens extends Entity {
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
    precision: 10,
    scale: 0,
    mysql: { "columnName": "part_no", "dataType": "varchar", "dataLength": 20, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  partNo: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "series", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  series: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "brand", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  brand: string;

  @property({
    type: 'number',
    generated: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "no", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  no?: number;

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
    mysql: { "columnName": "powerL", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  powerL: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "powerH", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  powerH: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "water", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  water: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "daily", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  daily: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "biweekly", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  biweekly: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "monthly", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  monthly: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "place_of_prod", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  placeOfProd: string;

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
    mysql: { "columnName": "package", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  package: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "special_price", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  specialPrice: number;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mysql: { "columnName": "event_disp", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
  })
  eventDisp?: string;

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
    mysql: { "columnName": "new_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  newTag: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "hotsale_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  hotsaleTag: number;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "onsale_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  onsaleTag: number;

  @property({
    type: 'string',
    required: true,
    mysql: { "columnName": "create_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  createAt: string;

  @property({
    type: 'date',
    required: true,
    mysql: { "columnName": "launch_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  launchAt: Date;

  @property({
    type: 'date',
    required: true,
    mysql: { "columnName": "remove_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  removeAt: Date;

  @property({
    type: 'string',
    required: true,
    mysql: { "columnName": "update_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  updateAt: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "url", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  url: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: { "columnName": "url2", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  url2: string;

  @property({
    type: 'number',
    precision: 3,
    scale: 0,
    mysql: { "columnName": "state", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  state: number;

  @property({
    type: 'number',
    precision: 10,
    required: false,
    scale: 0,
    mysql: { "columnName": "pic_ver", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  picVer: number;

  @property({
    type: 'number',
    required: false,
    precision: 3,
    scale: 0,
    mysql: { "columnName": "isdeleted", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
  })
  isdeleted: number;

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
