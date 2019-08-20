import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category, CategoryService } from '@app/feature/morejee-ms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetailBasicComponent } from '../category-detail-basic/category-detail-basic.component';

@Component({
  selector: 'morejee-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, AfterViewInit {


  category: Category;
  @ViewChild('basicInfoCt', { static: true }) basicInfoCt: CategoryDetailBasicComponent;
  constructor(protected router: Router, protected acr: ActivatedRoute, protected catSrv: CategoryService) {
    this.category = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Category();
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngAfterViewInit(): void {
    let rootCat = {
      ...this.category, ...{ children: [] }
    };
    setTimeout(() => {
      this.basicInfoCt.patchForm(rootCat);
    }, 300);
  }//ngAfterViewInit

  goBack() {
    if (this.category)
      this.router.navigate(["../../"], { relativeTo: this.acr });
    else
      this.router.navigate(["../"], { relativeTo: this.acr });
  }//goBack


  afterCategoryCommit() {
    this.catSrv.getTreeById(this.category.id).subscribe(cat => this.category = cat);
  }//afterCategoryCommit

}
