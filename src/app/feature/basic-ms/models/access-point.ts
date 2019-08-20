import { PatchOperation } from '@app/feature/base-ms';

export class AccessPoint {
    id: string;
    name: string;
    description: string;
    pointKey: string;

    static GenPatchDoc(entity: AccessPoint): PatchOperation[] {
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
                "path": "/pointKey",
                "value": entity.pointKey
            }
        ];
    }//GenPatchDoc
}
