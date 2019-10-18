import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService {

    private _localStorageAvailable = false;
    constructor(
        @Inject(PLATFORM_ID) platformId: string
    ) {
        this._localStorageAvailable = isPlatformBrowser(platformId);
    }//constructor


    setItem(key: string, value: any) {
        if (!this._localStorageAvailable) return;
        localStorage.setItem(key, value);
    }//setItem

    getItem(key: string) {
        if (!this._localStorageAvailable) return;
        return localStorage.getItem(key);
    }//getItem

    removeItem(key: string) {
        if (!this._localStorageAvailable) return;
        return localStorage.removeItem(key);
    }//removeItem

    clear() {
        if (!this._localStorageAvailable) return;
        localStorage.clear();
    }//clear
}
