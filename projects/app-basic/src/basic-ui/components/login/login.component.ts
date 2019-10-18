import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../../basic-ms/services/token.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageService, LocalStorageKeyEnum } from "app-common";
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
        private acr: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private tokenSrv: TokenService,
        private storageSrv: LocalStorageService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.acr.queryParams.subscribe(params => this.returnUrl = params['return']);
        console.log('return url:',this.returnUrl);
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

    login() {
        let data = this.loginForm.value;
        this.tokenSrv.login(data.username, data.password)
            .pipe(tap(res => {
                this.storageSrv.setItem(LocalStorageKeyEnum.token, res.token);
            })).subscribe(res => {
                console.log('res', res);
                this.router.navigateByUrl(this.returnUrl ? this.returnUrl : '/');
            });
    }//login

}
