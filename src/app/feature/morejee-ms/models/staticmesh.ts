import { PatchOperation } from '@app/feature/base-ms';

export class Staticmesh {
    id: string;
    name: string;
    icon: string;
    sourceAssetId: string;
    unCookedAssetId: string;
    cookedAssetId: string;
    iconAssetId: string;
    dependencies: string;
    properties: string;
    createdTime: number;
    modifiedTime: number;

    static GenPatchDoc(entity: Staticmesh): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/name",
                "value": entity.name
            }
        ];
    }//GenPatchDoc
}
