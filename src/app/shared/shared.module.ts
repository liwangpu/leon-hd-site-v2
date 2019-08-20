import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
//mat modules
import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListViewerComponent } from './components/list-viewer/list-viewer.component';
import { ListViewerToolbarComponent } from './components/list-viewer-toolbar/list-viewer-toolbar.component';
import { ListViewerTableComponent } from './components/list-viewer-table/list-viewer-table.component';
import { TablePredefineColumnFilterPipe } from './pipes/table-predefine-column-filter.pipe';
import { ListViewerPaginatorComponent } from './components/list-viewer-paginator/list-viewer-paginator.component';
import { DetailViewerComponent } from './components/detail-viewer/detail-viewer.component';
import { SimpleConfirmDialogComponent } from './components/simple-confirm-dialog/simple-confirm-dialog.component';
import { ListViewerFilterComponent } from './components/list-viewer-filter/list-viewer-filter.component';
import { ChangeIconDialogComponent } from './components/change-icon-dialog/change-icon-dialog.component';
import { ServerRedirectPipe } from './pipes/server-redirect.pipe';
import { LargeIconViewerComponent } from './components/large-icon-viewer/large-icon-viewer.component';
import { SimpleViewerTableComponent } from './components/simple-viewer-table/simple-viewer-table.component';
import { SimpleToggleTableComponent } from './components/simple-toggle-table/simple-toggle-table.component';
import { WidgetAutoSearchBarComponent } from './components/widget-auto-search-bar/widget-auto-search-bar.component';
import { SimplePaginatorViewerTableComponent } from './components/simple-paginator-viewer-table/simple-paginator-viewer-table.component';

@NgModule({
  declarations: [ListViewerComponent, ListViewerToolbarComponent, ListViewerTableComponent, TablePredefineColumnFilterPipe, ListViewerPaginatorComponent, DetailViewerComponent, SimpleConfirmDialogComponent, ListViewerFilterComponent, ChangeIconDialogComponent, ServerRedirectPipe, LargeIconViewerComponent, SimpleViewerTableComponent, SimpleToggleTableComponent, WidgetAutoSearchBarComponent, SimplePaginatorViewerTableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [
    ServerRedirectPipe
  ],
  exports: [
    ListViewerComponent,
    DetailViewerComponent,
    SimpleConfirmDialogComponent,
    SimpleViewerTableComponent,
    SimpleToggleTableComponent,
    ListViewerFilterComponent,
    ServerRedirectPipe,
    SimplePaginatorViewerTableComponent,
    WidgetAutoSearchBarComponent
  ],
  entryComponents: [
    SimpleConfirmDialogComponent,
    ChangeIconDialogComponent,
    LargeIconViewerComponent
  ]
})
export class SharedModule { }
