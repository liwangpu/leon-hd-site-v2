import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Category } from '@app/feature/morejee-ms';

export class CategoryDataSource implements DataSource<any>{

    _dataSubject = new BehaviorSubject<Category[]>([]);
  
    connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
      return this._dataSubject.asObservable();
    }//connect
  
    disconnect(collectionViewer: CollectionViewer): void {
      this._dataSubject.complete();
      this._dataSubject.unsubscribe();
    }//disconnect
  
    refreshData(category: Category) {
      this._dataSubject.next([category]);
    }//refreshData
  }