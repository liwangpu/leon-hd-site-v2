import { PatchOperation } from '@app/feature/base-ms';

export class Solution {
    id: string;
    name: string;
    description: string;
    icon: string;

    static GenPatchDoc(entity: Solution): PatchOperation[] {
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
