import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';

const c_token = 'dmz_app_token';
const c_token_expires = 'dmz_app_token_expires';
const c_last_login_account = 'dmz_app_last_login_account';
const c_last_lang = 'dmz_app_last_lang';
const c_account_role = 'dmz_app_account_role';
const c_account_name = 'dmz_app_account_name';
const c_account_id = 'dmz_app_account_id';
const c_organization_id = 'dmz_app_organization_id';

@Injectable()
export class AppCacheService {

  private _language: string;
  private _token: string;
  private _tokenExpires: string;
  private _lastLoginAccount: string;
  private _accountId: string;

  set token(vl: string) {
    this._token = vl;
    this.localStoreSrv.setItem(c_token, vl);
  }
  get token() {
    if (!this._token)
      this._token = this.localStoreSrv.getItem(c_token);
    return this._token;
  }
  set tokenExpires(vl: string) {
    this._tokenExpires = vl;
    this.localStoreSrv.setItem(c_token_expires, vl);
  }
  get tokenExpires() {
    if (!this._tokenExpires)
      this._tokenExpires = this.localStoreSrv.getItem(c_token_expires);
    return this._tokenExpires;
  }
  set lastLoginAccount(vl: string) {
    this._lastLoginAccount = vl;
    this.localStoreSrv.setItem(c_last_login_account, vl);
  }
  get lastLoginAccount() {
    if (!this._lastLoginAccount)
      this._lastLoginAccount = this.localStoreSrv.getItem(c_last_login_account);
    return this._lastLoginAccount;
  }
  set lastLanguage(vl: string) {
    this._language = vl;
    this.localStoreSrv.setItem(c_last_lang, vl);
  }
  get lastLanguage() {
    if (!this._language)
      this._language = this.localStoreSrv.getItem(c_last_lang);
    return this._language;
  }
  set accountId(vl: string) {
    this._accountId = vl;
    this.localStoreSrv.setItem(c_account_id, vl);
  }
  get accountId() {
    if (!this._accountId)
      this._accountId = this.localStoreSrv.getItem(c_account_id);
    return this._accountId;
  }

  constructor(protected localStoreSrv: LocalStoreService) {

  }//constructor

  clearToken() {
    this.token = '';
  }

}
