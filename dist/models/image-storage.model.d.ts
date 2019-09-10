import { Model } from '@loopback/repository';
export declare class ImageStorage extends Model {
    img: string;
    [prop: string]: any;
    constructor(data?: Partial<ImageStorage>);
}
export interface ImageStorageRelations {
}
export declare type ImageStorageWithRelations = ImageStorage & ImageStorageRelations;
