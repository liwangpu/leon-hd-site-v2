import { PatchOperation } from '@app/feature/base-ms';

export class Account {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    description: string;
    mail: string;
    phone: string;
    createdTime: number;
    modifiedTime: number;

    static genPatchDoc(entity: Account): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/firstName",
                "value": entity.firstName
            },
            {
                "op": "replace",
                "path": "/lastName",
                "value": entity.lastName
            },
            {
                "op": "replace",
                "path": "/description",
                "value": entity.description
            },
            {
                "op": "replace",
                "path": "/mail",
                "value": entity.mail
            },
            {
                "op": "replace",
                "path": "/phone",
                "value": entity.phone
            }
        ];
    }//genPatchDoc

    static genUserRolePathDoc(customRoleIds: string): PatchOperation[] {
        return [
            {
                "op": "replace",
                "path": "/customRoleIds",
                "value": customRoleIds
            }];
    }//genUserRolePathDoc
}
