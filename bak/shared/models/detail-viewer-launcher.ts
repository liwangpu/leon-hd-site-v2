import { DetailViewerOpsatService } from '../services/detail-viewer-opsat.service';
import { DetailViewerTopicEnum } from '../enums/detail-viewer-topic-enum';
import { ChangeIconDialogComponent } from '../components/change-icon-dialog/change-icon-dialog.component';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class DetailViewerLauncher implements OnDestroy {

    iconChange = new Subject<{ formData: any, header: any }>();
    constructor(protected opsatSrv: DetailViewerOpsatService) {

    }//constructor

    ngOnDestroy(): void {
        this.iconChange.complete();
        this.iconChange.unsubscribe();
    }//ngOnDestroy

    refreshIcon(url: string) {
        this.opsatSrv.publish(DetailViewerTopicEnum.iconChange, url);
    }//refreshIcon

    refreshName(name: string) {
        this.opsatSrv.publish(DetailViewerTopicEnum.nameChange, name);
    }//refreshName

    onChangeIcon() {
        let ins = this.opsatSrv._openDialog(ChangeIconDialogComponent, { width: "460px", height: "500px" });
        ins.componentInstance.confirm.subscribe(data => {
            this.iconChange.next(data);
        });
    }//onChangeIcon

}
