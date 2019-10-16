import { PatchOperation } from '@app/feature/base-ms';


export class Organization {
    id: string;
    name: string;
    description: string;
    mail: string;
    phone: string;
    ownerId: string;
    organizationTypeId: number;
    createdTime: number;
    modifiedTime: number;
    static GenPatchDoc(entity: Organization): PatchOperation[] {
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
