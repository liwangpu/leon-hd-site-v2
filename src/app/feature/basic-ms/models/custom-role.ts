import { PatchOperation } from '@app/feature/base-ms';

export class CustomRole {
    id: string;
    name: string;
    description: string;
    accessPointKeys: string;

    static genPatchDoc(entity: CustomRole): PatchOperation[] {
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

    static genAccessPointDoc(keys: string): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/accessPointKeys",
                "value": keys
            }
        ];
    }//genAccessPointDoc
}
