import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../../basic-ms/services/token.service";
@Component({
  selector: 'basic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private tokenSrv: TokenService
  ) {

  }//constructor

  ngOnInit() {
    
  }//ngOnInit

}
