import { PatchOperation } from '@app/feature/base-ms';

export class Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    nodeType: string;
    resource: string;
    parentId: string;
    lValue: number;
    rValue: number;
    displayIndex: string;
    firstNode: boolean;
    lastNode: boolean;
    children: Category[];
    //这两个是接口字段,供mat tree使用
    level: number;
    expandable: boolean;

    static GenPatchDoc(entity: Category): PatchOperation[] {
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
                "path": "/nodeType",
                "value": entity.nodeType
            },
            {
                "op": "replace",
                "path": "/resource",
                "value": entity.resource
            }
        ];
    }//GenPatchDoc
}
