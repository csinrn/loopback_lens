import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'iris_points' } }
})
export class IrisPoints extends Entity {
  @property({
    type: 'string',
    generated: true,
    required: false,
    id: 1,
    length: 20,
    mysql: { "columnName": "id", "dataType": "varchar", "dataLength": 20, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: { "columnName": "user_id", "dataType": "varchar", "dataLength": 20, "dataPrecision": null, "dataScale": null, "nullable": "N" },
  })
  userId: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "leftpupil_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  leftpupilX: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "leftpupil_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  leftpupilY: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "rightpupil_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  rightpupilX: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "rightpupil_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  rightpupilY: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "iris_radius", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
  })
  irisRadius: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<IrisPoints>) {
    super(data);
  }
}

export interface IrisPointsRelations {
  // describe navigational properties here
}

export type IrisPointsWithRelations = IrisPoints & IrisPointsRelations;
