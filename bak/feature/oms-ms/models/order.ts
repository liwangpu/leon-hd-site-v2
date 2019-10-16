export class Order {
    id: string;
    name: string;
    description: string;
    creator: string;
    modifier: string;
    createdTime: string;
    modifiedTime: string;
    orderNo: string;
    totalNum: string;
    totalPrice: string;
    orderItems: any[];
    customer?: { id: string, name: string, phone: string, mail: string, address: string };
}
