(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('app-common', ['exports', '@angular/core'], factory) :
	(global = global || self, factory(global['app-common'] = {}, global.ng.core));
}(this, function (exports, core) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
	 */
	/** @type {?} */
	var APISERVER = new core.InjectionToken("default");

	exports.APISERVER = APISERVER;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=app-common.umd.js.map
