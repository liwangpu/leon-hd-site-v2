import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigService, AppCacheService } from '@app/core';
import { TokenService } from '@app/feature/basic-ms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberLogin: boolean = true;
  returnUrl: string;
  loginForm: FormGroup;
  constructor(protected acr: ActivatedRoute, protected router: Router, protected formBuilder: FormBuilder, protected cacheSrv: AppCacheService, protected httpClient: HttpClient, protected appConfiSrv: AppConfigService, protected tokenSrv: TokenService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.acr.queryParams.subscribe(params => this.returnUrl = params['return']);
  }//constructor

  ngOnInit() {
    let lastLoginStr = this.cacheSrv.lastLoginAccount;
    if (lastLoginStr)
      this.loginForm.patchValue(JSON.parse(lastLoginStr));
  }//ngOnInit

  login() {
    let data = this.loginForm.value;
    this.tokenSrv.login(data.username, data.password).subscribe(res => {
      this.cacheSrv.tokenExpires = res.expires;
      this.cacheSrv.token = res.token;
      if (!this.rememberLogin)
        data.password = '';

      this.cacheSrv.lastLoginAccount = JSON.stringify(data);
      this.router.navigateByUrl(this.returnUrl);
    });
  }//login

}
