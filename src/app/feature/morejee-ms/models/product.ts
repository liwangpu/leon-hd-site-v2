import { PatchOperation } from '@app/feature/base-ms';
import { ProductSpec } from './product-spec';

export class Product {
    id: string;
    name: string;
    description: string;
    icon: string;
    brand: string;
    unit: string;
    categoryId: string;
    categoryName: string;
    createdTime: number;
    modifiedTime: number;
    specifications: ProductSpec[];
    static genBasicPatchDoc(entity: Product): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/name",
                "value": entity.name
            },
            {
                "op": "replace",
                "path": "/brand",
                "value": entity.brand
            },
            {
                "op": "replace",
                "path": "/unit",
                "value": entity.unit
            },
            {
                "op": "replace",
                "path": "/description",
                "value": entity.description
            },
            {
                "op": "replace",
                "path": "/categoryId",
                "value": entity.categoryId
            }
        ];
    }//genBasicPatchDoc
}
