import { PatchOperation } from '@app/feature/base-ms';

export class Material {
    id: string;
    name: string;
    description: string;
    icon: string;
    categoryId: string;
    categoryName: string;
    createdTime: number;
    modifiedTime: number;
    
    static GenPatchDoc(entity: Material): PatchOperation[] {
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
                "path": "/categoryId",
                "value": entity.categoryId
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
