import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'fmo_lensdb', table: 'iris_points'}}
})
export class IrisPoints extends Entity {
  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {"columnName":"user_id","dataType":"int","dataLength":null,"dataPrecision":10,"dataScale":0,"nullable":"Y"},
  })
  userId?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {"columnName":"leftiris_x","dataType":"int","dataLength":null,"dataPrecision":10,"dataScale":0,"nullable":"Y"},
  })
  leftirisX?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {"columnName":"leftiris_y","dataType":"int","dataLength":null,"dataPrecision":10,"dataScale":0,"nullable":"Y"},
  })
  leftirisY?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {"columnName":"rightiris_x","dataType":"int","dataLength":null,"dataPrecision":10,"dataScale":0,"nullable":"Y"},
  })
  rightirisX?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {"columnName":"rightiris_y","dataType":"int","dataLength":null,"dataPrecision":10,"dataScale":0,"nullable":"Y"},
  })
  rightirisY?: Number;

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
