import { Model, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class ImageStorage extends Model {
  @property({
    type: 'string',
    required: true,
  })
  img: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ImageStorage>) {
    super(data);
  }
}

export interface ImageStorageRelations {
  // describe navigational properties here
}

export type ImageStorageWithRelations = ImageStorage & ImageStorageRelations;
