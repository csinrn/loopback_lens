import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'iris_points' } }
})
export class IrisPoints extends Entity {
  @property({
    type: 'number',
    id: 1,
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "user_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  id_fake?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "user_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  userId?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "leftpupil_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  leftpupilX?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "leftpupil_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  leftpupilY?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "rightpupil_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  rightpupilX?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "rightpupil_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  rightpupilY?: number;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mysql: { "columnName": "iris_radius", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
  })
  irisRadius?: number;

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
