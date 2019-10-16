import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpsatService } from '../../services/opsat.service';


@Component({
  selector: 'tutorial-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    OpsatService
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private opsat: OpsatService) {


  }//constructor

  ngOnInit() {
    console.log('home int');

    // this.opsat.message.next();


    setTimeout(() => {
      console.log(1, this.opsat.message.isStopped);
      // this.opsat.message.next('ohohoh');
    }, 2000);




  }//ngOnInit

  ngOnDestroy(): void {
    console.log('home destroy');
  }

}
