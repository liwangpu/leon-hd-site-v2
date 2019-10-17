import { ListViewerOpsatService } from '../services/list-viewer-opsat.service';
import { Observable } from 'rxjs';
import { filter, switchMap, map, tap } from "rxjs/operators";
import { ListViewerTableColumn } from './list-viewer-table-column';
import { ListViewerTopicEnum } from '../enums/list-viewer-topic-enum';

export abstract class ListViewerLauncher {

    abstract getColumnDefines(): Observable<ListViewerTableColumn[]>;
    abstract onQuery(queryParam: object): Observable<{ total: number, data: any[] }>;
    abstract onViewRecord(data: any): void;
    abstract onAddRecord(): void;
    abstract onFilterRecords(param: object): void;
    abstract onDeleteRecords(datas: any[]): void;
    constructor(protected opsatSrv: ListViewerOpsatService) {
        //订阅并发布列表columns的定义
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.requestColumnDefine), switchMap(() => this.getColumnDefines())).subscribe(cols => this.opsatSrv.publish(ListViewerTopicEnum.columnDefineChange, cols));//subscribe
        //订阅发布列表数据
        let page = 0;
        let pageSize = 0;
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.requestData), map(tp => tp.data), tap(prm => {
            page = prm['page'];
            pageSize = prm['pageSize'];
        }), switchMap(prm => this.onQuery(prm).pipe(map(result => {
            if (!result.data)
                result.data = [];
            for (let i = 0, len = result.data.length; i < len; i++) {
                result.data[i]['_seqno'] = (page - 1) * pageSize + i + 1;
            }
            //for
            return result;
        })))).subscribe(result => this.opsatSrv.publish(ListViewerTopicEnum.listDataChange, result));//subscribe
        //订阅查看详情事件
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.viewRecord), map(tp => tp.data)).subscribe(record => this.onViewRecord(record));//subscribe
        //订阅添加记录事件
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.addRecord)).subscribe(() => this.onAddRecord());//subscribe
        //订阅过滤事件
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.filterRecords), map(tp => tp.data)).subscribe(prm => this.onFilterRecords(prm));
        //订阅删除记录事件
        this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.deleteRecords), map(tp => tp.data)).subscribe(items => this.onDeleteRecords(items));
    }//constructor


    /**
     * 刷新列表数据
     */
    refreshRecords() {
        this.opsatSrv.publish(ListViewerTopicEnum._queryData);
    }//refreshRecords

    advanceSearch(param?: object) {
        this.opsatSrv.publish(ListViewerTopicEnum._appendExtQueryParam, param);
    }//advanceSearch

    openListDrawer() {
        this.opsatSrv.publish(ListViewerTopicEnum._listDrawerToggle, 'open');
    }//openListDrawer

    closeListDrawer() {
        this.opsatSrv.publish(ListViewerTopicEnum._listDrawerToggle, 'close');
    }//closeListDrawer
}
