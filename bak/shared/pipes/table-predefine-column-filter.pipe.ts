import { Pipe, PipeTransform } from '@angular/core';
import { ListViewerTableColumn } from '../models/list-viewer-table-column';

@Pipe({
  name: 'sharedTablePredefineColumnFilter'
})
export class TablePredefineColumnFilterPipe implements PipeTransform {

  transform(columnDefs: ListViewerTableColumn[], predefineColNames?: string): any {
    if (predefineColNames) {
      let preDefNames = predefineColNames.split(',');
      return columnDefs.filter(col => !preDefNames.some(name => col.field == name));
    }
    return columnDefs;
  }//transform

}
