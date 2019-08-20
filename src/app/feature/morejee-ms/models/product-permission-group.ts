import { PatchOperation } from '@app/feature/base-ms';

export class ProductPermissionGroup {
    id: string;
    name: string;
    description: string;

    static genPatchDoc(entity: ProductPermissionGroup): PatchOperation[] {
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
            }
        ];
    }//GenPatchDoc
}
