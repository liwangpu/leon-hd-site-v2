import { HttpHeaders } from '@angular/common/http';

export class PatchOperation {
    op: "add" | "remove" | "replace" | "move" | "copy" | "test";
    path: string;
    value?: any;
    from?: string;

    static PatchContentType = new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
    });
}
