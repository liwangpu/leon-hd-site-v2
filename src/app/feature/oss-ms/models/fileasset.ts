import { PatchOperation } from '@app/feature/base-ms';

export class Fileasset {
    id: string;
    name: string;
    description: string;
    size: number;
    url: string;
    fileExt: string;
    fileState: number;
    localPath: string;
    subscriberType: string;
    subscriber: string;
    createdTime: number;
    modifiedTime: number;

    static GenPatchDoc(entity: Fileasset): PatchOperation[] {
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
