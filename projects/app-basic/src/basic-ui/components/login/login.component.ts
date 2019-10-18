import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../../basic-ms/services/token.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'basic-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    rememberLogin: boolean = true;
    returnUrl: string;
    loginForm: FormGroup;
    constructor(
        protected acr: ActivatedRoute,
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected tokenSrv: TokenService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.acr.queryParams.subscribe(params => this.returnUrl = params['return']);
    }//constructor

    ngOnInit() {

        // if (!isPlatformBrowser(this.platformId)) return;

        // if (this.authSrv.tokenValid) {
        //     this.router.navigateByUrl(this.returnUrl);
        //     return;
        // }

        // this.showLoading = false;

        // let lastLoginStr = this.cacheSrv.lastLoginAccount;
        // if (lastLoginStr)
        //     this.loginForm.patchValue(JSON.parse(lastLoginStr));
    }//ngOnInit

    login(){

    }//login

}
