import { PatchOperation } from '@app/feature/base-ms';

export class ProductSpec {
    id: string;
    name: string;
    description: string;
    icon: string;
    price: number;
    partnerPrice: number;
    purchasePrice: number;
    createdTime: string;
    modifiedTime: string;

    static GenPatchDoc(entity: ProductSpec): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/name",
                "value": entity.name
            },
            {
                "op": "replace",
                "path": "/description",
                "value": entity.description
            },
            {
                "op": "replace",
                "path": "/price",
                "value": entity.price
            },
            {
                "op": "replace",
                "path": "/partnerPrice",
                "value": entity.partnerPrice
            },
            {
                "op": "replace",
                "path": "/purchasePrice",
                "value": entity.purchasePrice
            }
        ];
    }//GenPatchDoc

    static IconChangePatchDoc(icon: string): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/icon",
                "value": icon
            }
        ];
    }//IconChangePatchDoc
}
