"use strict";
(self["webpackChunkvex"] = self["webpackChunkvex"] || []).push([["main"],{

/***/ 3943:
/*!***************************************************!*\
  !*** ./src/@vex/animations/dropdown.animation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dropdownAnimation: () => (/* binding */ dropdownAnimation)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);

const dropdownAnimation = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('dropdown', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('false', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  height: 0,
  opacity: 0
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('true', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  height: '*',
  opacity: 1
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('false <=> true', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('300ms cubic-bezier(.35, 0, .25, 1)'))]);

/***/ }),

/***/ 6412:
/*!**************************************************!*\
  !*** ./src/@vex/animations/popover.animation.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   popoverAnimation: () => (/* binding */ popoverAnimation)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);

const popoverAnimation = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('transformPopover', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(':enter', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 0,
  transform: 'scale(0.6)'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('100ms linear', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 1
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('150ms cubic-bezier(0, 0, 0.2, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'scale(1)'
}))])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(':leave', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 1
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('100ms linear', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 0
}))])]);

/***/ }),

/***/ 6010:
/*!**********************************************************************!*\
  !*** ./src/@vex/components/vex-highlight/vex-highlight.directive.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexHighlightDirective: () => (/* binding */ VexHighlightDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_highlight_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vex-highlight.service */ 8391);



class VexHighlightDirective {
  constructor(_highlightService, _zone) {
    this._highlightService = _highlightService;
    this._zone = _zone;
    /** An optional array of language names and aliases restricting detection to only those languages.
     * The subset can also be set with configure, but the local parameter overrides the option if set.
     */
    this.languages = [];
    /** Stream that emits when code string is highlighted */
    this.highlighted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes['code'] && changes['code'].currentValue !== changes['code'].previousValue) {
      this.highlightElement(this.code, this.languages);
    }
  }
  /**
   * Highlighting with language detection and fix markup.
   * @param code Accepts a string with the code to highlight
   * @param languages An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightElement(code, languages) {
    this._zone.runOutsideAngular(() => {
      const res = this._highlightService.highlightAuto(code, languages);
      this.highlightedCode = res.value;
      this.highlighted.emit(res);
    });
  }
  static #_ = this.ɵfac = function VexHighlightDirective_Factory(t) {
    return new (t || VexHighlightDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_vex_highlight_service__WEBPACK_IMPORTED_MODULE_0__.VexHighlightService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
    type: VexHighlightDirective,
    selectors: [["", "vexHighlight", ""]],
    hostVars: 3,
    hostBindings: function VexHighlightDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵhostProperty"]("innerHTML", ctx.highlightedCode, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("hljs", true);
      }
    },
    inputs: {
      languages: "languages",
      code: ["vexHighlight", "code"]
    },
    outputs: {
      highlighted: "highlighted"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]]
  });
}

/***/ }),

/***/ 3260:
/*!******************************************************************!*\
  !*** ./src/@vex/components/vex-highlight/vex-highlight.model.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VEX_HIGHLIGHT_OPTIONS: () => (/* binding */ VEX_HIGHLIGHT_OPTIONS)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

const VEX_HIGHLIGHT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('HIGHLIGHT_OPTIONS');

/***/ }),

/***/ 5299:
/*!*******************************************************************!*\
  !*** ./src/@vex/components/vex-highlight/vex-highlight.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexHighlightModule: () => (/* binding */ VexHighlightModule),
/* harmony export */   hljsLanguages: () => (/* binding */ hljsLanguages)
/* harmony export */ });
/* harmony import */ var _vex_highlight_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vex-highlight.directive */ 6010);
/* harmony import */ var _vex_highlight_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vex-highlight.model */ 3260);
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highlight.js/lib/languages/xml */ 7158);
/* harmony import */ var highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highlight.js/lib/languages/scss */ 6186);
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! highlight.js/lib/languages/typescript */ 8499);
/* harmony import */ var _vex_highlight_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vex-highlight.service */ 8391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);


/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */





/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
function hljsLanguages() {
  return [{
    name: 'typescript',
    func: highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    name: 'scss',
    func: highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: 'xml',
    func: highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_2__["default"]
  }];
}
class VexHighlightModule {
  static #_ = this.ɵfac = function VexHighlightModule_Factory(t) {
    return new (t || VexHighlightModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: VexHighlightModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    providers: [{
      provide: _vex_highlight_model__WEBPACK_IMPORTED_MODULE_1__.VEX_HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages
      }
    }, _vex_highlight_service__WEBPACK_IMPORTED_MODULE_5__.VexHighlightService]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](VexHighlightModule, {
    imports: [_vex_highlight_directive__WEBPACK_IMPORTED_MODULE_0__.VexHighlightDirective],
    exports: [_vex_highlight_directive__WEBPACK_IMPORTED_MODULE_0__.VexHighlightDirective]
  });
})();

/***/ }),

/***/ 8391:
/*!********************************************************************!*\
  !*** ./src/@vex/components/vex-highlight/vex-highlight.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexHighlightService: () => (/* binding */ VexHighlightService)
/* harmony export */ });
/* harmony import */ var _vex_highlight_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vex-highlight.model */ 3260);
/* harmony import */ var highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js/lib/core */ 3974);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);



class VexHighlightService {
  constructor(options) {
    if (options) {
      // Register HighlightJS languages
      options.languages?.().map(language => this.registerLanguage(language.name, language.func));
      if (options.config) {
        // Set global config if present
        this.configure(options.config);
      }
    }
    // Throw an error if no languages were registered.
    if (this.listLanguages().length < 1) {
      throw new Error('[HighlightJS]: No languages were registered!');
    }
  }
  /**
   * Core highlighting function.
   * @param name Accepts a language name, or an alias
   * @param value A string with the code to highlight.
   * @param ignoreIllegals When present and evaluates to a true value, forces highlighting to finish
   * even in case of detecting illegal syntax for the language instead of throwing an exception.
   * When present, the function will restart parsing from this state instead of initializing a new one
   */
  highlight(name, value, ignoreIllegals) {
    return highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].highlight(name, value, ignoreIllegals);
  }
  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value, languageSubset) {
    return highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].highlightAuto(value, languageSubset);
  }
  /**
   * Applies highlighting to a DOM node containing code.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
   * See the class reference for all available language names and aliases.
   * @param block The element to apply highlight on.
   */
  highlightBlock(block) {
    highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].highlightBlock(block);
  }
  /**
   * Configures global options:
   */
  configure(config) {
    highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].configure(config);
  }
  /**
   * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
   */
  initHighlighting() {
    highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].initHighlighting();
  }
  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param name A string with the name of the language being registered
   * @param language A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(name, language) {
    highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].registerLanguage(name, language);
  }
  /**
   * @return The languages names list.
   */
  listLanguages() {
    return highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].listLanguages();
  }
  /**
   * Looks up a language by name or alias.
   * @param name Language name
   * @return The language object if found, undefined otherwise.
   */
  getLanguage(name) {
    return highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_1__["default"].getLanguage(name);
  }
  static #_ = this.ɵfac = function VexHighlightService_Factory(t) {
    return new (t || VexHighlightService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_vex_highlight_model__WEBPACK_IMPORTED_MODULE_0__.VEX_HIGHLIGHT_OPTIONS));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: VexHighlightService,
    factory: VexHighlightService.ɵfac
  });
}

/***/ }),

/***/ 306:
/*!**************************************************************************!*\
  !*** ./src/@vex/components/vex-page-layout/vex-page-layout.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexPageLayoutComponent: () => (/* binding */ VexPageLayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

const _c0 = ["*"];
class VexPageLayoutComponent {
  constructor() {
    this.mode = 'simple';
  }
  get isCard() {
    return this.mode === 'card';
  }
  get isSimple() {
    return this.mode === 'simple';
  }
  static #_ = this.ɵfac = function VexPageLayoutComponent_Factory(t) {
    return new (t || VexPageLayoutComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: VexPageLayoutComponent,
    selectors: [["vex-page-layout"]],
    hostAttrs: [1, "vex-page-layout"],
    hostVars: 4,
    hostBindings: function VexPageLayoutComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("vex-page-layout-card", ctx.isCard)("vex-page-layout-simple", ctx.isSimple);
      }
    },
    inputs: {
      mode: "mode"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function VexPageLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      }
    },
    styles: [".vex-page-layout {\n  display: block;\n}\n\n.vex-page-layout-simple .vex-page-layout-content {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.vex-page-layout-card {\n  padding-bottom: 1.5rem;\n}\n.vex-page-layout-card .vex-page-layout-header {\n  margin-bottom: calc(var(--vex-page-layout-toolbar-height) * -1);\n  padding-bottom: var(--vex-page-layout-toolbar-height);\n}\n.vex-page-layout-card .vex-page-layout-content > * > .mat-mdc-tab-group .mat-tab-label,\n.vex-page-layout-card .vex-page-layout-content > .mat-tab-group .mat-tab-label {\n  height: var(--vex-page-layout-toolbar-height);\n}\n\n.vex-page-layout-header {\n  align-items: center;\n  background-color: rgb(var(--vex-color-primary-600) / 0.1);\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  box-sizing: content-box !important;\n  display: flex;\n  flex-direction: row;\n  height: calc(var(--vex-page-layout-header-height) - var(--vex-page-layout-toolbar-height));\n  place-content: center flex-start;\n}\n\n.vex-page-layout-content {\n  box-sizing: border-box;\n  display: block;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9AdmV4L2NvbXBvbmVudHMvdmV4LXBhZ2UtbGF5b3V0L3ZleC1wYWdlLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFJSTtFQUFBLG1CQUFBO0VBQUE7QUFBQTs7QUFLRjtFQUFBO0FBQUE7QUFFQTtFQUNFLCtEQUFBO0VBQ0EscURBQUE7QUFESjtBQUtJOztFQUVFLDZDQUFBO0FBSE47O0FBUUE7RUFDRSxtQkFBQTtFQUNBLHlEQUFBO0VBQUEsb0JBQUE7RUFBQSxxQkFBQTtFQUNBLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMEZBQUE7RUFHQSxnQ0FBQTtBQVBGOztBQVVBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7RUFBQSxxQkFBQTtBQVBGIiwic291cmNlc0NvbnRlbnQiOlsiLnZleC1wYWdlLWxheW91dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4udmV4LXBhZ2UtbGF5b3V0LXNpbXBsZSB7XG4gIC52ZXgtcGFnZS1sYXlvdXQtY29udGVudCB7XG4gICAgQGFwcGx5IHB5LTY7XG4gIH1cbn1cblxuLnZleC1wYWdlLWxheW91dC1jYXJkIHtcbiAgQGFwcGx5IHBiLTY7XG5cbiAgLnZleC1wYWdlLWxheW91dC1oZWFkZXIge1xuICAgIG1hcmdpbi1ib3R0b206IGNhbGModmFyKC0tdmV4LXBhZ2UtbGF5b3V0LXRvb2xiYXItaGVpZ2h0KSAqIC0xKTtcbiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tdmV4LXBhZ2UtbGF5b3V0LXRvb2xiYXItaGVpZ2h0KTtcbiAgfVxuXG4gIC52ZXgtcGFnZS1sYXlvdXQtY29udGVudCB7XG4gICAgPiAqID4gLm1hdC1tZGMtdGFiLWdyb3VwIC5tYXQtdGFiLWxhYmVsLFxuICAgID4gLm1hdC10YWItZ3JvdXAgLm1hdC10YWItbGFiZWwge1xuICAgICAgaGVpZ2h0OiB2YXIoLS12ZXgtcGFnZS1sYXlvdXQtdG9vbGJhci1oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG4udmV4LXBhZ2UtbGF5b3V0LWhlYWRlciB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIEBhcHBseSBiZy1wcmltYXJ5LTYwMC8xMCBweC02O1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBoZWlnaHQ6IGNhbGMoXG4gICAgdmFyKC0tdmV4LXBhZ2UtbGF5b3V0LWhlYWRlci1oZWlnaHQpIC0gdmFyKC0tdmV4LXBhZ2UtbGF5b3V0LXRvb2xiYXItaGVpZ2h0KVxuICApO1xuICBwbGFjZS1jb250ZW50OiBjZW50ZXIgZmxleC1zdGFydDtcbn1cblxuLnZleC1wYWdlLWxheW91dC1jb250ZW50IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIEBhcHBseSBweC02O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    encapsulation: 2
  });
}

/***/ }),

/***/ 5925:
/*!************************************************************!*\
  !*** ./src/@vex/components/vex-popover/vex-popover-ref.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexPopoverRef: () => (/* binding */ VexPopoverRef)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2513);

class VexPopoverRef {
  constructor(overlay, content, data) {
    this.overlay = overlay;
    this.content = content;
    this.data = data;
    this.afterClosed = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.afterClosed$ = this.afterClosed.asObservable();
    overlay.backdropClick().subscribe(() => {
      this._close('backdropClick', undefined);
    });
  }
  close(data) {
    this._close('close', data);
  }
  _close(type, data) {
    this.overlay.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}

/***/ }),

/***/ 7930:
/*!******************************************************************!*\
  !*** ./src/@vex/components/vex-popover/vex-popover.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexPopoverComponent: () => (/* binding */ VexPopoverComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _animations_popover_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animations/popover.animation */ 6412);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _vex_popover_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vex-popover-ref */ 5925);





function VexPopoverComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 4);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx_r0.content, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
  }
}
function VexPopoverComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}
function VexPopoverComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, VexPopoverComponent_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.content)("ngTemplateOutletContext", ctx_r1.context);
  }
}
function VexPopoverComponent_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}
function VexPopoverComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, VexPopoverComponent_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngComponentOutlet", ctx_r2.content);
  }
}
class VexPopoverComponent {
  constructor(popoverRef) {
    this.popoverRef = popoverRef;
    this.renderMethod = 'component';
  }
  ngOnInit() {
    this.content = this.popoverRef.content;
    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }
    if (this.content instanceof _angular_core__WEBPACK_IMPORTED_MODULE_2__.TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }
  }
  static #_ = this.ɵfac = function VexPopoverComponent_Factory(t) {
    return new (t || VexPopoverComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_vex_popover_ref__WEBPACK_IMPORTED_MODULE_1__.VexPopoverRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: VexPopoverComponent,
    selectors: [["vex-popover"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 5,
    vars: 5,
    consts: [[1, "vex-popover"], [3, "ngSwitch"], [3, "innerHTML", 4, "ngSwitchCase"], [4, "ngSwitchCase"], [3, "innerHTML"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngComponentOutlet"]],
    template: function VexPopoverComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, VexPopoverComponent_div_2_Template, 1, 1, "div", 2)(3, VexPopoverComponent_ng_container_3_Template, 2, 2, "ng-container", 3)(4, VexPopoverComponent_ng_container_4_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@transformPopover", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitch", ctx.renderMethod);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "template");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "component");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgComponentOutlet],
    styles: ["[_nghost-%COMP%], .vex-popover[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9AdmV4L2NvbXBvbmVudHMvdmV4LXBvcG92ZXIvdmV4LXBvcG92ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsV0FBQTtFQUNBLFlBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0LFxuLnZleC1wb3BvdmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [_animations_popover_animation__WEBPACK_IMPORTED_MODULE_0__.popoverAnimation]
    }
  });
}

/***/ }),

/***/ 563:
/*!****************************************************************!*\
  !*** ./src/@vex/components/vex-popover/vex-popover.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexPopoverService: () => (/* binding */ VexPopoverService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/overlay */ 2698);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ 3517);
/* harmony import */ var _vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vex-popover-ref */ 5925);
/* harmony import */ var _vex_popover_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vex-popover.component */ 7930);







class VexPopoverService {
  constructor(overlay, injector) {
    this.overlay = overlay;
    this.injector = injector;
  }
  open({
    origin,
    content,
    data,
    width,
    height,
    position,
    offsetX,
    offsetY
  }) {
    const overlayRef = this.overlay.create(this.getOverlayConfig({
      origin,
      width,
      height,
      position,
      offsetX,
      offsetY
    }));
    const popoverRef = new _vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__.VexPopoverRef(overlayRef, content, data);
    const injector = this.createInjector(popoverRef, this.injector);
    overlayRef.attach(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.ComponentPortal(_vex_popover_component__WEBPACK_IMPORTED_MODULE_1__.VexPopoverComponent, null, injector));
    return popoverRef;
  }
  static getPositions() {
    return [{
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    }, {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    }];
  }
  createInjector(popoverRef, injector) {
    return _angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector.create({
      providers: [{
        provide: _vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__.VexPopoverRef,
        useValue: popoverRef
      }],
      parent: injector
    });
  }
  getOverlayConfig({
    origin,
    width,
    height,
    position,
    offsetX,
    offsetY
  }) {
    return new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.OverlayConfig({
      hasBackdrop: true,
      width,
      height,
      backdropClass: 'vex-popover-backdrop',
      positionStrategy: this.getOverlayPosition({
        origin,
        position,
        offsetX,
        offsetY
      }),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }
  getOverlayPosition({
    origin,
    position,
    offsetX,
    offsetY
  }) {
    return this.overlay.position().flexibleConnectedTo(origin).withPositions(position || VexPopoverService.getPositions()).withFlexibleDimensions(true).withDefaultOffsetY(offsetY || 0).withDefaultOffsetX(offsetX || 0).withTransformOriginOn('.vex-popover').withPush(true);
  }
  static #_ = this.ɵfac = function VexPopoverService_Factory(t) {
    return new (t || VexPopoverService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: VexPopoverService,
    factory: VexPopoverService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6912:
/*!****************************************************************************!*\
  !*** ./src/@vex/components/vex-progress-bar/vex-progress-bar.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexProgressBarComponent: () => (/* binding */ VexProgressBarComponent)
/* harmony export */ });
/* harmony import */ var _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-loading-bar/core */ 3123);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9134);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 3379);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-bar */ 8173);
/* harmony import */ var _ngx_loading_bar_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-loading-bar/router */ 7350);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);








class VexProgressBarComponent {
  constructor(loader) {
    this.loader = loader;
    this.value$ = this.loader.useRef('router').value$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.delayWhen)(value => value === 0 ? (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.interval)(200) : (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(undefined)));
  }
  static #_ = this.ɵfac = function VexProgressBarComponent_Factory(t) {
    return new (t || VexProgressBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_4__.LoadingBarService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: VexProgressBarComponent,
    selectors: [["vex-progress-bar"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([{
      provide: _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_4__.LOADING_BAR_CONFIG,
      useValue: {
        latencyThreshold: 80
      }
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 9,
    consts: [["mode", "determinate", 1, "progress-bar", 3, "value"]],
    template: function VexProgressBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-progress-bar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("visible", ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 3, ctx.value$)) !== null && tmp_0_0 !== undefined ? tmp_0_0 : 0) > 0 && ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 5, ctx.value$)) !== null && tmp_0_0 !== undefined ? tmp_0_0 : 0) !== 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 7, ctx.value$)) !== null && tmp_1_0 !== undefined ? tmp_1_0 : 0);
      }
    },
    dependencies: [_angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__.MatProgressBarModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__.MatProgressBar, _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_4__.LoadingBarModule, _ngx_loading_bar_router__WEBPACK_IMPORTED_MODULE_6__.LoadingBarRouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
    styles: [".progress-bar[_ngcontent-%COMP%] {\n  left: 0;\n  opacity: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  visibility: hidden;\n  z-index: 99999;\n  transition: opacity 500ms cubic-bezier(0.25, 0.8, 0.25, 1) 200ms, visibility 0ms cubic-bezier(0.25, 0.8, 0.25, 1) 700ms;\n}\n.progress-bar.visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transition: opacity 500ms cubic-bezier(0.25, 0.8, 0.25, 1), visibility 0ms cubic-bezier(0.25, 0.8, 0.25, 1) 0ms;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9AdmV4L2NvbXBvbmVudHMvdmV4LXByb2dyZXNzLWJhci92ZXgtcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0UsT0FBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLE1BQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSx1SEFBQTtBQUZGO0FBS0U7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSwrR0FBQTtBQUhKIiwic291cmNlc0NvbnRlbnQiOlsiJHRyYW5zaXRpb24tZHVyYXRpb246IDUwMG1zO1xuJHRyYW5zaXRpb24tZGVsYXk6IDIwMG1zO1xuXG4ucHJvZ3Jlc3MtYmFyIHtcbiAgbGVmdDogMDtcbiAgb3BhY2l0eTogMDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHotaW5kZXg6IDk5OTk5O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5ICR0cmFuc2l0aW9uLWR1cmF0aW9uIHRoZW1lKFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uLm91dC1zd2lmdFwiKSAkdHJhbnNpdGlvbi1kZWxheSxcbiAgdmlzaWJpbGl0eSAwbXMgdGhlbWUoXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24ub3V0LXN3aWZ0XCIpICgkdHJhbnNpdGlvbi1kdXJhdGlvbiArICR0cmFuc2l0aW9uLWRlbGF5KTtcblxuICAmLnZpc2libGUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5ICR0cmFuc2l0aW9uLWR1cmF0aW9uIHRoZW1lKFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uLm91dC1zd2lmdFwiKSxcbiAgICB2aXNpYmlsaXR5IDBtcyB0aGVtZShcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbi5vdXQtc3dpZnRcIikgMG1zO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 9844:
/*!**********************************************************************!*\
  !*** ./src/@vex/components/vex-scrollbar/vex-scrollbar.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexScrollbarComponent: () => (/* binding */ VexScrollbarComponent)
/* harmony export */ });
/* harmony import */ var simplebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar */ 2163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);


const _c0 = ["*"];
class VexScrollbarComponent {
  constructor(_element, zone) {
    this._element = _element;
    this.zone = zone;
  }
  ngAfterContentInit() {
    this.zone.runOutsideAngular(() => {
      this.scrollbarRef = new simplebar__WEBPACK_IMPORTED_MODULE_0__["default"](this._element.nativeElement, this.options);
    });
  }
  ngOnDestroy() {
    /**
     * Exists, but not typed in the type definition
     * https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/src/simplebar.js#L903
     */
    if (this.scrollbarRef && this.scrollbarRef.unMount) {
      this.scrollbarRef.unMount();
    }
  }
  static #_ = this.ɵfac = function VexScrollbarComponent_Factory(t) {
    return new (t || VexScrollbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: VexScrollbarComponent,
    selectors: [["vex-scrollbar"]],
    hostAttrs: [1, "vex-scrollbar"],
    inputs: {
      options: "options"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function VexScrollbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
      }
    },
    styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9AdmV4L2NvbXBvbmVudHMvdmV4LXNjcm9sbGJhci92ZXgtc2Nyb2xsYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1pbi1oZWlnaHQ6IDA7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 483:
/*!******************************************************************!*\
  !*** ./src/@vex/components/vex-sidebar/vex-sidebar.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexSidebarComponent: () => (/* binding */ VexSidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);


const _c0 = ["*"];
class VexSidebarComponent {
  constructor(document) {
    this.document = document;
    this.position = 'left';
    this.invisibleBackdrop = false;
    this._opened = false;
  }
  get opened() {
    return this._opened;
  }
  set opened(opened) {
    this._opened = opened;
    opened ? this.enableScrollblock() : this.disableScrollblock();
  }
  get positionLeft() {
    return this.position === 'left';
  }
  get positionRight() {
    return this.position === 'right';
  }
  enableScrollblock() {
    if (!this.document.body.classList.contains('vex-scrollblock')) {
      this.document.body.classList.add('vex-scrollblock');
    }
  }
  disableScrollblock() {
    if (this.document.body.classList.contains('vex-scrollblock')) {
      this.document.body.classList.remove('vex-scrollblock');
    }
  }
  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }
  ngOnDestroy() {}
  static #_ = this.ɵfac = function VexSidebarComponent_Factory(t) {
    return new (t || VexSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: VexSidebarComponent,
    selectors: [["vex-sidebar"]],
    hostAttrs: [1, "vex-sidebar"],
    inputs: {
      position: "position",
      invisibleBackdrop: "invisibleBackdrop",
      opened: "opened"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c0,
    decls: 3,
    vars: 10,
    consts: [[1, "backdrop", 3, "click"], [1, "sidebar"]],
    template: function VexSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VexSidebarComponent_Template_div_click_0_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opaque", ctx.invisibleBackdrop)("show", ctx.opened);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("open", ctx.opened)("position-left", ctx.positionLeft)("position-right", ctx.positionRight);
      }
    },
    styles: [".sidebar[_ngcontent-%COMP%] {\n  background: var(--vex-background-card);\n  bottom: 0;\n  display: flex;\n  flex: 1 0 auto;\n  flex-direction: column;\n  max-width: 80vw;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: fixed;\n  top: 0;\n  transition-duration: 400ms;\n  transition-property: transform, visibility;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  visibility: hidden;\n  width: var(--vex-sidenav-width);\n  z-index: 1000;\n  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n@media (min-width: 600px) {\n  .sidebar[_ngcontent-%COMP%] {\n    max-width: unset;\n  }\n}\n.sidebar.position-left[_ngcontent-%COMP%] {\n  left: 0;\n  transform: translateX(-100%);\n}\n.sidebar.position-right[_ngcontent-%COMP%] {\n  right: 0;\n  transform: translateX(100%);\n}\n.sidebar.open[_ngcontent-%COMP%] {\n  transform: translateX(0);\n  visibility: visible;\n}\n\n.backdrop[_ngcontent-%COMP%] {\n  background-color: transparent;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  transition-duration: 400ms;\n  transition-property: background-color, visibility;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  visibility: hidden;\n  z-index: 800 !important;\n}\n.backdrop.show[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.6);\n  visibility: visible;\n}\n.backdrop.opaque[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9AdmV4L2NvbXBvbmVudHMvdmV4LXNpZGViYXIvdmV4LXNpZGViYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQ0FBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLDBCQUFBO0VBQ0EsMENBQUE7RUFDQSw0REFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsZ0ZBQUE7RUFBQSxvR0FBQTtFQUFBLHVHQUFBO0FBQ0Y7QUFDRTtFQW5CRjtJQW9CSSxnQkFBQTtFQUVGO0FBQ0Y7QUFBRTtFQUNFLE9BQUE7RUFDQSw0QkFBQTtBQUVKO0FBQ0U7RUFDRSxRQUFBO0VBQ0EsMkJBQUE7QUFDSjtBQUVFO0VBQ0Usd0JBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUlBO0VBQ0UsNkJBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLE1BQUE7RUFDQSwwQkFBQTtFQUNBLGlEQUFBO0VBQ0EsNERBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0FBREY7QUFHRTtFQUNFLG9DQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUlFO0VBQ0UsNkJBQUE7QUFGSiIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlYmFyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdmV4LWJhY2tncm91bmQtY2FyZCk7XG4gIGJvdHRvbTogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMSAwIGF1dG87XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1heC13aWR0aDogODB2dztcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdGhlbWUoXCJ0cmFuc2l0aW9uRHVyYXRpb24uNDAwXCIpO1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIHZpc2liaWxpdHk7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiB0aGVtZShcInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbi5vdXQtc3dpZnRcIik7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgd2lkdGg6IHZhcigtLXZleC1zaWRlbmF2LXdpZHRoKTtcbiAgei1pbmRleDogMTAwMDtcbiAgQGFwcGx5IHNoYWRvdy14bDtcblxuICBAc2NyZWVuIHNtIHtcbiAgICBtYXgtd2lkdGg6IHVuc2V0O1xuICB9XG5cbiAgJi5wb3NpdGlvbi1sZWZ0IHtcbiAgICBsZWZ0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gIH1cblxuICAmLnBvc2l0aW9uLXJpZ2h0IHtcbiAgICByaWdodDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cblxuICAmLm9wZW4ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB9XG59XG5cbi5iYWNrZHJvcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNDAwbXM7XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQtY29sb3IsIHZpc2liaWxpdHk7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiA4MDAgIWltcG9ydGFudDtcblxuICAmLnNob3cge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB9XG5cbiAgJi5vcGFxdWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 7892:
/*!*****************************************!*\
  !*** ./src/@vex/config/config.token.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VEX_CONFIG: () => (/* binding */ VEX_CONFIG),
/* harmony export */   VEX_THEMES: () => (/* binding */ VEX_THEMES)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

const VEX_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('VEX_CONFIG');
const VEX_THEMES = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('VEX_THEMES');

/***/ }),

/***/ 6739:
/*!**************************************!*\
  !*** ./src/@vex/config/constants.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultRoundedButtonBorderRadius: () => (/* binding */ defaultRoundedButtonBorderRadius)
/* harmony export */ });
const defaultRoundedButtonBorderRadius = {
  value: 9999,
  unit: 'px'
};

/***/ }),

/***/ 5062:
/*!*************************************************!*\
  !*** ./src/@vex/config/vex-config.interface.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexColorScheme: () => (/* binding */ VexColorScheme),
/* harmony export */   VexConfigName: () => (/* binding */ VexConfigName),
/* harmony export */   VexTheme: () => (/* binding */ VexTheme)
/* harmony export */ });
var VexTheme;
(function (VexTheme) {
  VexTheme["DEFAULT"] = "vex-theme-default";
  VexTheme["TEAL"] = "vex-theme-teal";
})(VexTheme || (VexTheme = {}));
var VexConfigName;
(function (VexConfigName) {
  VexConfigName["apollo"] = "apollo";
  VexConfigName["zeus"] = "zeus";
  VexConfigName["hermes"] = "hermes";
  VexConfigName["poseidon"] = "poseidon";
  VexConfigName["ares"] = "ares";
  VexConfigName["ikaros"] = "ikaros";
})(VexConfigName || (VexConfigName = {}));
var VexColorScheme;
(function (VexColorScheme) {
  VexColorScheme["LIGHT"] = "light";
  VexColorScheme["DARK"] = "dark";
})(VexColorScheme || (VexColorScheme = {}));

/***/ }),

/***/ 376:
/*!***********************************************!*\
  !*** ./src/@vex/config/vex-config.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexConfigService: () => (/* binding */ VexConfigService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/merge-deep */ 4567);
/* harmony import */ var _vex_configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vex-configs */ 9794);
/* harmony import */ var _vex_config_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vex-config.interface */ 5062);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var _vex_config_config_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/config/config.token */ 7892);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_vex_layout_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/vex-layout.service */ 4952);









class VexConfigService {
  constructor(config, themes, document, layoutService) {
    this.config = config;
    this.themes = themes;
    this.document = document;
    this.layoutService = layoutService;
    this.configMap = _vex_configs__WEBPACK_IMPORTED_MODULE_1__.vexConfigs;
    this.configs = Object.values(this.configMap);
    this._configSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(this.config);
    this.config$.subscribe(config => this._updateConfig(config));
  }
  get config$() {
    return this._configSubject.asObservable();
  }
  select(selector) {
    return this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(selector));
  }
  setConfig(configName) {
    const settings = this.configMap[configName];
    if (!settings) {
      throw new Error(`Config with name '${configName}' does not exist!`);
    }
    this._configSubject.next(settings);
  }
  updateConfig(config) {
    this._configSubject.next((0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)({
      ...this._configSubject.getValue()
    }, config));
  }
  _updateConfig(config) {
    this._setLayoutClass(config.bodyClass);
    this._setStyle(config.style);
    this._setDensity();
    this._setDirection(config.direction);
    this._setSidenavState(config.sidenav.state);
    this._emitResize();
  }
  _setStyle(style) {
    /**
     * Set light/dark mode
     */
    switch (style.colorScheme) {
      case _vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.LIGHT:
        this.document.body.classList.remove(_vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.DARK);
        this.document.body.classList.add(_vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.LIGHT);
        break;
      case _vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.DARK:
        this.document.body.classList.remove(_vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.LIGHT);
        this.document.body.classList.add(_vex_config_interface__WEBPACK_IMPORTED_MODULE_2__.VexColorScheme.DARK);
        break;
    }
    /**
     * Set theme class
     */
    this.document.body.classList.remove(...this.themes.map(t => t.className));
    this.document.body.classList.add(style.themeClassName);
    /**
     * Border Radius
     */
    this.document.body.style.setProperty('--vex-border-radius', `${style.borderRadius.value}${style.borderRadius.unit}`);
    const buttonBorderRadius = style.button.borderRadius ?? style.borderRadius;
    this.document.body.style.setProperty('--vex-button-border-radius', `${buttonBorderRadius.value}${buttonBorderRadius.unit}`);
  }
  _setDensity() {
    if (!this.document.body.classList.contains('vex-mat-dense-default')) {
      this.document.body.classList.add('vex-mat-dense-default');
    }
  }
  /**
   * Emit event so charts and other external libraries know they have to resize on layout switch
   * @private
   */
  _emitResize() {
    if (window) {
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    }
  }
  _setDirection(direction) {
    this.document.body.dir = direction;
  }
  _setSidenavState(sidenavState) {
    sidenavState === 'expanded' ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
  _setLayoutClass(bodyClass) {
    this.configs.forEach(c => {
      if (this.document.body.classList.contains(c.bodyClass)) {
        this.document.body.classList.remove(c.bodyClass);
      }
    });
    this.document.body.classList.add(bodyClass);
  }
  static #_ = this.ɵfac = function VexConfigService_Factory(t) {
    return new (t || VexConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_vex_config_config_token__WEBPACK_IMPORTED_MODULE_3__.VEX_CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_vex_config_config_token__WEBPACK_IMPORTED_MODULE_3__.VEX_THEMES), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_4__.VexLayoutService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: VexConfigService,
    factory: VexConfigService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9794:
/*!****************************************!*\
  !*** ./src/@vex/config/vex-configs.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   vexConfigs: () => (/* binding */ vexConfigs)
/* harmony export */ });
/* harmony import */ var _utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/merge-deep */ 4567);
/* harmony import */ var _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vex-config.interface */ 5062);
/* harmony import */ var _vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vex/utils/deep-clone */ 2928);



const baseConfig = {
  id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.apollo,
  name: 'Apollo',
  bodyClass: 'vex-layout-apollo',
  style: {
    themeClassName: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexTheme.DEFAULT,
    colorScheme: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexColorScheme.LIGHT,
    borderRadius: {
      value: 0.5,
      unit: 'rem'
    },
    button: {
      borderRadius: {
        value: 9999,
        unit: 'px'
      }
    }
  },
  direction: 'ltr',
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/apollo.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    title: 'VEX',
    imageUrl: 'assets/img/logo/logo.svg',
    showCollapsePin: true,
    user: {
      visible: true
    },
    search: {
      visible: true
    },
    state: 'expanded'
  },
  toolbar: {
    fixed: true,
    user: {
      visible: true
    }
  },
  navbar: {
    position: 'below-toolbar'
  },
  footer: {
    visible: true,
    fixed: true
  }
};
const vexConfigs = {
  apollo: baseConfig,
  poseidon: (0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)((0,_vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__["default"])(baseConfig), {
    id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.poseidon,
    name: 'Poseidon',
    bodyClass: 'vex-layout-poseidon',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/poseidon.png',
    sidenav: {
      user: {
        visible: true
      },
      search: {
        visible: true
      }
    },
    toolbar: {
      user: {
        visible: false
      }
    }
  }),
  hermes: (0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)((0,_vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__["default"])(baseConfig), {
    id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.hermes,
    name: 'Hermes',
    bodyClass: 'vex-layout-hermes',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/hermes.png',
    layout: 'vertical',
    boxed: true,
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    footer: {
      fixed: false
    }
  }),
  ares: (0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)((0,_vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__["default"])(baseConfig), {
    id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.ares,
    name: 'Ares',
    bodyClass: 'vex-layout-ares',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  }),
  zeus: (0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)((0,_vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__["default"])(baseConfig), {
    id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.zeus,
    name: 'Zeus',
    bodyClass: 'vex-layout-zeus',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/zeus.png',
    sidenav: {
      state: 'collapsed'
    }
  }),
  ikaros: (0,_utils_merge_deep__WEBPACK_IMPORTED_MODULE_0__.mergeDeep)((0,_vex_utils_deep_clone__WEBPACK_IMPORTED_MODULE_2__["default"])(baseConfig), {
    id: _vex_config_interface__WEBPACK_IMPORTED_MODULE_1__.VexConfigName.ikaros,
    name: 'Ikaros',
    bodyClass: 'vex-layout-ikaros',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ikaros.png',
    layout: 'vertical',
    boxed: true,
    sidenav: {
      user: {
        visible: false
      },
      search: {
        visible: false
      }
    },
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  })
};

/***/ }),

/***/ 1031:
/*!**********************************************************************************!*\
  !*** ./src/@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexDateFormatRelativePipe: () => (/* binding */ VexDateFormatRelativePipe)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ 7765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);


class VexDateFormatRelativePipe {
  transform(value, ...args) {
    if (!value) {
      return;
    }
    if (!(value instanceof luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime)) {
      value = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(value);
    }
    return value.toRelative();
  }
  static #_ = this.ɵfac = function VexDateFormatRelativePipe_Factory(t) {
    return new (t || VexDateFormatRelativePipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "vexDateFormatRelative",
    type: VexDateFormatRelativePipe,
    pure: true,
    standalone: true
  });
}

/***/ }),

/***/ 7374:
/*!***********************************************!*\
  !*** ./src/@vex/services/vex-demo.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexDemoService: () => (/* binding */ VexDemoService)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ 5998);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);






class VexDemoService {
  constructor(router, configService) {
    this.router = router;
    this.configService = configService;
    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd)).subscribe(event => {
      const route = this.router.routerState.root.snapshot;
      if (route.queryParamMap.has('layout')) {
        this.configService.setConfig(route.queryParamMap.get('layout'));
      }
      if (route.queryParamMap.has('style')) {
        this.configService.updateConfig({
          style: {
            colorScheme: route.queryParamMap.get('style')
          }
        });
      }
      // TODO: Adjust primaryColor queryParam and see where it was used?
      const theme = route.queryParamMap.get('theme');
      if (theme) {
        this.configService.updateConfig({
          style: {
            themeClassName: theme
          }
        });
      }
      if (route.queryParamMap.has('rtl')) {
        this.configService.updateConfig({
          direction: (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__.coerceBooleanProperty)(route.queryParamMap.get('rtl')) ? 'rtl' : 'ltr'
        });
      }
    });
  }
  static #_ = this.ɵfac = function VexDemoService_Factory(t) {
    return new (t || VexDemoService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_0__.VexConfigService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: VexDemoService,
    factory: VexDemoService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 4952:
/*!*************************************************!*\
  !*** ./src/@vex/services/vex-layout.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexLayoutService: () => (/* binding */ VexLayoutService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/layout */ 9743);






class VexLayoutService {
  constructor(breakpointObserver) {
    this.breakpointObserver = breakpointObserver;
    this._quickpanelOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.quickpanelOpen$ = this._quickpanelOpenSubject.asObservable();
    this._sidenavOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.sidenavOpen$ = this._sidenavOpenSubject.asObservable();
    this._sidenavCollapsedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.sidenavCollapsed$ = this._sidenavCollapsedSubject.asObservable();
    this._sidenavCollapsedOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.sidenavCollapsedOpen$ = this._sidenavCollapsedOpenSubject.asObservable();
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_1__.DestroyRef);
    this._configPanelOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this._searchOpen = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.searchOpen$ = this._searchOpen.asObservable();
    this.isDesktop$ = this.breakpointObserver.observe(`(min-width: 1280px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.ltLg$ = this.breakpointObserver.observe(`(max-width: 1279px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.gtMd$ = this.breakpointObserver.observe(`(min-width: 960px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.ltMd$ = this.breakpointObserver.observe(`(max-width: 959px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.gtSm$ = this.breakpointObserver.observe(`(min-width: 600px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.isMobile$ = this.breakpointObserver.observe(`(max-width: 599px)`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.matches));
    this.isLtLg = () => this.breakpointObserver.isMatched(`(max-width: 1279px)`);
    this.isMobile = () => this.breakpointObserver.isMatched(`(max-width: 599px)`);
    this.configPanelOpen$ = this._configPanelOpenSubject.asObservable();
    /**
     * Expand Sidenav when we switch from mobile to desktop view
     */
    this.isDesktop$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(matches => !matches), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.expandSidenav());
  }
  openQuickpanel() {
    this._quickpanelOpenSubject.next(true);
  }
  closeQuickpanel() {
    this._quickpanelOpenSubject.next(false);
  }
  openSidenav() {
    this._sidenavOpenSubject.next(true);
  }
  closeSidenav() {
    this._sidenavOpenSubject.next(false);
  }
  collapseSidenav() {
    this._sidenavCollapsedSubject.next(true);
  }
  expandSidenav() {
    this._sidenavCollapsedSubject.next(false);
  }
  collapseOpenSidenav() {
    this._sidenavCollapsedOpenSubject.next(true);
  }
  collapseCloseSidenav() {
    this._sidenavCollapsedOpenSubject.next(false);
  }
  openConfigpanel() {
    this._configPanelOpenSubject.next(true);
  }
  closeConfigpanel() {
    this._configPanelOpenSubject.next(false);
  }
  openSearch() {
    this._searchOpen.next(true);
  }
  closeSearch() {
    this._searchOpen.next(false);
  }
  static #_ = this.ɵfac = function VexLayoutService_Factory(t) {
    return new (t || VexLayoutService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__.BreakpointObserver));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: VexLayoutService,
    factory: VexLayoutService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 2355:
/*!***************************************************!*\
  !*** ./src/@vex/services/vex-platform.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexPlatformService: () => (/* binding */ VexPlatformService)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 3274);



class VexPlatformService {
  constructor(document, rendererFactory2, platform) {
    this.document = document;
    this.rendererFactory2 = rendererFactory2;
    this.platform = platform;
    const renderer = this.rendererFactory2.createRenderer(null, null);
    if (this.platform.BLINK) {
      renderer.addClass(this.document.body, 'is-blink');
    }
  }
  static #_ = this.ɵfac = function VexPlatformService_Factory(t) {
    return new (t || VexPlatformService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.RendererFactory2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: VexPlatformService,
    factory: VexPlatformService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 1353:
/*!********************************************************!*\
  !*** ./src/@vex/services/vex-splash-screen.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VexSplashScreenService: () => (/* binding */ VexSplashScreenService)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 1527);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);







class VexSplashScreenService {
  constructor(router, document, animationBuilder) {
    this.router = router;
    this.document = document;
    this.animationBuilder = animationBuilder;
    this.splashScreenElem = this.document.body.querySelector('#vex-splash-screen') ?? undefined;
    if (this.splashScreenElem) {
      this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1)).subscribe(() => this.hide());
    }
  }
  hide() {
    const player = this.animationBuilder.build([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.style)({
      opacity: 1
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.animate)('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_3__.style)({
      opacity: 0
    }))]).create(this.splashScreenElem);
    player.onDone(() => this.splashScreenElem?.remove());
    player.play();
  }
  static #_ = this.ɵfac = function VexSplashScreenService_Factory(t) {
    return new (t || VexSplashScreenService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_animations__WEBPACK_IMPORTED_MODULE_3__.AnimationBuilder));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: VexSplashScreenService,
    factory: VexSplashScreenService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9681:
/*!****************************************************!*\
  !*** ./src/@vex/utils/check-router-childs-data.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkRouterChildsData: () => (/* binding */ checkRouterChildsData),
/* harmony export */   getAllParams: () => (/* binding */ getAllParams)
/* harmony export */ });
function checkRouterChildsData(route, compareWith) {
  if (compareWith(route.data)) {
    return true;
  }
  if (!route.firstChild) {
    return false;
  }
  return checkRouterChildsData(route.firstChild, compareWith);
}
/**
 * Used to get params from children in their parent
 */
function getAllParams(route, result = new Map()) {
  if (route.params) {
    for (const key of Object.keys(route.params)) {
      result.set(key, route.params[key]);
    }
  }
  if (!route.firstChild) {
    return result;
  }
  return getAllParams(route.firstChild, result);
}

/***/ }),

/***/ 2928:
/*!**************************************!*\
  !*** ./src/@vex/utils/deep-clone.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function deepClone(obj) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }
  const copy = {};
  Object.keys(obj).forEach(key => {
    copy[key] = deepClone(obj[key]);
  });
  return copy;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deepClone);

/***/ }),

/***/ 5832:
/*!**********************************!*\
  !*** ./src/@vex/utils/is-nil.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNil: () => (/* binding */ isNil)
/* harmony export */ });
function isNil(value) {
  return value == null;
}

/***/ }),

/***/ 4567:
/*!**************************************!*\
  !*** ./src/@vex/utils/merge-deep.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeDeep: () => (/* binding */ mergeDeep)
/* harmony export */ });
/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function mergeDeep(target, source) {
  const isObject = obj => obj && typeof obj === 'object';
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}

/***/ }),

/***/ 7637:
/*!************************************!*\
  !*** ./src/@vex/utils/track-by.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackById: () => (/* binding */ trackById),
/* harmony export */   trackByKey: () => (/* binding */ trackByKey),
/* harmony export */   trackByLabel: () => (/* binding */ trackByLabel),
/* harmony export */   trackByRoute: () => (/* binding */ trackByRoute),
/* harmony export */   trackByValue: () => (/* binding */ trackByValue)
/* harmony export */ });
function trackByRoute(index, item) {
  return item.route;
}
function trackById(index, item) {
  return item.id;
}
function trackByKey(index, item) {
  return item.key;
}
function trackByValue(index, value) {
  return value;
}
function trackByLabel(index, value) {
  return value.label;
}

/***/ }),

/***/ 7463:
/*!**********************************!*\
  !*** ./src/@vex/vex.provider.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideVex: () => (/* binding */ provideVex)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _vex_services_vex_splash_screen_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/services/vex-splash-screen.service */ 1353);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _vex_services_vex_demo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vex/services/vex-demo.service */ 7374);
/* harmony import */ var _vex_services_vex_platform_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/services/vex-platform.service */ 2355);
/* harmony import */ var _vex_config_config_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vex/config/config.token */ 7892);
/* harmony import */ var _vex_components_vex_highlight_vex_highlight_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vex/components/vex-highlight/vex-highlight.module */ 5299);









function provideVex(options) {
  return [(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_vex_components_vex_highlight_vex_highlight_module__WEBPACK_IMPORTED_MODULE_5__.VexHighlightModule), {
    provide: _vex_config_config_token__WEBPACK_IMPORTED_MODULE_4__.VEX_CONFIG,
    useValue: options.config
  }, {
    provide: _vex_config_config_token__WEBPACK_IMPORTED_MODULE_4__.VEX_THEMES,
    useValue: options.availableThemes
  }, {
    provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MATERIAL_SANITY_CHECKS,
    useValue: {
      doctype: true,
      theme: false,
      version: true
    }
  }, {
    provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {
      appearance: 'outline'
    }
  }, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_vex_services_vex_splash_screen_service__WEBPACK_IMPORTED_MODULE_0__.VexSplashScreenService),
    multi: true
  }, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_1__.VexLayoutService),
    multi: true
  }, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_vex_services_vex_platform_service__WEBPACK_IMPORTED_MODULE_3__.VexPlatformService),
    multi: true
  }, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_vex_services_vex_demo_service__WEBPACK_IMPORTED_MODULE_2__.VexDemoService),
    multi: true
  }];
}

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);


class AppComponent {
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["vex-root"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    encapsulation: 2
  });
}

/***/ }),

/***/ 7110:
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.routes */ 2016);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 8740);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _core_icons_icons_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/icons/icons.provider */ 214);
/* harmony import */ var _core_luxon_luxon_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/luxon/luxon.provider */ 310);
/* harmony import */ var _vex_vex_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/vex.provider */ 7463);
/* harmony import */ var _core_navigation_navigation_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/navigation/navigation.provider */ 2528);
/* harmony import */ var _vex_config_vex_configs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vex/config/vex-configs */ 9794);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-quill */ 1363);















const appConfig = {
  providers: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.importProvidersFrom)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogModule, _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_9__.MatBottomSheetModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatNativeDateModule), (0,_angular_router__WEBPACK_IMPORTED_MODULE_11__.provideRouter)(_app_routes__WEBPACK_IMPORTED_MODULE_0__.appRoutes,
  // TODO: Add preloading withPreloading(),
  (0,_angular_router__WEBPACK_IMPORTED_MODULE_11__.withInMemoryScrolling)({
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.provideAnimations)(), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_13__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_13__.withInterceptorsFromDi)()), (0,_vex_vex_provider__WEBPACK_IMPORTED_MODULE_3__.provideVex)({
    /**
     * The config that will be used by default.
     * This can be changed at runtime via the config panel or using the VexConfigService.
     */
    config: _vex_config_vex_configs__WEBPACK_IMPORTED_MODULE_5__.vexConfigs.poseidon,
    /**
     * Only themes that are available in the config in tailwind.config.ts should be listed here.
     * Any theme not listed here will not be available in the config panel.
     */
    availableThemes: [{
      name: 'Default',
      className: 'vex-theme-default'
    }, {
      name: 'Teal',
      className: 'vex-theme-teal'
    }, {
      name: 'Green',
      className: 'vex-theme-green'
    }, {
      name: 'Purple',
      className: 'vex-theme-purple'
    }, {
      name: 'Red',
      className: 'vex-theme-red'
    }, {
      name: 'Orange',
      className: 'vex-theme-orange'
    }]
  }), (0,_core_navigation_navigation_provider__WEBPACK_IMPORTED_MODULE_4__.provideNavigation)(), (0,_core_icons_icons_provider__WEBPACK_IMPORTED_MODULE_1__.provideIcons)(), (0,_core_luxon_luxon_provider__WEBPACK_IMPORTED_MODULE_2__.provideLuxon)(), (0,ngx_quill__WEBPACK_IMPORTED_MODULE_14__.provideQuillConfig)({
    modules: {
      toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{
        list: 'ordered'
      }, {
        list: 'bullet'
      }], [{
        header: [1, 2, 3, 4, 5, 6, false]
      }], ['clean'], ['link', 'image']]
    }
  })]
};

/***/ }),

/***/ 2016:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appRoutes: () => (/* binding */ appRoutes)
/* harmony export */ });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 6459);
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/login/login.component */ 6666);
/* harmony import */ var _layouts_layout_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layouts/layout/layout.component */ 8349);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guards/auth.guard */ 1391);




/**
 * Routes configuration
 * - Login is the default route for unauthenticated users
 * - Home and other routes are protected by AuthGuard
 */
const appRoutes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
}, {
  path: 'home',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
}, {
  path: 'app',
  component: _layouts_layout_layout_component__WEBPACK_IMPORTED_MODULE_2__.LayoutComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard],
  children: [
    // add other child routes here, for example:
    // { path: 'dashboard', component: DashboardComponent }
  ]
}];

/***/ }),

/***/ 9639:
/*!*********************************************************************!*\
  !*** ./src/app/components/generic-table/generic-table.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenericTableComponent: () => (/* binding */ GenericTableComponent),
/* harmony export */   JsonModalComponent: () => (/* binding */ JsonModalComponent),
/* harmony export */   ModalDialogComponent: () => (/* binding */ ModalDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 6798);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 7401);












function GenericTableComponent_ng_container_2_th_1_span_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u25B2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function GenericTableComponent_ng_container_2_th_1_span_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u25BC");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function GenericTableComponent_ng_container_2_th_1_span_4_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u21C5");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function GenericTableComponent_ng_container_2_th_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GenericTableComponent_ng_container_2_th_1_span_4_span_1_Template, 2, 0, "span", 14)(2, GenericTableComponent_ng_container_2_th_1_span_4_span_2_Template, 2, 0, "span", 14)(3, GenericTableComponent_ng_container_2_th_1_span_4_span_3_Template, 2, 0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.sortColumn === col_r5.property && ctx_r8.sortDirection === "asc");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.sortColumn === col_r5.property && ctx_r8.sortDirection === "desc");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.sortColumn !== col_r5.property);
  }
}
function GenericTableComponent_ng_container_2_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_ng_container_2_th_1_Template_th_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.isSortable(col_r5.property) ? ctx_r13.toggleSort(col_r5.property) : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, GenericTableComponent_ng_container_2_th_1_span_4_Template, 4, 3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("sortable", ctx_r6.isSortable(col_r5.property));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](col_r5.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.isSortable(col_r5.property));
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 18)(2, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r18.cellValue(element_r17, col_r5.property) === "1" ? "sent" : "not-sent");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r18.cellValue(element_r17, col_r5.property) === "1" ? "send" : "cancel_schedule_send", " ");
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_ng_container_2_td_2_ng_container_2_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28);
      const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r26.openModal(element_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " visibility ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_ng_container_2_td_2_ng_container_3_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31);
      const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r29.openJsonModal(element_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_ng_container_2_td_2_ng_container_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r34);
      const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r32.openSalesForceLink(element_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " open_in_new ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r21.isSalesForceAvailable(element_r17))("title", ctx_r21.isSalesForceAvailable(element_r17) ? "Ver en Salesforce" : "No disponible en Salesforce");
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 25)(2, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r22.isResultSFSuccess(element_r17) ? "sent" : "not-sent")("title", ctx_r22.cellValue(element_r17, col_r5.property));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r22.isResultSFSuccess(element_r17) ? "check_circle" : "error", " ");
  }
}
function GenericTableComponent_ng_container_2_td_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const element_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r23.cellValue(element_r17, col_r5.property), " ");
  }
}
function GenericTableComponent_ng_container_2_td_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GenericTableComponent_ng_container_2_td_2_ng_container_1_Template, 4, 2, "ng-container", 14)(2, GenericTableComponent_ng_container_2_td_2_ng_container_2_Template, 4, 0, "ng-container", 14)(3, GenericTableComponent_ng_container_2_td_2_ng_container_3_Template, 4, 0, "ng-container", 14)(4, GenericTableComponent_ng_container_2_td_2_ng_container_4_Template, 4, 2, "ng-container", 14)(5, GenericTableComponent_ng_container_2_td_2_ng_container_5_Template, 4, 3, "ng-container", 14)(6, GenericTableComponent_ng_container_2_td_2_ng_container_6_Template, 2, 1, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.property === "sendedSalesForce");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.type === "button" && col_r5.property === "actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.property === "sf_jsonRequest" && col_r5.type === "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.property === "sf_link" && col_r5.type === "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.property === "resultSF");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", col_r5.type !== "button" && col_r5.property !== "sendedSalesForce" && col_r5.property !== "resultSF");
  }
}
function GenericTableComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GenericTableComponent_ng_container_2_th_1_Template, 5, 4, "th", 8)(2, GenericTableComponent_ng_container_2_td_2_Template, 7, 6, "td", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const col_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matColumnDef", col_r5.property);
  }
}
function GenericTableComponent_tr_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 26);
  }
}
function GenericTableComponent_tr_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_tr_4_Template_tr_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r43);
      const row_r41 = restoredCtx.$implicit;
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r42.onRow ? ctx_r42.onRow(row_r41) : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function GenericTableComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28)(1, "div", 29)(2, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " search_off ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "No se encontraron datos");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " No hay registros que coincidan con los filtros aplicados. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Intenta modificar los criterios de b\u00FAsqueda. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
}
function GenericTableComponent_div_6_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", option_r45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", option_r45, " ");
  }
}
function GenericTableComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33)(1, "div", 34)(2, "div", 35)(3, "label", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Mostrar:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GenericTableComponent_div_6_Template_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47);
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r46.onPageSizeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, GenericTableComponent_div_6_option_6_Template, 2, 2, "option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "registros por p\u00E1gina");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 40)(12, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_div_6_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r48.goToFirstPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " \u00AB\u00AB ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_div_6_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r49.goToPreviousPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " \u2039 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_div_6_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r50.goToNextPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " \u203A ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GenericTableComponent_div_6_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r51.goToLastPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " \u00BB\u00BB ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r4.pageSize);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.pageSizeOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" Mostrando ", ctx_r4.currentPage * ctx_r4.pageSize + 1, " - ", ctx_r4.Math.min((ctx_r4.currentPage + 1) * ctx_r4.pageSize, ctx_r4.total), " de ", ctx_r4.total, " registros ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r4.canGoPrevious);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r4.canGoPrevious);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" P\u00E1gina ", ctx_r4.currentPage + 1, " de ", ctx_r4.totalPages, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r4.canGoNext);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r4.canGoNext);
  }
}
class GenericTableComponent {
  constructor(dialog) {
    this.dialog = dialog;
    this.columns = [];
    this.displayedColumns = [];
    this.data = [];
    this.total = null;
    this.initialPageSize = 10;
    this.currentPageIndex = 0; // Página actual desde el componente padre
    this.initialSort = null; // Estado inicial de ordenamiento
    this.hasActiveFilters = false; // Indica si hay filtros activos
    this.onRow = null;
    this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.sortChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource([]);
    // Paginación personalizada
    this.currentPage = 0;
    this.pageSize = 5;
    this.totalPages = 0;
    this.Math = Math; // Para usar Math.min en el template
    this.pageSizeOptions = [5, 10, 25, 50, 100];
    // Ordenamiento
    this.sortColumn = null;
    this.sortDirection = null;
  }
  ngOnInit() {
    this.dataSource.data = this.data || [];
    this.updatePagination();
    // Inicializar estado de ordenamiento si se proporciona
    if (this.initialSort) {
      this.sortColumn = this.initialSort.column;
      this.sortDirection = this.initialSort.direction;
    }
  }
  ngOnChanges(changes) {
    if ('data' in changes) {
      this.dataSource.data = this.data || [];
    }
    if ('total' in changes) {
      this.updatePagination();
    }
    if ('currentPageIndex' in changes) {
      this.currentPage = this.currentPageIndex || 0;
    }
  }
  updatePagination() {
    if (this.total !== null && this.total > 0) {
      this.totalPages = Math.ceil(this.total / this.pageSize);
    } else {
      this.totalPages = 0;
    }
  }
  get canGoPrevious() {
    return this.currentPage > 0;
  }
  get canGoNext() {
    return this.currentPage < this.totalPages - 1;
  }
  goToFirstPage() {
    if (this.currentPage !== 0) {
      this.currentPage = 0;
      this.emitPageChange();
    }
  }
  goToPreviousPage() {
    if (this.canGoPrevious) {
      this.currentPage--;
      this.emitPageChange();
    }
  }
  goToNextPage() {
    if (this.canGoNext) {
      this.currentPage++;
      this.emitPageChange();
    }
  }
  goToLastPage() {
    const lastPage = this.totalPages - 1;
    if (this.currentPage !== lastPage) {
      this.currentPage = lastPage;
      this.emitPageChange();
    }
  }
  emitPageChange() {
    this.pageChanged.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize
    });
  }
  onPageSizeChange(newSize) {
    this.pageSize = newSize;
    this.currentPage = 0; // Resetear a la primera página
    this.updatePagination();
    this.emitPageChange();
  }
  toggleSort(column) {
    if (this.sortColumn === column) {
      // Cambiar dirección: asc -> desc -> null
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      }
    } else {
      // Nueva columna, empezar con asc
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    if (this.sortColumn && this.sortDirection) {
      this.sortChanged.emit({
        column: this.sortColumn,
        direction: this.sortDirection
      });
    } else {
      // Resetear ordenamiento
      this.sortChanged.emit({
        column: '',
        direction: 'asc'
      });
    }
  }
  isSortable(column) {
    return column === 'order_dms' || column === 'timestamp_sales_force' || column === 'billing_date';
  }
  cellValue(row, property) {
    if (!property) return '';
    const parts = property.split('.');
    let v = row;
    for (const p of parts) {
      v = v ? v[p] : undefined;
    }
    return v;
  }
  truncateToWords(text, wordLimit = 5) {
    if (!text || typeof text !== 'string') return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  isResultSFSuccess(element) {
    // Verificar el campo insertCorrect para determinar éxito/error
    const insertCorrectValue = this.cellValue(element, 'insertCorrect');
    // insertCorrect = '1' o 1 = éxito (ícono verde)
    // insertCorrect = '0' o 0 = error (ícono rojo)
    if (insertCorrectValue === '1' || insertCorrectValue === 1) {
      return true;
    }
    if (insertCorrectValue === '0' || insertCorrectValue === 0) {
      return false;
    }
    // Fallback: si no existe insertCorrect, usar valor truthy del resultSF
    const resultValue = this.cellValue(element, 'resultSF');
    return !!resultValue;
  }
  isSalesForceAvailable(element) {
    // Solo habilitado si insertCorrect = 1 y tiene idSalesForce
    const insertCorrectValue = this.cellValue(element, 'insertCorrect');
    const idSalesForce = this.cellValue(element, 'idSalesForce');
    const isSuccess = insertCorrectValue === '1' || insertCorrectValue === 1;
    const hasIdSalesForce = idSalesForce && idSalesForce !== null && idSalesForce !== '';
    return isSuccess && hasIdSalesForce;
  }
  openSalesForceLink(element) {
    if (!this.isSalesForceAvailable(element)) {
      console.warn('Salesforce link not available for this element');
      return;
    }
    const idSalesForce = this.cellValue(element, 'idSalesForce');
    const url = `https://grupovanguardiamx.lightning.force.com/lightning/r/Opportunity/${idSalesForce}/view`;
    console.log('Opening Salesforce URL:', url);
    window.open(url, '_blank');
  }
  openModal(rowData) {
    console.log('Opening modal with data:', rowData);
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: rowData,
      width: '80%',
      maxWidth: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
  openJsonModal(rowData) {
    console.log('Opening JSON modal with data:', rowData);
    const dialogRef = this.dialog.open(JsonModalComponent, {
      data: rowData.sf_jsonRequest,
      width: '90%',
      maxWidth: '900px',
      maxHeight: '80vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('JSON Modal closed');
    });
  }
  static #_ = this.ɵfac = function GenericTableComponent_Factory(t) {
    return new (t || GenericTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: GenericTableComponent,
    selectors: [["vex-generic-table"]],
    inputs: {
      columns: "columns",
      displayedColumns: "displayedColumns",
      data: "data",
      total: "total",
      initialPageSize: "initialPageSize",
      currentPageIndex: "currentPageIndex",
      initialSort: "initialSort",
      hasActiveFilters: "hasActiveFilters",
      onRow: "onRow"
    },
    outputs: {
      pageChanged: "pageChanged",
      sortChanged: "sortChanged"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 7,
    vars: 6,
    consts: [[1, "px-[2rem]"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["mat-header-row", "", "class", "bg-black text-white", 4, "matHeaderRowDef"], ["mat-row", "", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data-message", 4, "ngIf"], ["class", "custom-pagination", 4, "ngIf"], [3, "matColumnDef"], ["mat-header-cell", "", 3, "sortable", "click", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", 3, "click"], [1, "header-content"], ["class", "sort-indicator", 4, "ngIf"], [1, "sort-indicator"], [4, "ngIf"], ["class", "sort-inactive", 4, "ngIf"], [1, "sort-inactive"], ["mat-cell", ""], [1, "status-badge", 3, "ngClass"], [1, "material-symbols-outlined"], [1, "btn-info", 3, "click"], [1, "btn-json", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "25px", "viewBox", "0 -960 960 960", "width", "40px", "fill", "#FF5C20"], ["d", "M320-213.33q-27 0-46.83-19.84Q253.33-253 253.33-280v-533.33q0-27 19.84-46.84Q293-880 320-880h413.33q27 0 46.84 19.83Q800-840.33 800-813.33V-280q0 27-19.83 46.83-19.84 19.84-46.84 19.84H320Zm0-66.67h413.33v-533.33H320V-280ZM186.67-80q-27 0-46.84-19.83Q120-119.67 120-146.67v-600h66.67v600h480V-80h-480ZM320-280v-533.33V-280Z"], [1, "btn-sf-link", 3, "disabled", "title", "click"], [1, "status-badge", 3, "ngClass", "title"], ["mat-header-row", "", 1, "bg-black", "text-white"], ["mat-row", "", 3, "click"], [1, "no-data-message"], [1, "no-data-content"], [1, "material-symbols-outlined", "no-data-icon"], [1, "no-data-title"], [1, "no-data-subtitle"], [1, "custom-pagination"], [1, "pagination-info"], [1, "records-per-page"], ["for", "pageSize"], ["id", "pageSize", 1, "page-size-select", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "showing-info"], [1, "pagination-controls"], ["title", "Primera p\u00E1gina", 1, "pagination-btn", 3, "disabled", "click"], ["title", "P\u00E1gina anterior", 1, "pagination-btn", 3, "disabled", "click"], [1, "page-indicator"], ["title", "P\u00E1gina siguiente", 1, "pagination-btn", 3, "disabled", "click"], ["title", "\u00DAltima p\u00E1gina", 1, "pagination-btn", 3, "disabled", "click"], [3, "value"]],
    template: function GenericTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, GenericTableComponent_ng_container_2_Template, 3, 1, "ng-container", 2)(3, GenericTableComponent_tr_3_Template, 1, 0, "tr", 3)(4, GenericTableComponent_tr_4_Template, 1, 0, "tr", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GenericTableComponent_div_5_Template, 10, 0, "div", 5)(6, GenericTableComponent_div_6_Template, 22, 11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.columns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (!ctx.data || ctx.data.length === 0) && ctx.hasActiveFilters);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.total && ctx.total > 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogModule],
    styles: ["@charset \"UTF-8\";\ntable.mat-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nth.mat-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\nth.mat-header-cell.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n}\nth.mat-header-cell.sortable[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: space-between;\n}\n\n.sort-indicator[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.7;\n  min-width: 16px;\n  text-align: center;\n}\n.sort-indicator[_ngcontent-%COMP%]   .sort-inactive[_ngcontent-%COMP%] {\n  opacity: 0.3;\n}\n\ntd.mat-cell[_ngcontent-%COMP%], th.mat-header-cell[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0 8px;\n}\n\ntd.mat-column-agencyName[_ngcontent-%COMP%], th.mat-column-agencyName[_ngcontent-%COMP%] {\n  min-width: 120px;\n  max-width: 150px;\n}\n\ntd.mat-column-timestamp_sales_force[_ngcontent-%COMP%], th.mat-column-timestamp_sales_force[_ngcontent-%COMP%] {\n  min-width: 100px;\n  max-width: 120px;\n}\n\ntd.mat-column-billing_date[_ngcontent-%COMP%], th.mat-column-billing_date[_ngcontent-%COMP%] {\n  min-width: 100px;\n  max-width: 120px;\n}\n\ntd.mat-column-resultSF[_ngcontent-%COMP%], th.mat-column-resultSF[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntd.mat-column-vin[_ngcontent-%COMP%], th.mat-column-vin[_ngcontent-%COMP%] {\n  min-width: 110px;\n  max-width: 120px;\n}\n\ntd.mat-column-order_dms[_ngcontent-%COMP%], th.mat-column-order_dms[_ngcontent-%COMP%] {\n  min-width: 70px;\n  max-width: 80px;\n}\n\ntd.mat-column-invoice_reference[_ngcontent-%COMP%], th.mat-column-invoice_reference[_ngcontent-%COMP%] {\n  min-width: 100px;\n  max-width: 120px;\n}\n\ntd.mat-column-sendedSalesForce[_ngcontent-%COMP%], th.mat-column-sendedSalesForce[_ngcontent-%COMP%] {\n  min-width: 50px;\n  max-width: 60px;\n  text-align: center;\n}\n\ntd.mat-column-actions[_ngcontent-%COMP%], th.mat-column-actions[_ngcontent-%COMP%] {\n  width: 70px;\n  text-align: center;\n}\n\ntd.mat-column-sf_jsonRequest[_ngcontent-%COMP%], th.mat-column-sf_jsonRequest[_ngcontent-%COMP%] {\n  width: 70px;\n  text-align: center;\n}\n\ntd.mat-column-sf_link[_ngcontent-%COMP%], th.mat-column-sf_link[_ngcontent-%COMP%] {\n  width: 70px;\n  text-align: center;\n}\n\n.btn-info[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  color: #666;\n  transition: color 0.2s ease;\n}\n.btn-info[_ngcontent-%COMP%]:hover {\n  color: #FF5C20;\n}\n.btn-info[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-variation-settings: \"FILL\" 0, \"wght\" 400, \"GRAD\" 0, \"opsz\" 20;\n}\n\n.btn-json[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n}\n\n.btn-sf-link[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  color: #1976d2;\n  transition: color 0.2s ease;\n}\n.btn-sf-link[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #0d47a1;\n}\n.btn-sf-link[_ngcontent-%COMP%]:disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n.btn-sf-link[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-variation-settings: \"FILL\" 0, \"wght\" 400, \"GRAD\" 0, \"opsz\" 20;\n}\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.status-badge[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-variation-settings: \"FILL\" 1, \"wght\" 400, \"GRAD\" 0, \"opsz\" 20;\n  font-size: 25px;\n  line-height: 1;\n}\n\n.status-badge.sent[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  color: #16a34a;\n} \n\n.status-badge.not-sent[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  color: #dc2626;\n} \n\n\n\n.custom-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 0;\n  margin-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n}\n\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.pagination-btn[_ngcontent-%COMP%] {\n  min-width: 40px;\n  height: 40px;\n  padding: 0 12px;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  background-color: white;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 18px;\n  font-weight: bold;\n  transition: all 0.2s ease;\n}\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  border-color: rgba(0, 0, 0, 0.25);\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n.page-indicator[_ngcontent-%COMP%] {\n  padding: 0 16px;\n  font-size: 14px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n\n\n.pagination-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.records-per-page[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.records-per-page[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.page-size-select[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border: 1px solid rgba(0, 0, 0, 0.23);\n  border-radius: 4px;\n  background-color: white;\n  font-size: 14px;\n  cursor: pointer;\n}\n.page-size-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);\n}\n\n.showing-info[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n\n\n\n.no-data-message[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background-color: #fafafa;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n\n.no-data-content[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 400px;\n}\n\n.no-data-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #bdbdbd;\n  margin-bottom: 16px;\n  display: block;\n}\n\n.no-data-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #424242;\n  margin: 0 0 12px 0;\n}\n\n.no-data-subtitle[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #757575;\n  line-height: 1.5;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9nZW5lcmljLXRhYmxlL2dlbmVyaWMtdGFibGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0UsV0FBQTtBQUVGOztBQUNBO0VBQ0UsZ0JBQUE7QUFFRjtBQUFFO0VBQ0UsZUFBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7QUFFSjtBQUFJO0VBQ0UsMENBQUE7QUFFTjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSw4QkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFBRjtBQUVFO0VBQ0UsWUFBQTtBQUFKOztBQUlBO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtBQURGOztBQUtBOztFQUVFLGdCQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQTs7RUFFRSxnQkFBQTtFQUNBLGdCQUFBO0FBRkY7O0FBS0E7O0VBRUUsZ0JBQUE7RUFDQSxnQkFBQTtBQUZGOztBQU1BOztFQUVFLGtCQUFBO0FBSEY7O0FBTUE7O0VBRUUsZ0JBQUE7RUFDQSxnQkFBQTtBQUhGOztBQU1BOztFQUVFLGVBQUE7RUFDQSxlQUFBO0FBSEY7O0FBTUE7O0VBRUUsZ0JBQUE7RUFDQSxnQkFBQTtBQUhGOztBQU1BOztFQUVFLGVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFNQTs7RUFFRSxXQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFNQTs7RUFFRSxXQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFNQTs7RUFFRSxXQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFNQTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDJCQUFBO0FBSEY7QUFLRTtFQUNFLGNBQUE7QUFISjtBQU1FO0VBQ0UsZUFBQTtFQUNBLGtFQUFBO0FBSko7O0FBUUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtBQUxGOztBQVFBO0VBQ0UsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsMkJBQUE7QUFMRjtBQU9FO0VBQ0UsY0FBQTtBQUxKO0FBUUU7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFOSjtBQVNFO0VBQ0UsZUFBQTtFQUNBLGtFQUFBO0FBUEo7O0FBV0Esa0NBQUE7QUFDQTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVJGOztBQVVBO0VBQ0Usa0VBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVNBO0VBQWdELGNBQUE7QUFMaEQsRUFLa0UsVUFBQTtBQUNsRTtFQUFvRCxjQUFBO0FBSHBELEVBR3NFLFFBQUE7QUFFdEUsNkJBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUNBQUE7QUFIRjs7QUFNQTtFQUNFLGVBQUE7RUFDQSx5QkFBQTtBQUhGOztBQU1BO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUhGOztBQU1BO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EscUNBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0FBSEY7QUFLRTtFQUNFLHlCQUFBO0VBQ0EsaUNBQUE7QUFISjtBQU1FO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FBSko7O0FBUUE7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7QUFMRjs7QUFRQSxxREFBQTtBQUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQUxGOztBQVFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUxGO0FBT0U7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0FBTEo7O0FBU0E7RUFDRSxnQkFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBTkY7QUFRRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLDZDQUFBO0FBTko7O0FBVUE7RUFDRSxlQUFBO0FBUEY7O0FBVUEsb0NBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQVBGOztBQVVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQVBGOztBQVVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7QUFQRiIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlLm1hdC10YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRoLm1hdC1oZWFkZXItY2VsbCB7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBcclxuICAmLnNvcnRhYmxlIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmhlYWRlci1jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA4cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uc29ydC1pbmRpY2F0b3Ige1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBvcGFjaXR5OiAwLjc7XHJcbiAgbWluLXdpZHRoOiAxNnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBcclxuICAuc29ydC1pbmFjdGl2ZSB7XHJcbiAgICBvcGFjaXR5OiAwLjM7XHJcbiAgfVxyXG59XHJcblxyXG50ZC5tYXQtY2VsbCwgdGgubWF0LWhlYWRlci1jZWxsIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgcGFkZGluZzogMCA4cHg7XHJcbn1cclxuXHJcbi8vIENvbHVtbmFzIGNvbiBhbmNob3MgbcODwq1uaW1vcyBwYXJhIHRleHRvIGNvbXBsZXRvXHJcbnRkLm1hdC1jb2x1bW4tYWdlbmN5TmFtZSxcclxudGgubWF0LWNvbHVtbi1hZ2VuY3lOYW1lIHtcclxuICBtaW4td2lkdGg6IDEyMHB4O1xyXG4gIG1heC13aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbnRkLm1hdC1jb2x1bW4tdGltZXN0YW1wX3NhbGVzX2ZvcmNlLFxyXG50aC5tYXQtY29sdW1uLXRpbWVzdGFtcF9zYWxlc19mb3JjZSB7XHJcbiAgbWluLXdpZHRoOiAxMDBweDtcclxuICBtYXgtd2lkdGg6IDEyMHB4O1xyXG59XHJcblxyXG50ZC5tYXQtY29sdW1uLWJpbGxpbmdfZGF0ZSxcclxudGgubWF0LWNvbHVtbi1iaWxsaW5nX2RhdGUge1xyXG4gIG1pbi13aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMjBweDtcclxufVxyXG5cclxuLy8gVHJ1bmNhciBjb2x1bW5hcyBsYXJnYXNcclxudGQubWF0LWNvbHVtbi1yZXN1bHRTRixcclxudGgubWF0LWNvbHVtbi1yZXN1bHRTRiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG50ZC5tYXQtY29sdW1uLXZpbixcclxudGgubWF0LWNvbHVtbi12aW4ge1xyXG4gIG1pbi13aWR0aDogMTEwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMjBweDtcclxufVxyXG5cclxudGQubWF0LWNvbHVtbi1vcmRlcl9kbXMsXHJcbnRoLm1hdC1jb2x1bW4tb3JkZXJfZG1zIHtcclxuICBtaW4td2lkdGg6IDcwcHg7XHJcbiAgbWF4LXdpZHRoOiA4MHB4O1xyXG59XHJcblxyXG50ZC5tYXQtY29sdW1uLWludm9pY2VfcmVmZXJlbmNlLFxyXG50aC5tYXQtY29sdW1uLWludm9pY2VfcmVmZXJlbmNlIHtcclxuICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTIwcHg7XHJcbn1cclxuXHJcbnRkLm1hdC1jb2x1bW4tc2VuZGVkU2FsZXNGb3JjZSxcclxudGgubWF0LWNvbHVtbi1zZW5kZWRTYWxlc0ZvcmNlIHtcclxuICBtaW4td2lkdGg6IDUwcHg7XHJcbiAgbWF4LXdpZHRoOiA2MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxudGQubWF0LWNvbHVtbi1hY3Rpb25zLFxyXG50aC5tYXQtY29sdW1uLWFjdGlvbnMge1xyXG4gIHdpZHRoOiA3MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxudGQubWF0LWNvbHVtbi1zZl9qc29uUmVxdWVzdCxcclxudGgubWF0LWNvbHVtbi1zZl9qc29uUmVxdWVzdCB7XHJcbiAgd2lkdGg6IDcwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG50ZC5tYXQtY29sdW1uLXNmX2xpbmssXHJcbnRoLm1hdC1jb2x1bW4tc2ZfbGluayB7XHJcbiAgd2lkdGg6IDcwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYnRuLWluZm97XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBwYWRkaW5nOiA0cHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xyXG4gIFxyXG4gICY6aG92ZXIge1xyXG4gICAgY29sb3I6ICNGRjVDMjA7XHJcbiAgfVxyXG4gIFxyXG4gIC5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOiAnRklMTCcgMCwgJ3dnaHQnIDQwMCwgJ0dSQUQnIDAsICdvcHN6JyAyMDtcclxuICB9XHJcbn1cclxuXHJcbi5idG4tanNvbntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG4uYnRuLXNmLWxpbmsge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIGNvbG9yOiAjMTk3NmQyO1xyXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcclxuICBcclxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcclxuICAgIGNvbG9yOiAjMGQ0N2ExO1xyXG4gIH1cclxuICBcclxuICAmOmRpc2FibGVkIHtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB9XHJcbiAgXHJcbiAgLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC12YXJpYXRpb24tc2V0dGluZ3M6ICdGSUxMJyAwLCAnd2dodCcgNDAwLCAnR1JBRCcgMCwgJ29wc3onIDIwO1xyXG4gIH1cclxufVxyXG5cclxuLyogU2FsZXNmb3JjZSBzdGF0dXMgYmFkZ2UgaWNvbnMgKi9cclxuLnN0YXR1cy1iYWRnZSB7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uc3RhdHVzLWJhZGdlIC5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHtcclxuICBmb250LXZhcmlhdGlvbi1zZXR0aW5nczogJ0ZJTEwnIDEsICd3Z2h0JyA0MDAsICdHUkFEJyAwLCAnb3BzeicgMjA7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcbi5zdGF0dXMtYmFkZ2Uuc2VudCAubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB7IGNvbG9yOiAjMTZhMzRhOyB9IC8qIGdyZWVuICovXHJcbi5zdGF0dXMtYmFkZ2Uubm90LXNlbnQgLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgeyBjb2xvcjogI2RjMjYyNjsgfSAvKiByZWQgKi9cclxuXHJcbi8qIEN1c3RvbSBwYWdpbmF0aW9uIHN0eWxlcyAqL1xyXG4uY3VzdG9tLXBhZ2luYXRpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTZweCAwO1xyXG4gIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbn1cclxuXHJcbi5wYWdpbmF0aW9uLWluZm8ge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xyXG59XHJcblxyXG4ucGFnaW5hdGlvbi1jb250cm9scyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4ucGFnaW5hdGlvbi1idG4ge1xyXG4gIG1pbi13aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgcGFkZGluZzogMCAxMnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuICBcclxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbiAgfVxyXG4gIFxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC40O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB9XHJcbn1cclxuXHJcbi5wYWdlLWluZGljYXRvciB7XHJcbiAgcGFkZGluZzogMCAxNnB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgZWwgc2VsZWN0b3IgZGUgcmVnaXN0cm9zIHBvciBww4PCoWdpbmEgKi9cclxuLnBhZ2luYXRpb24taW5mbyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogOHB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xyXG59XHJcblxyXG4ucmVjb3Jkcy1wZXItcGFnZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIFxyXG4gIGxhYmVsIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcclxuICB9XHJcbn1cclxuXHJcbi5wYWdlLXNpemUtc2VsZWN0IHtcclxuICBwYWRkaW5nOiA0cHggOHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yMyk7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjMTk3NmQyO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMjUsIDExOCwgMjEwLCAwLjIpO1xyXG4gIH1cclxufVxyXG5cclxuLnNob3dpbmctaW5mbyB7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG59XHJcblxyXG4vKiBNZW5zYWplIGRlIG5vIGRhdG9zIGVuY29udHJhZG9zICovXHJcbi5uby1kYXRhLW1lc3NhZ2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiA2MHB4IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWFyZ2luOiAyMHB4IDA7XHJcbn1cclxuXHJcbi5uby1kYXRhLWNvbnRlbnQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXgtd2lkdGg6IDQwMHB4O1xyXG59XHJcblxyXG4ubm8tZGF0YS1pY29uIHtcclxuICBmb250LXNpemU6IDY0cHg7XHJcbiAgY29sb3I6ICNiZGJkYmQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLm5vLWRhdGEtdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjNDI0MjQyO1xyXG4gIG1hcmdpbjogMCAwIDEycHggMDtcclxufVxyXG5cclxuLm5vLWRhdGEtc3VidGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBjb2xvcjogIzc1NzU3NTtcclxuICBsaW5lLWhlaWdodDogMS41O1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}
// Modal component defined in the same file
class ModalDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  static #_ = this.ɵfac = function ModalDialogComponent_Factory(t) {
    return new (t || ModalDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: ModalDialogComponent,
    selectors: [["modal-dialog"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 71,
    vars: 15,
    consts: [["mat-dialog-title", "", 1, "title", "text-xl"], [1, "invoice-details"], [1, "detail-row"], ["align", "end"], ["mat-button", "", 3, "click"]],
    template: function ModalDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Detalles de la orden");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Nombre de Agencia:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2)(9, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "N\u00FAmero de Orden:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2)(13, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Estado:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 2)(17, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "VIN:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 2)(21, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Fecha de Inicio de Garant\u00EDa:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 2)(25, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Placas:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 2)(29, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "M\u00E9todo de Pago:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 2)(33, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "N\u00FAmero de Factura:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 2)(37, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Fecha de Entrega:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 2)(41, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Fecha de Facturaci\u00F3n:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 2)(45, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Enviado a SalesForce:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 2)(49, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "ID SalesForce:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 2)(53, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Resultado SF:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 2)(57, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Timestamp DMS:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 2)(61, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Timestamp SalesForce:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 2)(65, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Env\u00EDo a SalesForce cada:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, " 30 minutos ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "mat-dialog-actions", 3)(69, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalDialogComponent_Template_button_click_69_listener() {
          return ctx.onNoClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Cerrar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.agencyName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.order_dms, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.state, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.vin, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.warranty_init_date) || "N/A", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.plates) || "N/A", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.payment_method, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.invoice_reference, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.delivery_date) || "N/A", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.billing_date, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.sendedSalesForce, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.idSalesForce) || "N/A", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.resultSF, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.timestamp_dms, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data == null ? null : ctx.data.timestamp_sales_force, " ");
      }
    },
    dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    styles: [".title[_ngcontent-%COMP%]{\n      text-decoration: underline;\n      text-decoration-color: #FF5C20;\n      text-decoration-thickness: 3px;\n      align-self: center;\n    }\n\n    .invoice-details[_ngcontent-%COMP%] {\n      max-height: 400px;\n      overflow-y: auto;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .detail-row[_ngcontent-%COMP%] {\n      border-bottom: 1px solid #e0e0e0;\n    }\n\n    .detail-row[_ngcontent-%COMP%]:last-child {\n      border-bottom: none;\n    }\n\n    .detail-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      color: #1b1a1aff;\n      margin-right: 8px;\n    }\n\n    mat-dialog-content[_ngcontent-%COMP%] {\n      max-height: 550px;\n      overflow-y: auto;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9nZW5lcmljLXRhYmxlL2dlbmVyaWMtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBRUk7TUFDRSwwQkFBMEI7TUFDMUIsOEJBQThCO01BQzlCLDhCQUE4QjtNQUM5QixrQkFBa0I7SUFDcEI7O0lBRUE7TUFDRSxpQkFBaUI7TUFDakIsZ0JBQWdCO01BQ2hCLGFBQWE7TUFDYixzQkFBc0I7SUFDeEI7O0lBRUE7TUFDRSxnQ0FBZ0M7SUFDbEM7O0lBRUE7TUFDRSxtQkFBbUI7SUFDckI7O0lBRUE7TUFDRSxnQkFBZ0I7TUFDaEIsaUJBQWlCO0lBQ25COztJQUVBO01BQ0UsaUJBQWlCO01BQ2pCLGdCQUFnQjtJQUNsQiIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4gICAgLnRpdGxle1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICB0ZXh0LWRlY29yYXRpb24tY29sb3I6ICNGRjVDMjA7XG4gICAgICB0ZXh0LWRlY29yYXRpb24tdGhpY2tuZXNzOiAzcHg7XG4gICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmludm9pY2UtZGV0YWlscyB7XG4gICAgICBtYXgtaGVpZ2h0OiA0MDBweDtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG5cbiAgICAuZGV0YWlsLXJvdyB7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICB9XG5cbiAgICAuZGV0YWlsLXJvdzpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuXG4gICAgLmRldGFpbC1yb3cgc3Ryb25nIHtcbiAgICAgIGNvbG9yOiAjMWIxYTFhZmY7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgICB9XG5cbiAgICBtYXQtZGlhbG9nLWNvbnRlbnQge1xuICAgICAgbWF4LWhlaWdodDogNTUwcHg7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}
// JSON Modal component
class JsonModalComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.copyButtonText = 'Copiar';
    // Format JSON with proper indentation
    try {
      if (typeof data === 'string') {
        // If it's a string, try to parse and re-stringify
        this.formattedJson = JSON.stringify(JSON.parse(data), null, 2);
      } else {
        this.formattedJson = JSON.stringify(data, null, 2);
      }
    } catch (e) {
      // If parsing fails, show as-is
      this.formattedJson = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.formattedJson).then(() => {
      this.copyButtonText = 'Copiado';
      setTimeout(() => {
        this.copyButtonText = 'Copiar';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
      this.copyButtonText = '✗ Error';
      setTimeout(() => {
        this.copyButtonText = 'Copiar';
      }, 2000);
    });
  }
  static #_ = this.ɵfac = function JsonModalComponent_Factory(t) {
    return new (t || JsonModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: JsonModalComponent,
    selectors: [["json-modal"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 13,
    vars: 2,
    consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "json-container"], [1, "json-content"], ["align", "end"], [1, "flex", "flex-row", "items-center", "bg-black", "text-white", "p-[0.45rem]", "rounded-2xl", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "20px", "viewBox", "0 -960 960 960", "width", "20px", "fill", "#ffffff", 1, "mr-[0.2rem]"], ["d", "M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"], ["mat-button", "", 3, "click"]],
    template: function JsonModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "JSON Request - SalesForce");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1)(3, "div", 2)(4, "pre", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-dialog-actions", 4)(7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function JsonModalComponent_Template_button_click_7_listener() {
          return ctx.copyToClipboard();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "svg", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function JsonModalComponent_Template_button_click_11_listener() {
          return ctx.onNoClick();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Cerrar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.formattedJson);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.copyButtonText, " ");
      }
    },
    dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    styles: [".json-container[_ngcontent-%COMP%] {\n      background-color: #f5f5f5;\n      border-radius: 4px;\n      padding: 16px;\n      overflow: auto;\n      max-height: 500px;\n    }\n\n    .json-content[_ngcontent-%COMP%] {\n      margin: 0;\n      font-family: 'Courier New', monospace;\n      font-size: 13px;\n      line-height: 1.5;\n      color: #333;\n      white-space: pre-wrap;\n      word-wrap: break-word;\n    }\n\n    mat-dialog-content[_ngcontent-%COMP%] {\n      max-height: 60vh;\n      overflow-y: auto;\n    }\n\n    mat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      margin-left: 8px;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9nZW5lcmljLXRhYmxlL2dlbmVyaWMtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSTtNQUNFLHlCQUF5QjtNQUN6QixrQkFBa0I7TUFDbEIsYUFBYTtNQUNiLGNBQWM7TUFDZCxpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxTQUFTO01BQ1QscUNBQXFDO01BQ3JDLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsV0FBVztNQUNYLHFCQUFxQjtNQUNyQixxQkFBcUI7SUFDdkI7O0lBRUE7TUFDRSxnQkFBZ0I7TUFDaEIsZ0JBQWdCO0lBQ2xCOztJQUVBO01BQ0UsZ0JBQWdCO0lBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmpzb24tY29udGFpbmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgICB9XG5cbiAgICAuanNvbi1jb250ZW50IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBtb25vc3BhY2U7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgfVxuXG4gICAgbWF0LWRpYWxvZy1jb250ZW50IHtcbiAgICAgIG1heC1oZWlnaHQ6IDYwdmg7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIG1hdC1kaWFsb2ctYWN0aW9ucyBidXR0b24ge1xuICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 5697:
/*!***********************************************************************!*\
  !*** ./src/app/components/invoice-filter/invoice-filter.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvoiceFilterComponent: () => (/* binding */ InvoiceFilterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _services_vanguardia_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/vanguardia-api.service */ 5451);







function InvoiceFilterComponent_label_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 15)(1, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InvoiceFilterComponent_label_21_Template_input_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const agency_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      ctx_r2.onAgencySelect(agency_r1.name, $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.closeDropdown($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const agency_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ctx_r0.selectedAgency === agency_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", agency_r1.name, " ");
  }
}
class InvoiceFilterComponent {
  constructor(fb, vanguardiaApi) {
    this.fb = fb;
    this.vanguardiaApi = vanguardiaApi;
    this.filterChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.agencies = [];
    this.selectedAgency = '';
    this.filterForm = this.fb.group({
      order_dms: [''],
      vin: [''],
      reference: [''],
      agencyName: [''],
      sendedSalesForce: [''],
      insertado: [false],
      error: [false]
    });
  }
  ngOnInit() {
    this.loadAgencies();
  }
  loadAgencies() {
    this.vanguardiaApi.getAgencies().subscribe({
      next: agencies => {
        this.agencies = agencies;
        console.log('Agencias cargadas:', agencies);
      },
      error: error => {
        console.error('Error al cargar agencias:', error);
      }
    });
  }
  onAgencySelect(agencyName, event) {
    const input = event.target;
    if (!input) return;
    console.log('🏢 Agencia seleccionada:', agencyName, 'checked:', input.checked);
    if (input.checked) {
      this.selectedAgency = agencyName;
      this.filterForm.patchValue({
        agencyName
      }, {
        emitEvent: false
      });
      console.log('🏢 Agencia guardada en formulario:', this.filterForm.get('agencyName')?.value);
    } else if (this.selectedAgency === agencyName) {
      this.selectedAgency = '';
      this.filterForm.patchValue({
        agencyName: ''
      }, {
        emitEvent: false
      });
      console.log('🏢 Agencia deseleccionada');
    }
  }
  onFilter() {
    console.log('🔍 Filtro activado - valores del formulario:', this.filterForm.value);
    console.log('🔍 selectedAgency actual:', this.selectedAgency);
    const {
      order_dms,
      vin,
      reference,
      agencyName,
      sendedSalesForce,
      insertado,
      error
    } = this.filterForm.value;
    const payload = {
      order_dms,
      vin,
      reference,
      agencyName,
      sendedSalesForce: sendedSalesForce ? sendedSalesForce : undefined,
      insertado,
      error
    };
    console.log('🔍 InvoiceFilter -> onFilter(), emitiendo payload:', payload);
    this.filterChange.emit(payload);
    // Limpiar todos los campos después de enviar el filtro
    this.selectedAgency = '';
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      reference: '',
      agencyName: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });
  }
  onClearFilters() {
    // Resetear el formulario a valores vacíos
    this.selectedAgency = '';
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      reference: '',
      agencyName: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });
    // Emitir filtros vacíos para que la tabla se resetee
    const emptyPayload = {
      order_dms: undefined,
      vin: undefined,
      reference: undefined,
      agencyName: undefined,
      sendedSalesForce: undefined,
      insertado: false,
      error: false
    };
    console.log('InvoiceFilter -> onClearFilters(), emitiendo filtros vacíos:', emptyPayload);
    this.filterChange.emit(emptyPayload);
  }
  closeDropdown(event) {
    const target = event.target;
    if (!target) return;
    const details = target.closest('details.dropdown');
    if (details) {
      // Close after the form state settles
      setTimeout(() => {
        details.open = false;
      });
    }
  }
  onSfToggle(value, event) {
    const input = event.target;
    if (!input) return;
    const current = this.filterForm.get('sendedSalesForce')?.value;
    // If unchecking the currently selected value, clear; otherwise set the new value
    const next = input.checked ? value : current === value ? '' : current;
    this.filterForm.patchValue({
      sendedSalesForce: next
    }, {
      emitEvent: false
    });
  }
  onInsertToggle(kind, event) {
    const input = event.target;
    if (!input) return;
    if (kind === 'insertado' && input.checked) {
      this.filterForm.patchValue({
        error: false
      }, {
        emitEvent: false
      });
    }
    if (kind === 'error' && input.checked) {
      this.filterForm.patchValue({
        insertado: false
      }, {
        emitEvent: false
      });
    }
  }
  static #_ = this.ɵfac = function InvoiceFilterComponent_Factory(t) {
    return new (t || InvoiceFilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_vanguardia_api_service__WEBPACK_IMPORTED_MODULE_0__.VanguardiaApiService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: InvoiceFilterComponent,
    selectors: [["vex-invoice-filter"]],
    outputs: {
      filterChange: "filterChange"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 50,
    vars: 5,
    consts: [[1, "filter-bar-wrapper", "px-[5rem]", "py-5"], [3, "formGroup", "ngSubmit"], [1, "filter-bar"], [1, "filter-field"], ["for", "order_dms"], ["id", "order_dms", "type", "text", "placeholder", "N\u00FAmero de orden", "formControlName", "order_dms"], ["for", "vin"], ["id", "vin", "type", "text", "placeholder", "VIN", "formControlName", "vin"], ["for", "reference"], ["id", "reference", "type", "text", "placeholder", "N\u00FAmero de factura", "formControlName", "reference"], [1, "dropdown"], [1, "dropdown-trigger"], [1, "material-symbols-outlined"], [1, "dropdown-panel"], ["class", "checkbox", 4, "ngFor", "ngForOf"], [1, "checkbox"], ["id", "enviadoSF", "type", "checkbox", 3, "checked", "change"], ["id", "noenviadoSF", "type", "checkbox", 3, "checked", "change"], ["id", "insertado", "type", "checkbox", "formControlName", "insertado", 3, "change"], ["id", "error", "type", "checkbox", "formControlName", "error", 3, "change"], ["type", "submit", 1, "filter-btn"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "checkbox", 3, "checked", "change"]],
    template: function InvoiceFilterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function InvoiceFilterComponent_Template_form_ngSubmit_1_listener() {
          return ctx.onFilter();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "No.Orden");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3)(8, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "VIN");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3)(12, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "No.Factura");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "details", 10)(16, "summary", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "keyboard_arrow_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, InvoiceFilterComponent_label_21_Template, 3, 2, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "details", 10)(23, "summary", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Salesforce ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "keyboard_arrow_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 13)(28, "label", 15)(29, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InvoiceFilterComponent_Template_input_change_29_listener($event) {
          ctx.onSfToggle("1", $event);
          return ctx.closeDropdown($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, " Enviado ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "label", 15)(32, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InvoiceFilterComponent_Template_input_change_32_listener($event) {
          ctx.onSfToggle("0", $event);
          return ctx.closeDropdown($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, " No enviado ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "details", 10)(35, "summary", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Estado SF");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "keyboard_arrow_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 13)(40, "label", 15)(41, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InvoiceFilterComponent_Template_input_change_41_listener($event) {
          ctx.onInsertToggle("insertado", $event);
          return ctx.closeDropdown($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, " Insertado ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "label", 15)(44, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InvoiceFilterComponent_Template_input_change_44_listener($event) {
          ctx.onInsertToggle("error", $event);
          return ctx.closeDropdown($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, " Error ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "svg", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](48, "circle", 22)(49, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        let tmp_3_0;
        let tmp_4_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.filterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.selectedAgency || "Agencia", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.agencies);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ((tmp_3_0 = ctx.filterForm.get("sendedSalesForce")) == null ? null : tmp_3_0.value) === "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ((tmp_4_0 = ctx.filterForm.get("sendedSalesForce")) == null ? null : tmp_4_0.value) === "0");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
    styles: [".filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  width: 100%;\n  column-gap: 0.8rem;\n  row-gap: 0.5rem;\n  align-items: center;\n}\n\n.filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 0.6rem;\n  align-items: center;\n}\n\n.filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: solid 0.1rem #d1d5db;\n  border-radius: 0.4rem;\n  padding: 0.4rem;\n  width: 10rem;\n}\n\n.filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #111827;\n}\n\n.filter-btn[_ngcontent-%COMP%] {\n  background: #000;\n  color: #fff;\n  border: none;\n  padding: 0.5rem 1.2rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n\n\n.dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 160px;\n}\n\n.dropdown[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  list-style: none;\n}\n\n.dropdown-trigger[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #d1d5db; \n\n  border-radius: 6px;\n  padding: 0.45rem 0.75rem;\n  min-width: 160px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n.dropdown[open][_ngcontent-%COMP%]   .dropdown-trigger[_ngcontent-%COMP%] {\n  border-color: #111827; \n\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n\n.dropdown-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 6px);\n  left: 0;\n  background: #fff;\n  border: 1px solid #e5e7eb; \n\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n  padding: 0.6rem 0.75rem;\n  display: grid;\n  gap: 0.5rem;\n  z-index: 30;\n  min-width: 220px;\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n\n\nsummary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9pbnZvaWNlLWZpbHRlci9pbnZvaWNlLWZpbHRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFDQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQUVKOztBQUNBO0VBQ0ksNEJBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBRUo7O0FBQ0E7RUFDSSxhQUFBO0VBQ0EscUJBQUE7QUFFSjs7QUFDQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBRUo7O0FBQ0Esb0JBQUE7QUFDQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUFFSjs7QUFBQTtFQUNFLGdCQUFBO0FBR0Y7O0FBREE7RUFDSSxnQkFBQTtFQUNBLHlCQUFBLEVBQUEsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtVQUFBLGlCQUFBO0FBSUo7O0FBRkE7RUFDSSxxQkFBQSxFQUFBLGFBQUE7RUFDQSwwQ0FBQTtBQUtKOztBQUhBO0VBQ0ksa0JBQUE7RUFDQSxxQkFBQTtFQUNBLE9BQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBLEVBQUEsYUFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBTUo7O0FBSkE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBT0o7O0FBTEEsa0NBQUE7QUFDQTtFQUFrQyxhQUFBO0FBU2xDIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbHRlci1iYXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjhyZW07XHJcbiAgICByb3ctZ2FwOiAwLjVyZW07XHRcdFxyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4uZmlsdGVyLWZpZWxkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgZ2FwOjAuNnJlbTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5maWx0ZXItZmllbGQgaW5wdXQge1xyXG4gICAgYm9yZGVyOiBzb2xpZCAwLjFyZW0gI2QxZDVkYjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcclxuICAgIHBhZGRpbmc6IDAuNHJlbTtcclxuICAgIHdpZHRoOiAxMHJlbTtcclxufVxyXG5cclxuLmZpbHRlci1maWVsZCBpbnB1dDpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjMTExODI3O1xyXG59XHJcblxyXG4uZmlsdGVyLWJ0biB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAwLjVyZW0gMS4ycmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLyogRHJvcGRvd24gc3R5bGVzICovXHJcbi5kcm9wZG93biB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xyXG59XHJcbi5kcm9wZG93biA+IHN1bW1hcnkge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuLmRyb3Bkb3duLXRyaWdnZXIge1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkMWQ1ZGI7IC8qIGdyYXktMzAwICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBwYWRkaW5nOiAwLjQ1cmVtIDAuNzVyZW07XHJcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcbi5kcm9wZG93bltvcGVuXSAuZHJvcGRvd24tdHJpZ2dlciB7XHJcbiAgICBib3JkZXItY29sb3I6ICMxMTE4Mjc7IC8qIGdyYXktOTAwICovXHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4wOCk7XHJcbn1cclxuLmRyb3Bkb3duLXBhbmVsIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogY2FsYygxMDAlICsgNnB4KTtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTdlYjsgLyogZ3JheS0yMDAgKi9cclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEpO1xyXG4gICAgcGFkZGluZzogMC42cmVtIDAuNzVyZW07XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbiAgICB6LWluZGV4OiAzMDtcclxuICAgIG1pbi13aWR0aDogMjIwcHg7XHJcbn1cclxuLmNoZWNrYm94IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn1cclxuLyogSGlkZSBuYXRpdmUgbWFya2VyIG9uIHN1bW1hcnkgKi9cclxuc3VtbWFyeTo6LXdlYmtpdC1kZXRhaWxzLW1hcmtlciB7IGRpc3BsYXk6IG5vbmU7IH0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 3973:
/*!*********************************************************************!*\
  !*** ./src/app/components/invoice-table/invoice-table.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvoiceTableComponent: () => (/* binding */ InvoiceTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _generic_table_generic_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generic-table/generic-table.component */ 9639);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xlsx */ 2002);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_vanguardia_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/vanguardia-api.service */ 5451);






class InvoiceTableComponent {
  constructor(vanguardiaApi) {
    this.vanguardiaApi = vanguardiaApi;
    // Datos del inventario desde la API de Vanguardia
    this.data = [];
    this.loading = false;
    this.error = null;
    this.total = 0;
    this.defaultPageSize = 5; // Tamaño por defecto
    this.pageIndex = 0;
    this.currentFilters = {};
    this.currentSort = {
      column: 'billing_date',
      direction: 'desc'
    };
    this.isDownloadingExcel = false;
    // Columnas para mostrar datos del inventario (basadas en los datos del mock)
    this.columns = [{
      label: 'Agencia',
      property: 'agencyName',
      type: 'text'
    }, {
      label: 'Número de orden',
      property: 'order_dms',
      type: 'text'
    }, {
      label: 'VIN',
      property: 'vin',
      type: 'text'
    }, {
      label: 'Fecha Facturación',
      property: 'billing_date',
      type: 'text'
    }, {
      label: 'Referencia de venta',
      property: 'invoice_reference',
      type: 'text'
    }, {
      label: 'Envio SF',
      property: 'sendedSalesForce',
      type: 'text'
    }, {
      label: 'Fecha SF',
      property: 'timestamp_sales_force',
      type: 'text'
    }, {
      label: 'Estado SF',
      property: 'resultSF',
      type: 'text'
    }, {
      label: 'Datos',
      property: 'sf_jsonRequest',
      type: 'button'
    }, {
      label: 'Ver SF',
      property: 'sf_link',
      type: 'button'
    }, {
      label: 'Detalles',
      property: 'actions',
      type: 'button'
    }];
    this.displayedColumns = ['agencyName', 'order_dms', 'vin', 'billing_date', 'invoice_reference', 'sendedSalesForce', 'timestamp_sales_force', 'resultSF', 'sf_jsonRequest', 'sf_link', 'actions'];
  }
  get hasActiveFilters() {
    return !!(this.currentFilters.order_dms || this.currentFilters.vin || this.currentFilters.reference || this.currentFilters.agencyName || this.currentFilters.sendedSalesForce || this.currentFilters.insertado || this.currentFilters.error);
  }
  ngOnInit() {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }
  /**
   * Carga los datos desde la API de Vanguardia
   */
  loadPage(pageIndex, pageSize) {
    this.loading = true;
    this.error = null;
    console.log('📋 Cargando página con filtros actuales:', this.currentFilters);
    // Ahora la API acepta 'page' y 'perpage'
    const params = {
      page: pageIndex + 1,
      perpage: pageSize // Agregar el tamaño de página
    };
    // Map current filters to params
    if (this.currentFilters.order_dms) params.order_dms = this.currentFilters.order_dms;
    if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
    if (this.currentFilters.reference) params.invoice_reference = this.currentFilters.reference;
    if (this.currentFilters.agencyName) params.agencyName = this.currentFilters.agencyName;
    if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) params.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) params.insertCorrect = '0';
    // Agregar ordenamiento si existe
    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }
    console.log('📋 Parámetros enviados a la API:', params);
    this.vanguardiaApi.getInvoicesPaged(params).subscribe({
      next: res => {
        this.data = res.items;
        this.total = res.total;
        this.pageIndex = pageIndex;
        this.loading = false;
      },
      error: err => {
        console.error('Error al cargar inventario (paginado):', err);
        this.error = 'Error al cargar los datos del inventario';
        this.data = [];
        this.loading = false;
      }
    });
  }
  applyFilter(filters) {
    console.log('📋 ApplyFilter recibido:', filters);
    // Guardar filtros y reiniciar a primera página
    this.currentFilters = {
      ...filters
    };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }
  onSortChange(sort) {
    console.log('🔄 Ordenamiento cambiado:', sort);
    // Si column está vacío, resetear ordenamiento
    if (!sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
    // Siempre ir a página 1 al cambiar o resetear ordenamiento
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }
  /**
   * Recarga los datos del inventario
   */
  refreshData() {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }
  /**
   * Maneja las acciones de los botones en la tabla
   */
  onActionClick(item, action) {
    console.log('Acción:', action, 'Item:', item);
    // Aquí puedes implementar las acciones específicas
  }
  /**
   * Descarga los datos actuales en formato Excel - TODOS los registros con filtros aplicados
   * Maneja paginación múltiple para obtener todos los registros
   */
  downloadExcel() {
    if (this.total === 0) {
      console.warn('⚠️ No hay datos para descargar');
      return;
    }
    this.isDownloadingExcel = true;
    // Calcular cuántas páginas necesitamos (asumiendo límite de 100 por página)
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);
    console.log(`📥 Descargando ${this.total} registros en ${totalPages} páginas`);
    // Preparar parámetros base
    const baseParams = {
      perpage: maxPerPage
    };
    // Aplicar los mismos filtros que están actualmente activos
    if (this.currentFilters.order_dms) baseParams.order_dms = this.currentFilters.order_dms;
    if (this.currentFilters.vin) baseParams.vin = this.currentFilters.vin;
    if (this.currentFilters.reference) baseParams.invoice_reference = this.currentFilters.reference;
    if (this.currentFilters.agencyName) baseParams.agencyName = this.currentFilters.agencyName;
    if (this.currentFilters.sendedSalesForce) baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) baseParams.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) baseParams.insertCorrect = '0';
    // Aplicar el mismo ordenamiento
    if (this.currentSort && this.currentSort.column) {
      baseParams.orderby = this.currentSort.column;
      baseParams.ordertype = this.currentSort.direction;
    }
    // Crear array de observables para todas las páginas
    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        ...baseParams,
        page
      };
      pageRequests.push(this.vanguardiaApi.getInvoicesPaged(params));
    }
    // Ejecutar todas las peticiones en paralelo
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)(pageRequests).subscribe({
      next: responses => {
        try {
          // Combinar todos los resultados
          const allData = [];
          responses.forEach(response => {
            allData.push(...response.items);
          });
          console.log(`📊 Datos obtenidos para Excel: ${allData.length} registros de ${this.total} esperados`);
          // Preparar los datos para Excel con TODOS los campos disponibles
          const excelData = allData.map(item => ({
            // Campos básicos de identificación
            'ID': item.Id || item.id || '',
            'ID Agencia': item.idAgency || '',
            'Agencia': item.agencyName || '',
            'Número de Orden': item.order_dms || '',
            'Estado': item.state || '',
            'VIN': item.vin || '',
            // Fechas importantes
            'Fecha Inicio Garantía': item.warranty_init_date || '',
            'Fecha Facturación': item.billing_date || '',
            'Fecha Entrega': item.delivery_date || '',
            // Información del vehículo
            'Placas': item.plates || '',
            // Información de pago
            'Método de Pago': item.payment_method || '',
            'Referencia de Venta': item.invoice_reference || '',
            // Información de Salesforce
            'Enviado a SF': item.sendedSalesForce === '1' ? 'Sí' : 'No',
            'ID Salesforce': item.idSalesForce || '',
            'Resultado SF': item.resultSF || '',
            'Intentos SF': item.sf_attempts || '',
            'Insertado Correctamente': item.insertCorrect === '1' ? 'Sí' : 'No',
            // Timestamps
            'Timestamp DMS': item.timestamp_dms || '',
            'Timestamp': item.timestamp || '',
            'Timestamp SalesForce': item.timestamp_sales_force || '',
            // JSON y datos técnicos (truncados para Excel)
            'JSON Request SF': item.sf_jsonRequest ? 'Disponible' : 'No disponible',
            'JSON Response SF': item.sf_jsonResponse ? 'Disponible' : 'No disponible'
          }));
          // Crear libro de Excel
          const worksheet = xlsx__WEBPACK_IMPORTED_MODULE_3__.utils.json_to_sheet(excelData);
          const workbook = xlsx__WEBPACK_IMPORTED_MODULE_3__.utils.book_new();
          xlsx__WEBPACK_IMPORTED_MODULE_3__.utils.book_append_sheet(workbook, worksheet, 'Facturas');
          // Configurar el ancho de las columnas
          const columnWidths = excelData.length > 0 ? Object.keys(excelData[0]).map(() => ({
            wch: 15
          })) : [];
          worksheet['!cols'] = columnWidths;
          // Generar nombre del archivo con timestamp y total de registros
          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          const fileName = `facturas_${allData.length}_registros_${timestamp}.xlsx`;
          // Descargar el archivo
          xlsx__WEBPACK_IMPORTED_MODULE_3__.writeFile(workbook, fileName);
          console.log(`✅ Excel generado exitosamente: ${fileName}`);
          console.log(`📊 ${excelData.length} registros exportados con todos los campos`);
        } catch (error) {
          console.error('❌ Error al generar Excel:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: error => {
        console.error('❌ Error al obtener datos para Excel:', error);
        this.isDownloadingExcel = false;
      }
    });
  }
  static #_ = this.ɵfac = function InvoiceTableComponent_Factory(t) {
    return new (t || InvoiceTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_vanguardia_api_service__WEBPACK_IMPORTED_MODULE_1__.VanguardiaApiService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: InvoiceTableComponent,
    selectors: [["vex-invoice-table"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 9,
    vars: 10,
    consts: [[1, "table-header"], ["type", "button", 1, "excel-btn", 3, "disabled", "click"], [1, "material-symbols-outlined"], [3, "columns", "displayedColumns", "data", "total", "currentPageIndex", "initialSort", "hasActiveFilters", "pageChanged", "sortChanged"]],
    template: function InvoiceTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvoiceTableComponent_Template_button_click_3_listener() {
          return ctx.downloadExcel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "download");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "vex-generic-table", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("pageChanged", function InvoiceTableComponent_Template_vex_generic_table_pageChanged_8_listener($event) {
          return ctx.loadPage($event.pageIndex, $event.pageSize);
        })("sortChanged", function InvoiceTableComponent_Template_vex_generic_table_sortChanged_8_listener($event) {
          return ctx.onSortChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Facturas (", ctx.total, " registros)");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.loading || ctx.isDownloadingExcel);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.isDownloadingExcel ? "Generando..." : "Descargar Excel");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("columns", ctx.columns)("displayedColumns", ctx.displayedColumns)("data", ctx.data)("total", ctx.total)("currentPageIndex", ctx.pageIndex)("initialSort", ctx.currentSort)("hasActiveFilters", ctx.hasActiveFilters);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _generic_table_generic_table_component__WEBPACK_IMPORTED_MODULE_0__.GenericTableComponent],
    styles: [".table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding: 0 0.5rem;\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #374151;\n  font-weight: 600;\n}\n\n.excel-btn[_ngcontent-%COMP%] {\n  background: #10b981; \n\n  color: #fff;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: background-color 0.2s;\n  min-width: 140px;\n  justify-content: center;\n}\n.excel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #059669; \n\n}\n.excel-btn[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af; \n\n  cursor: not-allowed;\n}\n.excel-btn[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9pbnZvaWNlLXRhYmxlL2ludm9pY2UtdGFibGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUNFO0VBQ0UsU0FBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUdBO0VBQ0UsbUJBQUEsRUFBQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUFGO0FBRUU7RUFDRSxtQkFBQSxFQUFBLGNBQUE7QUFBSjtBQUdFO0VBQ0UsbUJBQUEsRUFBQSxhQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUlFO0VBQ0UsZUFBQTtBQUZKIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxlLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDAgMC41cmVtO1xyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBjb2xvcjogIzM3NDE1MTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgfVxyXG59XHJcblxyXG4uZXhjZWwtYnRuIHtcclxuICBiYWNrZ3JvdW5kOiAjMTBiOTgxOyAvKiBncmVlbi01MDAgKi9cclxuICBjb2xvcjogI2ZmZjtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDAuNXJlbTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XHJcbiAgbWluLXdpZHRoOiAxNDBweDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDU5NjY5OyAvKiBncmVlbi02MDAgKi9cclxuICB9XHJcblxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgYmFja2dyb3VuZDogIzljYTNhZjsgLyogZ3JheS00MDAgKi9cclxuICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbiAgfVxyXG5cclxuICAubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6666:
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);






function LoginComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " La contrase\u00F1a es requerida ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function LoginComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.errorMessage, " ");
  }
}
function LoginComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Ingresar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "circle", 14)(3, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Verificando... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class LoginComponent {
  constructor(fb, router) {
    this.fb = fb;
    this.router = router;
    this.isLoading = false;
    this.errorMessage = '';
    this.VALID_PASSWORD = 'Vanguardia123';
    this.loginForm = this.fb.group({
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor ingresa la contraseña';
      return;
    }
    this.isLoading = true;
    const password = this.loginForm.get('password')?.value;
    // Simular delay de autenticación
    setTimeout(() => {
      if (password === this.VALID_PASSWORD) {
        // Login exitoso - guardar estado en localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loginTime', Date.now().toString());
        // Redirigir a home
        this.router.navigate(['/home']);
      } else {
        // Login fallido
        this.errorMessage = 'Contraseña incorrecta';
        this.loginForm.get('password')?.setValue('');
      }
      this.isLoading = false;
    }, 1000);
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["vex-login"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 17,
    vars: 10,
    consts: [[1, "login-container"], [1, "login-card"], [1, "login-header"], [1, "login-form", 3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "Ingresa tu contrase\u00F1a", "autocomplete", "current-password", 1, "form-input"], ["class", "error-message", 4, "ngIf"], ["type", "submit", 1, "login-btn", 3, "disabled"], [4, "ngIf"], ["class", "loading-text", 4, "ngIf"], [1, "error-message"], [1, "loading-text"], ["viewBox", "0 0 24 24", 1, "spinner"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", "fill", "none", "opacity", "0.25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", "opacity", "0.75"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Vanguardia Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Ingresa tu contrase\u00F1a para continuar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4)(9, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Contrase\u00F1a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, LoginComponent_div_12_Template, 2, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, LoginComponent_div_13_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, LoginComponent_span_15_Template, 2, 0, "span", 9)(16, LoginComponent_span_16_Template, 5, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("error", (ctx.passwordControl == null ? null : ctx.passwordControl.invalid) && (ctx.passwordControl == null ? null : ctx.passwordControl.touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.passwordControl == null ? null : ctx.passwordControl.invalid) && (ctx.passwordControl == null ? null : ctx.passwordControl.touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("loading", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
    styles: [".login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #f1f1f1;\n  padding: 2rem;\n}\n\n.login-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.2);\n  padding: 3rem;\n  width: 100%;\n  max-width: 500px;\n  animation: _ngcontent-%COMP%_fadeInUp 0.6s ease-out;\n}\n\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n.login-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 1rem;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #374151;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: all 0.2s ease;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-input.error[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.login-btn[_ngcontent-%COMP%] {\n  background-color: black;\n  color: white;\n  border: none;\n  padding: 0.875rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.login-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.login-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n  transform: none;\n}\n.login-btn.loading[_ngcontent-%COMP%] {\n  background: #9ca3af;\n}\n\n.loading-text[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUNGO0FBQ0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFDSjtBQUVFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFBSjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7QUFERjtBQUdFO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFLQTtFQUNFLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQUZGO0FBSUU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSw4Q0FBQTtBQUZKO0FBS0U7RUFDRSxxQkFBQTtBQUhKO0FBTUU7RUFDRSxjQUFBO0FBSko7O0FBUUE7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FBTEY7QUFPRTtFQUNFLDJCQUFBO0VBQ0EsK0NBQUE7QUFMSjtBQVFFO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQU5KO0FBU0U7RUFDRSxtQkFBQTtBQVBKOztBQVdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQVJGOztBQVdBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQ0FBQTtBQVJGOztBQVdBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFSRjs7QUFXQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDJCQUFBO0VBUkY7RUFVQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQVJGO0FBQ0Y7QUFXQTtFQUNFO0lBQ0UsdUJBQUE7RUFURjtFQVdBO0lBQ0UseUJBQUE7RUFURjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ2luLWNvbnRhaW5lciB7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XHJcbiAgcGFkZGluZzogMnJlbTtcclxufVxyXG5cclxuLmxvZ2luLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm94LXNoYWRvdzogMCAzMHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG4gIHBhZGRpbmc6IDNyZW07XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICBhbmltYXRpb246IGZhZGVJblVwIDAuNnMgZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5sb2dpbi1oZWFkZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIFxyXG4gIGgxIHtcclxuICAgIGNvbG9yOiAjMWYyOTM3O1xyXG4gICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxuICB9XHJcbiAgXHJcbiAgcCB7XHJcbiAgICBjb2xvcjogIzZiNzI4MDtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5sb2dpbi1mb3JtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxLjVyZW07XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAwLjVyZW07XHJcbiAgXHJcbiAgbGFiZWwge1xyXG4gICAgY29sb3I6ICMzNzQxNTE7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XHJcbiAgYm9yZGVyOiAycHggc29saWQgI2U1ZTdlYjtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjNjY3ZWVhO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4xKTtcclxuICB9XHJcbiAgXHJcbiAgJi5lcnJvciB7XHJcbiAgICBib3JkZXItY29sb3I6ICNlZjQ0NDQ7XHJcbiAgfVxyXG4gIFxyXG4gICY6OnBsYWNlaG9sZGVyIHtcclxuICAgIGNvbG9yOiAjOWNhM2FmO1xyXG4gIH1cclxufVxyXG5cclxuLmxvZ2luLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiAwLjg3NXJlbSAxLjVyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMC41cmVtO1xyXG4gIFxyXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XHJcbiAgfVxyXG4gIFxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC43O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICAgIHRyYW5zZm9ybTogbm9uZTtcclxuICB9XHJcbiAgXHJcbiAgJi5sb2FkaW5nIHtcclxuICAgIGJhY2tncm91bmQ6ICM5Y2EzYWY7XHJcbiAgfVxyXG59XHJcblxyXG4ubG9hZGluZy10ZXh0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi5zcGlubmVyIHtcclxuICB3aWR0aDogMjBweDtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5cclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gIGNvbG9yOiAjZWY0NDQ0O1xyXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuQGtleWZyYW1lcyBmYWRlSW5VcCB7XHJcbiAgZnJvbSB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDMwcHgpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBzcGluIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6075:
/*!***************************************************!*\
  !*** ./src/app/components/menu/menu.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuComponent: () => (/* binding */ MenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);



class MenuComponent {
  constructor(router) {
    this.router = router;
  }
  logout() {
    // Limpiar datos de autenticación
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
    // Redirigir a login
    this.router.navigate(['/login']);
  }
  static #_ = this.ɵfac = function MenuComponent_Factory(t) {
    return new (t || MenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: MenuComponent,
    selectors: [["vex-menu"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 16,
    vars: 0,
    consts: [[1, "w-full"], [1, "bg-black", "flex", "text-white", "ps-8", "sm:pe-[8rem]", "py-5", "justify-between", "items-center"], ["href", "#", 1, "text-[1.2rem]", "font-semibold"], [1, "flex", "justify-center", "gap-[6rem]", "text-center", "text-[1rem]", "items-center"], [1, "cursor-pointer", "hover:text-gray-300", "transition-colors"], [1, "bg-white", "hover:bg-[#FBFBFB]", "text-black", "px-4", "py-2", "rounded-lg", "transition-colors", "duration-200", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16,17 21,12 16,7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"]],
    template: function MenuComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "nav", 1)(2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Grupo Vanguardia");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 3)(5, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Consulta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li")(10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MenuComponent_Template_button_click_10_listener() {
          return ctx.logout();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "svg", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 7)(13, "polyline", 8)(14, "line", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Cerrar Sesi\u00F3n ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6384:
/*!***************************************************!*\
  !*** ./src/app/components/tabs/tabs.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TabsComponent: () => (/* binding */ TabsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);




function TabsComponent_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TabsComponent_li_3_Template_li_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const tab_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.selectTab(tab_r1.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active-tab", ctx_r0.isActive(tab_r1.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tab_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tab_r1.label);
  }
}
class TabsComponent {
  constructor() {
    this.tabChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.activeTab = 'orders'; // Tab por defecto: Ordenes
    this.tabs = [{
      id: 'orders',
      label: 'Ordenes',
      icon: 'order_approve'
    }, {
      id: 'inventory',
      label: 'Inventario',
      icon: 'inventory'
    }, {
      id: 'services',
      label: 'Servicios',
      icon: 'car_repair'
    }, {
      id: 'clients',
      label: 'Clientes',
      icon: 'group'
    }, {
      id: 'dwh',
      label: 'DWH',
      icon: 'database'
    }];
  }
  selectTab(tabId) {
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
    console.log('🔄 Tab seleccionado:', tabId);
  }
  isActive(tabId) {
    return this.activeTab === tabId;
  }
  static #_ = this.ɵfac = function TabsComponent_Factory(t) {
    return new (t || TabsComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: TabsComponent,
    selectors: [["vex-tabs"]],
    outputs: {
      tabChanged: "tabChanged"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 1,
    consts: [[1, "flex", "justify-center", "px-[10rem]"], [1, "tab", "w-full", "flex", "justify-center", "px-4", "pt-4", "pb-1", "rounded-t-2xl", "bg-white"], [1, "w-full", "flex", "justify-between", "text-[1rem]", "text-[#848484]"], ["class", "flex flex-col items-center cursor-pointer transition-colors duration-200 hover:text-blue-600", 3, "active-tab", "click", 4, "ngFor", "ngForOf"], [1, "flex", "flex-col", "items-center", "cursor-pointer", "transition-colors", "duration-200", "hover:text-blue-600", 3, "click"], [1, "material-symbols-outlined", "icon-tab"]],
    template: function TabsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TabsComponent_li_3_Template, 5, 4, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tabs);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf],
    styles: ["li[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-bottom: 0.3rem;\n}\n\n.icon-tab[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #848484;\n}\n\nli[_ngcontent-%COMP%]:hover {\n  border-bottom: 3px solid #FF5C20;\n  cursor: pointer;\n}\n\nli[_ngcontent-%COMP%]:hover   .icon-tab[_ngcontent-%COMP%] {\n  color: #FF5C20;\n}\n\nli[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%]:last-child {\n  color: black;\n}\n\n\n\nli.active-tab[_ngcontent-%COMP%] {\n  border-bottom: 3px solid #FF5C20;\n}\n\nli.active-tab[_ngcontent-%COMP%]   .icon-tab[_ngcontent-%COMP%] {\n  color: #FF5C20;\n}\n\nli.active-tab[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: black;\n  font-weight: 600;\n}\n\n.tab[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #888888;\n  border-right: 3px solid black;\n  border-left: 3px solid black;\n  border-top: 3px solid black;\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy90YWJzL3RhYnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQ0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQSw0QkFBQTtBQUNBO0VBQ0UsZ0NBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0NBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsMkJBQUE7RUFDQSwyQ0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsibGl7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDAuM3JlbTtcclxufVxyXG5cclxuLmljb24tdGFie1xyXG4gICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgY29sb3I6ICM4NDg0ODQ7XHJcbn1cclxuXHJcbmxpOmhvdmVye1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNGRjVDMjA7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbmxpOmhvdmVyIC5pY29uLXRhYiB7XHJcbiAgY29sb3I6ICNGRjVDMjA7XHJcbn1cclxuXHJcbmxpOmhvdmVyIHNwYW46bGFzdC1jaGlsZCB7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgdGFiIGFjdGl2byAqL1xyXG5saS5hY3RpdmUtdGFiIHtcclxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI0ZGNUMyMDtcclxufVxyXG5cclxubGkuYWN0aXZlLXRhYiAuaWNvbi10YWIge1xyXG4gIGNvbG9yOiAjRkY1QzIwO1xyXG59XHJcblxyXG5saS5hY3RpdmUtdGFiIHNwYW46bGFzdC1jaGlsZCB7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi50YWJ7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4ODg4ODg7XHJcbiAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgYmxhY2s7XHJcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCBibGFjaztcclxuICBib3JkZXItdG9wOjNweCBzb2xpZCBibGFjayA7XHJcbiAgYm94LXNoYWRvdzogMHB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 214:
/*!**********************************************!*\
  !*** ./src/app/core/icons/icons.provider.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideIcons: () => (/* binding */ provideIcons)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _icons_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons.service */ 3296);


function provideIcons() {
  return [{
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_icons_service__WEBPACK_IMPORTED_MODULE_0__.IconsService),
    multi: true
  }];
}

/***/ }),

/***/ 3296:
/*!*********************************************!*\
  !*** ./src/app/core/icons/icons.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconsService: () => (/* binding */ IconsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 6515);



class IconsService {
  constructor(domSanitizer, iconRegistry) {
    this.domSanitizer = domSanitizer;
    this.iconRegistry = iconRegistry;
    this.iconRegistry.addSvgIconResolver((name, namespace) => {
      switch (namespace) {
        case 'mat':
          return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/material-design-icons/two-tone/${name}.svg`);
        case 'logo':
          return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/logos/${name}.svg`);
        case 'flag':
          return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/flags/${name}.svg`);
        default:
          return null;
      }
    });
  }
  static #_ = this.ɵfac = function IconsService_Factory(t) {
    return new (t || IconsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconRegistry));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: IconsService,
    factory: IconsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 310:
/*!**********************************************!*\
  !*** ./src/app/core/luxon/luxon.provider.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideLuxon: () => (/* binding */ provideLuxon)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _luxon_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./luxon.service */ 5199);


function provideLuxon() {
  return [{
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_luxon_service__WEBPACK_IMPORTED_MODULE_0__.LuxonService),
    multi: true
  }];
}

/***/ }),

/***/ 5199:
/*!*********************************************!*\
  !*** ./src/app/core/luxon/luxon.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LuxonService: () => (/* binding */ LuxonService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ 7765);



class LuxonService {
  constructor(localeId) {
    this.localeId = localeId;
    luxon__WEBPACK_IMPORTED_MODULE_0__.Settings.defaultLocale = this.localeId;
  }
  static #_ = this.ɵfac = function LuxonService_Factory(t) {
    return new (t || LuxonService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.LOCALE_ID));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: LuxonService,
    factory: LuxonService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8936:
/*!**************************************************************!*\
  !*** ./src/app/core/navigation/navigation-loader.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationLoaderService: () => (/* binding */ NavigationLoaderService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);



class NavigationLoaderService {
  get items$() {
    return this._items.asObservable();
  }
  constructor(layoutService) {
    this.layoutService = layoutService;
    this._items = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.loadNavigation();
  }
  loadNavigation() {
    this._items.next([{
      type: 'subheading',
      label: 'Dashboards',
      children: [{
        type: 'link',
        label: 'Analytics',
        route: '/',
        icon: 'mat:insights',
        routerLinkActiveOptions: {
          exact: true
        }
      }]
    }]);
  }
  static #_ = this.ɵfac = function NavigationLoaderService_Factory(t) {
    return new (t || NavigationLoaderService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_0__.VexLayoutService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: NavigationLoaderService,
    factory: NavigationLoaderService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 2528:
/*!********************************************************!*\
  !*** ./src/app/core/navigation/navigation.provider.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provideNavigation: () => (/* binding */ provideNavigation)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation.service */ 120);
/* harmony import */ var _navigation_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation-loader.service */ 8936);



function provideNavigation() {
  return [{
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_navigation_service__WEBPACK_IMPORTED_MODULE_0__.NavigationService),
    multi: true
  }, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ENVIRONMENT_INITIALIZER,
    useValue: () => (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_navigation_loader_service__WEBPACK_IMPORTED_MODULE_1__.NavigationLoaderService),
    multi: true
  }];
}

/***/ }),

/***/ 120:
/*!*******************************************************!*\
  !*** ./src/app/core/navigation/navigation.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationService: () => (/* binding */ NavigationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _navigation_loader_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation-loader.service */ 8936);



class NavigationService {
  constructor(navigationLoaderService) {
    this.navigationLoaderService = navigationLoaderService;
    this.items$ = this.navigationLoaderService.items$;
    this._openChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.openChange$ = this._openChangeSubject.asObservable();
  }
  triggerOpenChange(item) {
    this._openChangeSubject.next(item);
  }
  isLink(item) {
    return item.type === 'link';
  }
  isDropdown(item) {
    return item.type === 'dropdown';
  }
  isSubheading(item) {
    return item.type === 'subheading';
  }
  static #_ = this.ɵfac = function NavigationService_Factory(t) {
    return new (t || NavigationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_navigation_loader_service__WEBPACK_IMPORTED_MODULE_0__.NavigationLoaderService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: NavigationService,
    factory: NavigationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 1391:
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);


class AuthGuard {
  constructor(router) {
    this.router = router;
  }
  canActivate() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      // Verificar si la sesión no ha expirado (opcional: 24 horas)
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const now = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas
        if (now - parseInt(loginTime) > sessionDuration) {
          // Sesión expirada
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('loginTime');
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    }
    // No autenticado, redirigir a login
    this.router.navigate(['/login']);
    return false;
  }
  static #_ = this.ɵfac = function AuthGuard_Factory(t) {
    return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6459:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _vex_components_vex_page_layout_vex_page_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/components/vex-page-layout/vex-page-layout.component */ 306);
/* harmony import */ var _components_menu_menu_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/menu/menu.component */ 6075);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_invoice_table_invoice_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/invoice-table/invoice-table.component */ 3973);
/* harmony import */ var _components_invoice_filter_invoice_filter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/invoice-filter/invoice-filter.component */ 5697);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tabs/tabs.component */ 6384);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);








const _c0 = ["invoiceTable"];
function HomeComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "vex-invoice-filter", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("filterChange", function HomeComponent_div_4_Template_vex_invoice_filter_filterChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.handleFilter($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "vex-invoice-table", null, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function HomeComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Secci\u00F3n de Inventario");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Funcionalidad pr\u00F3ximamente...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Secci\u00F3n de Servicios");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Funcionalidad pr\u00F3ximamente...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Secci\u00F3n de Clientes");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Funcionalidad pr\u00F3ximamente...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Secci\u00F3n de DWH");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Funcionalidad pr\u00F3ximamente...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
class HomeComponent {
  constructor() {
    this.activeTab = 'orders'; // Tab activo por defecto: Ordenes
  }

  onTabChanged(tabId) {
    this.activeTab = tabId;
    console.log('🏠 Home - Tab cambiado a:', tabId);
  }
  handleFilter(filters) {
    console.log('Home -> filter recibido:', filters); // <-- debug
    if (this.invoiceTable && this.invoiceTable.applyFilter) {
      this.invoiceTable.applyFilter(filters);
    } else {
      console.warn('invoiceTable no disponible aún o no tiene applyFilter');
    }
  }
  static #_ = this.ɵfac = function HomeComponent_Factory(t) {
    return new (t || HomeComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: HomeComponent,
    selectors: [["vex-home"]],
    viewQuery: function HomeComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.invoiceTable = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 9,
    vars: 5,
    consts: [["mode", "card", 1, "m-0", "p-0"], [1, "mb-6"], [3, "tabChanged"], [4, "ngIf"], ["class", "p-8 text-center", 4, "ngIf"], [3, "filterChange"], ["invoiceTable", ""], [1, "p-8", "text-center"], [1, "text-2xl", "font-bold", "text-gray-600"], [1, "text-gray-500", "mt-4"]],
    template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "vex-page-layout", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "vex-menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "vex-tabs", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("tabChanged", function HomeComponent_Template_vex_tabs_tabChanged_3_listener($event) {
          return ctx.onTabChanged($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, HomeComponent_div_4_Template, 4, 0, "div", 3)(5, HomeComponent_div_5_Template, 5, 0, "div", 4)(6, HomeComponent_div_6_Template, 5, 0, "div", 4)(7, HomeComponent_div_7_Template, 5, 0, "div", 4)(8, HomeComponent_div_8_Template, 5, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "inventory");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "services");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "clients");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "dwh");
      }
    },
    dependencies: [_vex_components_vex_page_layout_vex_page_layout_component__WEBPACK_IMPORTED_MODULE_0__.VexPageLayoutComponent, _components_menu_menu_component__WEBPACK_IMPORTED_MODULE_1__.MenuComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _components_invoice_table_invoice_table_component__WEBPACK_IMPORTED_MODULE_2__.InvoiceTableComponent, _components_invoice_filter_invoice_filter_component__WEBPACK_IMPORTED_MODULE_3__.InvoiceFilterComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_4__.TabsComponent],
    styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.vex-page-layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxuICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbn1cclxuXHJcbi52ZXgtcGFnZS1sYXlvdXQge1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 8158:
/*!**************************************************************!*\
  !*** ./src/app/layouts/base-layout/base-layout.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLayoutComponent: () => (/* binding */ BaseLayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sidenav */ 1465);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 8989);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3839);
/* harmony import */ var _vex_utils_check_router_childs_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/utils/check-router-childs-data */ 9681);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _vex_utils_is_nil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/utils/is-nil */ 5832);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);













function BaseLayoutComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵprojection"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const config_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("vex-layout-boxed", config_r1.boxed)("vex-layout-footer-enabled", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 18, ctx_r0.isFooterVisible$))("vex-layout-footer-fixed", config_r1.footer.fixed && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 20, ctx_r0.isFooterVisible$))("vex-layout-horizontal", config_r1.layout === "horizontal")("vex-layout-scroll-disabled", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 22, ctx_r0.scrollDisabled$))("vex-layout-search-overlay-open", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 24, ctx_r0.searchOpen$))("vex-layout-sidenav-collapsed", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 26, ctx_r0.sidenavCollapsed$))("vex-layout-toolbar-fixed", config_r1.toolbar.fixed)("vex-layout-vertical", config_r1.layout === "vertical");
  }
}
const _c0 = ["*"];
class BaseLayoutComponent {
  constructor(layoutService, configService, router, document) {
    this.layoutService = layoutService;
    this.configService = configService;
    this.router = router;
    this.document = document;
    this.config$ = this.configService.config$;
    /**
     * Check if footer should be visible
     */
    this.isFooterVisible$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest)([
    /**
     * Check if footer is enabled in the config
     */
    this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(config => config.footer.visible)),
    /**
     * Check if footer is enabled on the current route
     */
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(() => (0,_vex_utils_check_router_childs_data__WEBPACK_IMPORTED_MODULE_0__.checkRouterChildsData)(this.router.routerState.root.snapshot, data => data.footerVisible ?? true)))]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(([configEnabled, routeEnabled]) => {
      if ((0,_vex_utils_is_nil__WEBPACK_IMPORTED_MODULE_1__.isNil)(routeEnabled)) {
        return configEnabled;
      }
      return configEnabled && routeEnabled;
    }));
    this.sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
    this.isDesktop$ = this.layoutService.isDesktop$;
    this.scrollDisabled$ = this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(() => (0,_vex_utils_check_router_childs_data__WEBPACK_IMPORTED_MODULE_0__.checkRouterChildsData)(this.router.routerState.root.snapshot, data => data.scrollDisabled ?? false)));
    this.searchOpen$ = this.layoutService.searchOpen$;
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_4__.DestroyRef);
  }
  ngOnInit() {
    /**
     * Open sidenav on desktop when layout is not vertical
     * Close sidenav on mobile or when layout is vertical
     */
    (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest)([this.isDesktop$, this.configService.select(config => config.layout === 'vertical')]).pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.takeUntilDestroyed)(this.destroyRef)).subscribe(([isDesktop, isVerticalLayout]) => {
      if (isDesktop && !isVerticalLayout) {
        this.layoutService.openSidenav();
      } else {
        this.layoutService.closeSidenav();
      }
    });
    /**
     * Mobile only:
     * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
     */
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.withLatestFrom)(this.isDesktop$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(([event, matches]) => !matches), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.layoutService.closeSidenav());
  }
  ngAfterViewInit() {
    /**
     * Enable Scrolling to specific parts of the page using the Router
     */
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(e => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.Scroll), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.takeUntilDestroyed)(this.destroyRef)).subscribe(e => {
      if (e.position) {
        // backward navigation
        this.sidenavContainer.scrollable.scrollTo({
          start: e.position[0],
          top: e.position[1]
        });
      } else if (e.anchor) {
        // anchor navigation
        const scroll = anchor => this.sidenavContainer.scrollable.scrollTo({
          behavior: 'smooth',
          top: anchor.offsetTop,
          left: anchor.offsetLeft
        });
        let anchorElem = this.document.getElementById(e.anchor);
        if (anchorElem) {
          scroll(anchorElem);
        } else {
          setTimeout(() => {
            if (!e.anchor) {
              return;
            }
            anchorElem = this.document.getElementById(e.anchor);
            if (!anchorElem) {
              return;
            }
            scroll(anchorElem);
          }, 100);
        }
      } else {
        // forward navigation
        this.sidenavContainer.scrollable.scrollTo({
          top: 0,
          start: 0
        });
      }
    });
  }
  static #_ = this.ɵfac = function BaseLayoutComponent_Factory(t) {
    return new (t || BaseLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_2__.VexLayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_3__.VexConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_12__.DOCUMENT));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: BaseLayoutComponent,
    selectors: [["vex-base-layout"]],
    contentQueries: function BaseLayoutComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵcontentQuery"](dirIndex, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatSidenavContainer, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.sidenavContainer = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 3,
    consts: [["class", "vex-base-layout-container", 3, "vex-layout-boxed", "vex-layout-footer-enabled", "vex-layout-footer-fixed", "vex-layout-horizontal", "vex-layout-scroll-disabled", "vex-layout-search-overlay-open", "vex-layout-sidenav-collapsed", "vex-layout-toolbar-fixed", "vex-layout-vertical", 4, "ngIf"], [1, "vex-base-layout-container"]],
    template: function BaseLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, BaseLayoutComponent_div_0_Template, 7, 28, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, ctx.config$));
      }
    },
    dependencies: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatSidenavModule, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3593:
/*!******************************************************************************************************!*\
  !*** ./src/app/layouts/components/config-panel/config-panel-toggle/config-panel-toggle.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigPanelToggleComponent: () => (/* binding */ ConfigPanelToggleComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 895);






class ConfigPanelToggleComponent {
  constructor() {
    this.openConfig = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function ConfigPanelToggleComponent_Factory(t) {
    return new (t || ConfigPanelToggleComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: ConfigPanelToggleComponent,
    selectors: [["vex-config-panel-toggle"]],
    outputs: {
      openConfig: "openConfig"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 0,
    consts: [["color", "primary", "mat-fab", "", "type", "button", 1, "config-panel-toggle", 3, "click"], ["svgIcon", "mat:settings"]],
    template: function ConfigPanelToggleComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigPanelToggleComponent_Template_button_click_0_listener() {
          return ctx.openConfig.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatFabButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIcon],
    styles: [".config-panel-toggle[_ngcontent-%COMP%] {\n  z-index: 100;\n  position: fixed;\n  bottom: 1.5rem;\n  right: 1.5rem;\n}\n\n  [dir=rtl] .config-panel-toggle {\n  left: 1.5rem;\n  right: auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL2NvbmZpZy1wYW5lbC9jb25maWctcGFuZWwtdG9nZ2xlL2NvbmZpZy1wYW5lbC10b2dnbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUFBLGNBQUE7RUFBQSxhQUFBO0FBQ0Y7O0FBR0U7RUFBQSxZQUFBO0VBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi5jb25maWctcGFuZWwtdG9nZ2xlIHtcbiAgei1pbmRleDogMTAwO1xuICBAYXBwbHkgZml4ZWQgYm90dG9tLTYgcmlnaHQtNjtcbn1cblxuOjpuZy1kZWVwIFtkaXI9XCJydGxcIl0gLmNvbmZpZy1wYW5lbC10b2dnbGUge1xuICBAYXBwbHkgbGVmdC02IHJpZ2h0LWF1dG87XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 6426:
/*!***************************************************************************!*\
  !*** ./src/app/layouts/components/config-panel/config-panel.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigPanelComponent: () => (/* binding */ ConfigPanelComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/radio */ 2106);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/config/vex-config.interface */ 5062);
/* harmony import */ var _vex_utils_is_nil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/utils/is-nil */ 5832);
/* harmony import */ var _vex_config_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vex/config/constants */ 6739);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _vex_config_config_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/config/config.token */ 7892);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);


















function ConfigPanelComponent_div_0_div_8_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-icon", 24);
  }
}
function ConfigPanelComponent_div_0_div_8_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-icon", 25);
  }
}
function ConfigPanelComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_div_8_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);
      const colorScheme_r6 = restoredCtx.ngIf;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r9.isDark(colorScheme_r6) ? ctx_r9.disableDarkMode() : ctx_r9.enableDarkMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, ConfigPanelComponent_div_0_div_8_mat_icon_2_Template, 1, 0, "mat-icon", 21)(3, ConfigPanelComponent_div_0_div_8_mat_icon_3_Template, 1, 0, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "DARK MODE");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const colorScheme_r6 = ctx.ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.isDark(colorScheme_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r2.isDark(colorScheme_r6));
  }
}
function ConfigPanelComponent_div_0_div_13_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-icon", 24);
  }
}
const _c0 = (a0, a1) => ({
  "bg-primary-600/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-500": a0,
  "bg-primary-600 text-on-primary-600": a1
});
function ConfigPanelComponent_div_0_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_div_13_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14);
      const theme_r11 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r13.selectTheme(theme_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, ConfigPanelComponent_div_0_div_13_mat_icon_4_Template, 1, 0, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const theme_r11 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMapInterpolate1"]("", theme_r11.className, " vex-color-picker rounded-full mt-2 flex items-center cursor-pointer relative hover:bg-primary-600 hover:text-on-primary-600 dark:hover:bg-primary-600 dark:hover:text-on-primary-600");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](14, _c0, !((tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 6, ctx_r3.isSelectedTheme$)) == null ? null : tmp_1_0(theme_r11.className)), (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 8, ctx_r3.isSelectedTheme$)) == null ? null : tmp_1_0(theme_r11.className)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 10, ctx_r3.isSelectedTheme$)) == null ? null : tmp_2_0(theme_r11.className));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 12, theme_r11.name));
  }
}
function ConfigPanelComponent_div_0_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 28)(1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "img", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 31)(4, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_div_17_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const config_r15 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r17.setConfig(config_r15.id, ctx_r17.ColorSchemeName.LIGHT));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " LIGHT ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_div_17_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18);
      const config_r15 = restoredCtx.$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r19.setConfig(config_r15.id, ctx_r19.ColorSchemeName.DARK));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " DARK ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const config_r15 = ctx.$implicit;
    const first_r16 = ctx.first;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("mt-6", !first_r16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", config_r15.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](config_r15.name);
  }
}
const _c1 = (a0, a1) => ({
  "border-gray-300": a0,
  "border-transparent": a1
});
const _c2 = (a0, a1) => ({
  "bg-primary-600 border-primary-600": a0,
  "bg-foreground border-gray-500 group-hover:bg-app-bar": a1
});
function ConfigPanelComponent_div_0_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_div_22_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const borderRadius_r20 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r21.selectBorderRadius(borderRadius_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const borderRadius_r20 = ctx.$implicit;
    const setting_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](4, _c1, ctx_r5.isSelectedBorderRadius(borderRadius_r20, setting_r1), !ctx_r5.isSelectedBorderRadius(borderRadius_r20, setting_r1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("border-top-left-radius", borderRadius_r20.value + borderRadius_r20.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](7, _c2, ctx_r5.isSelectedBorderRadius(borderRadius_r20, setting_r1), !ctx_r5.isSelectedBorderRadius(borderRadius_r20, setting_r1)));
  }
}
const _c3 = (a0, a1) => ({
  "!bg-transparent !border-solid !border-primary-600 !text-primary-600": a0,
  "!border-transparent": a1
});
function ConfigPanelComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1)(1, "h2", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 4)(6, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "THEME BASE");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, ConfigPanelComponent_div_0_div_8_Template, 6, 2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 4)(11, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "THEME COLORS");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, ConfigPanelComponent_div_0_div_13_Template, 9, 17, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 4)(15, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "PRE-BUILT LAYOUTS");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, ConfigPanelComponent_div_0_div_17_Template, 10, 4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 4)(19, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20, "ROUNDED CORNERS");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, ConfigPanelComponent_div_0_div_22_Template, 2, 10, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 4)(24, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25, "BUTTON STYLE");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 11)(27, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_Template_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r24.selectButtonStyle(undefined));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, " INHERIT ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConfigPanelComponent_div_0_Template_button_click_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r26.selectButtonStyle(ctx_r26.roundedButtonValue));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, " ROUNDED ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 4)(32, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Layout");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "div", 14)(35, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Orientation");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "mat-slide-toggle", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function ConfigPanelComponent_div_0_Template_mat_slide_toggle_change_37_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r27.layoutRTLChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](38, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39, "RTL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 4)(41, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](42, "Toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "div", 14)(44, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](45, "Position");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "mat-radio-group", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function ConfigPanelComponent_div_0_Template_mat_radio_group_change_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r28.toolbarPositionChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "mat-radio-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](48, "Fixed");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "mat-radio-button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](50, "Static");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](51, "div", 4)(52, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](53, "Footer");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "div", 14)(55, "mat-slide-toggle", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function ConfigPanelComponent_div_0_Template_mat_slide_toggle_change_55_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r29.footerVisibleChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](56, "Visible ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](57, "h5", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](58, "Position");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](59, "mat-radio-group", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function ConfigPanelComponent_div_0_Template_mat_radio_group_change_59_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r30.footerPositionChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "mat-radio-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](61, "Fixed");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "mat-radio-button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](63, "Static");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const setting_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](9, 10, ctx_r0.colorScheme$));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.themes);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.configs);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.roundedCornerValues);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](14, _c3, !ctx_r0.isSelectedButtonStyle(undefined, setting_r1), ctx_r0.isSelectedButtonStyle(undefined, setting_r1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](17, _c3, !ctx_r0.isSelectedButtonStyle(ctx_r0.roundedButtonValue, setting_r1), ctx_r0.isSelectedButtonStyle(ctx_r0.roundedButtonValue, setting_r1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](38, 12, ctx_r0.isRTL$));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", setting_r1.toolbar.fixed ? "fixed" : "static");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", setting_r1.footer.visible);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", setting_r1.footer.fixed ? "fixed" : "static");
  }
}
class ConfigPanelComponent {
  constructor(configService, themes) {
    this.configService = configService;
    this.themes = themes;
    this.configs = this.configService.configs;
    this.config$ = this.configService.config$;
    this.isRTL$ = this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(config => config.direction === 'rtl'));
    this.colorScheme$ = this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(config => config.style.colorScheme));
    this.borderRadius$ = this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(config => config.style.borderRadius.value));
    this.ConfigName = _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__.VexConfigName;
    this.ColorSchemeName = _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__.VexColorScheme;
    this.selectedTheme$ = this.configService.select(config => config.style.themeClassName);
    this.isSelectedTheme$ = this.configService.select(config => config.style.themeClassName).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(themeClassName => theme => themeClassName === theme));
    this.roundedCornerValues = [{
      value: 0,
      unit: 'rem'
    }, {
      value: 0.25,
      unit: 'rem'
    }, {
      value: 0.5,
      unit: 'rem'
    }, {
      value: 0.75,
      unit: 'rem'
    }, {
      value: 1,
      unit: 'rem'
    }, {
      value: 1.25,
      unit: 'rem'
    }, {
      value: 1.5,
      unit: 'rem'
    }, {
      value: 1.75,
      unit: 'rem'
    }];
    this.roundedButtonValue = _vex_config_constants__WEBPACK_IMPORTED_MODULE_2__.defaultRoundedButtonBorderRadius;
  }
  setConfig(layout, colorScheme) {
    this.configService.setConfig(layout);
    this.configService.updateConfig({
      style: {
        colorScheme
      }
    });
  }
  selectTheme(theme) {
    this.configService.updateConfig({
      style: {
        themeClassName: theme.className
      }
    });
  }
  enableDarkMode() {
    this.configService.updateConfig({
      style: {
        colorScheme: _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__.VexColorScheme.DARK
      }
    });
  }
  disableDarkMode() {
    this.configService.updateConfig({
      style: {
        colorScheme: _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__.VexColorScheme.LIGHT
      }
    });
  }
  layoutRTLChange(change) {
    this.configService.updateConfig({
      direction: change.checked ? 'rtl' : 'ltr'
    });
  }
  toolbarPositionChange(change) {
    this.configService.updateConfig({
      toolbar: {
        fixed: change.value === 'fixed'
      }
    });
  }
  footerVisibleChange(change) {
    this.configService.updateConfig({
      footer: {
        visible: change.checked
      }
    });
  }
  footerPositionChange(change) {
    this.configService.updateConfig({
      footer: {
        fixed: change.value === 'fixed'
      }
    });
  }
  isSelectedBorderRadius(borderRadius, config) {
    return borderRadius.value === config.style.borderRadius.value && borderRadius.unit === config.style.borderRadius.unit;
  }
  selectBorderRadius(borderRadius) {
    this.configService.updateConfig({
      style: {
        borderRadius: borderRadius
      }
    });
  }
  isSelectedButtonStyle(buttonStyle, config) {
    if ((0,_vex_utils_is_nil__WEBPACK_IMPORTED_MODULE_1__.isNil)(config.style.button.borderRadius) && (0,_vex_utils_is_nil__WEBPACK_IMPORTED_MODULE_1__.isNil)(buttonStyle)) {
      return true;
    }
    return buttonStyle?.value === config.style.button.borderRadius?.value;
  }
  selectButtonStyle(borderRadius) {
    this.configService.updateConfig({
      style: {
        button: {
          borderRadius: borderRadius
        }
      }
    });
  }
  isDark(colorScheme) {
    return colorScheme === _vex_config_vex_config_interface__WEBPACK_IMPORTED_MODULE_0__.VexColorScheme.DARK;
  }
  static #_ = this.ɵfac = function ConfigPanelComponent_Factory(t) {
    return new (t || ConfigPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_4__.VexConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_vex_config_config_token__WEBPACK_IMPORTED_MODULE_3__.VEX_THEMES));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: ConfigPanelComponent,
    selectors: [["vex-config-panel"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [["class", "config-panel", 4, "ngIf"], [1, "config-panel"], [1, "headline", "mb-4"], ["svgIcon", "mat:settings", 1, "mr-3"], [1, "section"], [1, "subheading"], ["class", "rounded-full mt-2 flex items-center cursor-pointer relative bg-black text-white select-none", "matRipple", "", 3, "click", 4, "ngIf"], ["matRipple", "", 3, "ngClass", "class", "click", 4, "ngFor", "ngForOf"], ["class", "rounded", 3, "mt-6", 4, "ngFor", "ngForOf"], [1, "grid", "grid-cols-4", "gap-4"], ["class", "aspect-square bgbg-primary-60010 flex justify-end items-end cursor-pointer border-2 hover:border-gray-200 group transition duration-400 ease-out-swift rounded-tl", 3, "border-gray-300", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "flex", "justify-between", "gap-4"], ["color", "primary", "mat-flat-button", "", "type", "button", 1, "rounded", "flex-1", "border-2", "border-solid", 3, "ngClass", "click"], ["color", "primary", "mat-flat-button", "", "type", "button", 1, "rounded-full", "flex-1", "border-2", "border-solid", 3, "ngClass", "click"], [1, "section-content"], [3, "checked", "change"], [1, "flex", "flex-col", "gap-3", 3, "value", "change"], ["value", "fixed"], ["value", "static"], ["matRipple", "", 1, "rounded-full", "mt-2", "flex", "items-center", "cursor-pointer", "relative", "bg-black", "text-white", "select-none", 3, "click"], [1, "m-2", "h-6", "w-6", "rounded-full"], ["svgIcon", "mat:check", 4, "ngIf"], ["svgIcon", "mat:close", 4, "ngIf"], [1, "ml-1", "font-medium", "text-sm"], ["svgIcon", "mat:check"], ["svgIcon", "mat:close"], ["matRipple", "", 3, "ngClass", "click"], [1, "m-2", "h-6", "w-6", "rounded-full", "text-on-primary-600", "bg-primary-600"], [1, "rounded"], [1, "layout-image", "rounded", "overflow-hidden", "relative", "hover:bg-hover", "shadow-md"], [1, "w-full", "block", 3, "src"], [1, "layout-image-overlay", "flex", "items-center", "justify-center", "gap-1"], ["mat-raised-button", "", "type", "button", 1, "bg-white", "text-black", "flex-none", "!min-w-[70px]", 3, "click"], ["mat-raised-button", "", "type", "button", 1, "!bg-black", "!text-white", "flex-none", "!min-w-[70px]", 3, "click"], [1, "text-center", "body-2", "mt-2"], [1, "aspect-square", "bgbg-primary-60010", "flex", "justify-end", "items-end", "cursor-pointer", "border-2", "hover:border-gray-200", "group", "transition", "duration-400", "ease-out-swift", "rounded-tl", 3, "border-gray-300", "ngClass", "click"], [1, "h-7", "w-7", "border-2", "transition", "duration-400", "ease-out-swift", 2, "margin-bottom", "-2px", "margin-right", "-2px", 3, "ngClass"]],
    template: function ConfigPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, ConfigPanelComponent_div_0_Template, 64, 20, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 1, ctx.config$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggleModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggle, _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__.MatRadioModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__.MatRadioButton, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.UpperCasePipe],
    styles: [".config-panel[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.heading[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n\n.section[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  border-bottom-width: 1px;\n  padding-bottom: 1rem;\n}\n.section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.section-content[_ngcontent-%COMP%] {\n  margin-inline-start: 0.75rem;\n}\n.section-content[_ngcontent-%COMP%]   .subheading[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n\n.subheading[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-secondary-text-rgb) / var(--tw-text-opacity));\n}\n\n.layout[_ngcontent-%COMP%]    + .layout[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n\n.layout-image[_ngcontent-%COMP%]:hover   .layout-image-overlay[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7);\n  opacity: 1;\n  visibility: visible;\n}\n.layout-image[_ngcontent-%COMP%]   .layout-image-overlay[_ngcontent-%COMP%] {\n  border-radius: var(--vex-border-radius);\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  visibility: hidden;\n  width: 100%;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.layout-image[_ngcontent-%COMP%]   .layout-image-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0 8px;\n}\n\n.vex-color-picker[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-color-picker[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.color[_ngcontent-%COMP%] {\n  align-items: center;\n  border-radius: 50%;\n  display: flex;\n  flex-direction: row;\n  height: 36px;\n  justify-content: center;\n  text-align: center;\n  vertical-align: middle;\n  width: 36px;\n  margin-inline-end: 1rem;\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.color.light[_ngcontent-%COMP%] {\n  background: white;\n  color: #000;\n}\n.color.dark[_ngcontent-%COMP%] {\n  background: #303030;\n  color: white;\n}\n.color.flat[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #000;\n}\n\nmat-slide-toggle[_ngcontent-%COMP%]    + mat-slide-toggle[_ngcontent-%COMP%], mat-slide-toggle[_ngcontent-%COMP%]    + mat-checkbox[_ngcontent-%COMP%], mat-checkbox[_ngcontent-%COMP%]    + mat-slide-toggle[_ngcontent-%COMP%], mat-checkbox[_ngcontent-%COMP%]    + mat-checkbox[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL2NvbmZpZy1wYW5lbC9jb25maWctcGFuZWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxrQkFBQTtFQUFBLG1CQUFBO0VBQUEsbUJBQUE7RUFBQTtBQUFBOztBQUlBO0VBQUE7QUFBQTs7QUFJQTtFQUFBLG1CQUFBO0VBQUEsd0JBQUE7RUFBQTtBQUFBO0FBRUE7RUFDRSxtQkFBQTtBQUNKOztBQUlFO0VBQUE7QUFBQTtBQUdFO0VBQUE7QUFBQTs7QUFLRjtFQUFBLGdCQUFBO0VBQUEsbUJBQUE7RUFBQSxrQkFBQTtFQUFBLGlCQUFBO0VBQUEsZ0JBQUE7RUFBQSx5QkFBQTtFQUFBLG9CQUFBO0VBQUE7QUFBQTs7QUFJQTtFQUFBO0FBQUE7O0FBS0U7RUFDRSw4QkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQUhOO0FBT0U7RUFDRSx1Q0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxNQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0Esd0JBQUE7RUFBQSx3REFBQTtFQUFBLDBCQUFBO0VBQUEsNERBQUE7QUFMSjtBQU9JO0VBQ0UsY0FBQTtBQUxOOztBQVVBO0VBQ0UseUJBQUE7VUFBQSxpQkFBQTtFQUNBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBLDREQUFBO0FBUEY7QUFVSTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7O0FBSUo7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUFBLCtFQUFBO0VBQUEsbUdBQUE7RUFBQSx1R0FBQTtBQVJGO0FBVUU7RUFDRSxpQkFBQTtFQUNBLFdBQUE7QUFSSjtBQVdFO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FBVEo7QUFZRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQVZKOztBQWtCRTs7OztFQUFBLG1CQUFBO0VBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi5jb25maWctcGFuZWwge1xuICBAYXBwbHkgcHgtNCBweS02O1xufVxuXG4uaGVhZGluZyB7XG4gIEBhcHBseSBtYi02O1xufVxuXG4uc2VjdGlvbiB7XG4gIEBhcHBseSBib3JkZXItYiBtYi00IHBiLTQ7XG5cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICB9XG59XG5cbi5zZWN0aW9uLWNvbnRlbnQge1xuICBAYXBwbHkgbXMtMztcblxuICAuc3ViaGVhZGluZyB7XG4gICAgQGFwcGx5IG10LTY7XG4gIH1cbn1cblxuLnN1YmhlYWRpbmcge1xuICBAYXBwbHkgbXktNCB1cHBlcmNhc2UgdGV4dC14cyB0ZXh0LXNlY29uZGFyeSBmb250LW1lZGl1bTtcbn1cblxuLmxheW91dCArIC5sYXlvdXQge1xuICBAYXBwbHkgbXQtNjtcbn1cblxuLmxheW91dC1pbWFnZSB7XG4gICY6aG92ZXIge1xuICAgIC5sYXlvdXQtaW1hZ2Utb3ZlcmxheSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB9XG4gIH1cblxuICAubGF5b3V0LWltYWdlLW92ZXJsYXkge1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXZleC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgb3BhY2l0eTogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBAYXBwbHkgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwIGVhc2Utb3V0LXN3aWZ0O1xuXG4gICAgYnV0dG9uIHtcbiAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgIH1cbiAgfVxufVxuXG4udmV4LWNvbG9yLXBpY2tlciB7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBAYXBwbHkgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwIGVhc2Utb3V0LXN3aWZ0O1xuXG4gIHAge1xuICAgIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG4gIH1cbn1cblxuLmNvbG9yIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiAzNnB4O1xuICBAYXBwbHkgc2hhZG93LWxnIG1lLTQ7XG5cbiAgJi5saWdodCB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgY29sb3I6ICMwMDA7XG4gIH1cblxuICAmLmRhcmsge1xuICAgIGJhY2tncm91bmQ6ICMzMDMwMzA7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgJi5mbGF0IHtcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG59XG5cbm1hdC1zbGlkZS10b2dnbGUgKyBtYXQtc2xpZGUtdG9nZ2xlLFxubWF0LXNsaWRlLXRvZ2dsZSArIG1hdC1jaGVja2JveCxcbm1hdC1jaGVja2JveCArIG1hdC1zbGlkZS10b2dnbGUsXG5tYXQtY2hlY2tib3ggKyBtYXQtY2hlY2tib3gge1xuICBAYXBwbHkgYmxvY2sgbXQtMztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 3147:
/*!***************************************************************!*\
  !*** ./src/app/layouts/components/footer/footer.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);



class FooterComponent {
  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}
  static #_ = this.ɵfac = function FooterComponent_Factory(t) {
    return new (t || FooterComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: FooterComponent,
    selectors: [["vex-footer"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 0,
    consts: [[1, "flex-auto", "flex", "items-center", "container"], [1, "font-medium", "ltr:ml-4", "rtl:mr-4", "hidden", "sm:block"]],
    template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Vex - Angular 17+ Material Design Admin Template - Save 100s of hours designing and coding ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule],
    styles: ["[_nghost-%COMP%] {\n  position: relative;\n  bottom: 0px;\n  display: flex;\n  width: 100%;\n  border-top-width: 1px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-background-card-rgb) / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-text-rgb) / var(--tw-text-opacity));\n}:is(.dark   )[_nghost-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-background-background-rgb) / var(--tw-bg-opacity));\n}[_nghost-%COMP%] {\n  height: var(--vex-footer-height);\n  z-index: var(--vex-footer-z-index);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxrQkFBQTtFQUFBLFdBQUE7RUFBQSxhQUFBO0VBQUEsV0FBQTtFQUFBLHFCQUFBO0VBQUEsa0JBQUE7RUFBQSw0RUFBQTtFQUFBLG9CQUFBO0VBQUE7QUFBQSxDQUFBO0VBQUEsa0JBQUE7RUFBQTtBQUFBLENBREY7RUFFRSxnQ0FBQTtFQUNBLGtDQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIEBhcHBseSBiZy1mb3JlZ3JvdW5kIGRhcms6YmctYmFzZSBib3JkZXItdCB0ZXh0LWRlZmF1bHQgZmxleCB3LWZ1bGwgYm90dG9tLTAgcmVsYXRpdmU7XG4gIGhlaWdodDogdmFyKC0tdmV4LWZvb3Rlci1oZWlnaHQpO1xuICB6LWluZGV4OiB2YXIoLS12ZXgtZm9vdGVyLXotaW5kZXgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9208:
/*!********************************************************************************************!*\
  !*** ./src/app/layouts/components/navigation/navigation-item/navigation-item.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationItemComponent: () => (/* binding */ NavigationItemComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/utils/track-by */ 7637);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/navigation/navigation.service */ 120);













const _c0 = (a0, a1) => ({
  "bg-primary-600 text-on-primary-600": a0,
  "navigation-color": a1
});
function NavigationItemComponent_a_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("hover:bg-hover", !((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 5, ctx_r0.isActive$)) == null ? null : tmp_0_0(ctx_r0.item)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](11, _c0, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 7, ctx_r0.isActive$)) == null ? null : tmp_1_0(ctx_r0.item), !((tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 9, ctx_r0.isActive$)) == null ? null : tmp_1_0(ctx_r0.item))))("routerLink", ctx_r0.item.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.item.label, "\n");
  }
}
function NavigationItemComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavigationItemComponent_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.item.route());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("hover:bg-hover", !((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 3, ctx_r1.isActive$)) == null ? null : tmp_0_0(ctx_r1.item)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.item.label, "\n");
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_a_1_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 14);
  }
  if (rf & 2) {
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", child_r9.icon);
  }
}
const _c1 = a0 => ({
  "text-primary-600": a0
});
function NavigationItemComponent_ng_container_2_ng_container_8_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationItemComponent_ng_container_2_ng_container_8_a_1_mat_icon_2_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 4, ctx_r10.isActive$)) == null ? null : tmp_0_0(child_r9)))("routerLink", child_r9.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", child_r9.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](child_r9.label);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_div_2_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 14);
  }
  if (rf & 2) {
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", child_r9.icon);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavigationItemComponent_ng_container_2_ng_container_8_div_2_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](child_r9.route());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NavigationItemComponent_ng_container_2_ng_container_8_div_2_mat_icon_1_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", child_r9.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](child_r9.label);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 14);
  }
  if (rf & 2) {
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", child_r9.icon);
  }
}
const _c2 = a0 => ({
  item: a0
});
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](1, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](11);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c2, item_r42))("ngTemplateOutlet", _r8);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-menu", 6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template, 2, 4, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    const child_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](10);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r40)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, ctx_r39.isActive$)) == null ? null : tmp_1_0(child_r38)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", child_r38.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", child_r38.children);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](1, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_Template, 7, 8, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const child_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](9);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, child_r38))("ngTemplateOutlet", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r37.isDropdown(child_r38));
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-menu", 6, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template, 3, 5, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    const item_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](8);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r36)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, ctx_r35.isActive$)) == null ? null : tmp_1_0(item_r34)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r34.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", item_r34.children);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](1, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_ng_container_2_Template, 7, 8, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](7);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, item_r34))("ngTemplateOutlet", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r33.isDropdown(item_r34));
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-menu", 6, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_ng_container_6_Template, 3, 5, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    const child_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](6);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r32)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, ctx_r31.isActive$)) == null ? null : tmp_1_0(child_r30)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", child_r30.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", child_r30.children);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](1, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_ng_container_2_Template, 7, 8, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const child_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](5);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, child_r30))("ngTemplateOutlet", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r29.isDropdown(child_r30));
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-menu", 6, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_ng_container_6_Template, 3, 5, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r28)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c1, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, ctx_r27.isActive$)) == null ? null : tmp_1_0(item_r26)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r26.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", item_r26.children);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](1, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_ng_container_2_Template, 7, 8, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c2, item_r26))("ngTemplateOutlet", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r24.isDropdown(item_r26));
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_mat_icon_3_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-menu", 6, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_ng_container_8_Template, 3, 5, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
    const child_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r23)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c1, (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 5, ctx_r12.isActive$)) == null ? null : tmp_1_0(child_r9)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", child_r9.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](child_r9.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", child_r9.children);
  }
}
function NavigationItemComponent_ng_container_2_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, NavigationItemComponent_ng_container_2_ng_container_8_a_1_Template, 5, 8, "a", 10)(2, NavigationItemComponent_ng_container_2_ng_container_8_div_2_Template, 4, 2, "div", 11)(3, NavigationItemComponent_ng_container_2_ng_container_8_ng_container_3_Template, 9, 9, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const child_r9 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r6.isLink(child_r9) && !ctx_r6.isFunction(child_r9.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r6.isLink(child_r9) && ctx_r6.isFunction(child_r9.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r6.isDropdown(child_r9));
  }
}
function NavigationItemComponent_ng_container_2_ng_template_9_a_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().item;
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 3, ctx_r49.isActive$)) == null ? null : tmp_0_0(item_r48)))("routerLink", item_r48.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r48.label);
  }
}
function NavigationItemComponent_ng_container_2_ng_template_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavigationItemComponent_ng_container_2_ng_template_9_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r54);
      const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().item;
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](item_r48.route());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().item;
    const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](4, _c1, (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 2, ctx_r50.isActive$)) == null ? null : tmp_0_0(item_r48)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r48.label, " ");
  }
}
function NavigationItemComponent_ng_container_2_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, NavigationItemComponent_ng_container_2_ng_template_9_a_0_Template, 3, 7, "a", 10)(1, NavigationItemComponent_ng_container_2_ng_template_9_div_1_Template, 3, 6, "div", 23);
  }
  if (rf & 2) {
    const item_r48 = ctx.item;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.isLink(item_r48) && !ctx_r7.isFunction(item_r48.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.isLink(item_r48) && ctx_r7.isFunction(item_r48.route));
  }
}
function NavigationItemComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-menu", 6, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, NavigationItemComponent_ng_container_2_ng_container_8_Template, 4, 3, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, NavigationItemComponent_ng_container_2_ng_template_9_Template, 2, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    let tmp_0_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("hover:bg-hover", !((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 6, ctx_r2.isActive$)) == null ? null : tmp_0_0(ctx_r2.item)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r5)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](12, _c0, (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 8, ctx_r2.isActive$)) == null ? null : tmp_2_0(ctx_r2.item), !((tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 10, ctx_r2.isActive$)) == null ? null : tmp_2_0(ctx_r2.item))));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.item.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.item.children);
  }
}
class NavigationItemComponent {
  constructor(navigationService, router) {
    this.navigationService = navigationService;
    this.router = router;
    this.isActive$ = this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(() => item => this.hasActiveChilds(item)));
    this.isLink = this.navigationService.isLink;
    this.isDropdown = this.navigationService.isDropdown;
    this.isSubheading = this.navigationService.isSubheading;
    this.trackByRoute = _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_0__.trackByRoute;
  }
  ngOnInit() {}
  hasActiveChilds(parent) {
    if (this.isLink(parent)) {
      return this.router.isActive(parent.route, true);
    }
    if (this.isDropdown(parent) || this.isSubheading(parent)) {
      return parent.children.some(child => {
        if (this.isDropdown(child)) {
          return this.hasActiveChilds(child);
        }
        if (this.isLink(child) && !this.isFunction(child.route)) {
          return this.router.isActive(child.route, true);
        }
        return false;
      });
    }
    return false;
  }
  isFunction(prop) {
    return prop instanceof Function;
  }
  static #_ = this.ɵfac = function NavigationItemComponent_Factory(t) {
    return new (t || NavigationItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: NavigationItemComponent,
    selectors: [["vex-navigation-item"]],
    inputs: {
      item: "item"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 3,
    consts: [["class", "navigation-item", "matRipple", "", 3, "hover:bg-hover", "ngClass", "routerLink", 4, "ngIf"], ["class", "navigation-item navigation-color", "matRipple", "", 3, "hover:bg-hover", "click", 4, "ngIf"], [4, "ngIf"], ["matRipple", "", 1, "navigation-item", 3, "ngClass", "routerLink"], ["matRipple", "", 1, "navigation-item", "navigation-color", 3, "click"], ["matRipple", "", 1, "navigation-item", 3, "matMenuTriggerFor", "ngClass"], ["yPosition", "below"], ["menu", "matMenu"], [4, "ngFor", "ngForOf"], ["linkTemplate", ""], ["class", "navigation-menu-item", "mat-menu-item", "", 3, "ngClass", "routerLink", 4, "ngIf"], ["class", "navigation-menu-item", "mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 1, "navigation-menu-item", 3, "ngClass", "routerLink"], ["class", "text-current", 3, "svgIcon", 4, "ngIf"], [1, "text-current", 3, "svgIcon"], ["mat-menu-item", "", 1, "navigation-menu-item", 3, "click"], ["mat-menu-item", "", 1, "navigation-menu-item", 3, "matMenuTriggerFor", "ngClass"], ["level1", "matMenu"], [3, "ngTemplateOutletContext", "ngTemplateOutlet"], ["level2", "matMenu"], ["level3", "matMenu"], ["level4", "matMenu"], ["level5", "matMenu"], ["class", "navigation-menu-item", "mat-menu-item", "", 3, "ngClass", "click", 4, "ngIf"], ["mat-menu-item", "", 1, "navigation-menu-item", 3, "ngClass", "click"]],
    template: function NavigationItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, NavigationItemComponent_a_0_Template, 5, 14, "a", 0)(1, NavigationItemComponent_div_1_Template, 3, 5, "div", 1)(2, NavigationItemComponent_ng_container_2_Template, 11, 15, "ng-container", 2);
      }
      if (rf & 2) {
        let tmp_2_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLink(ctx.item) && !ctx.isFunction(ctx.item.route));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLink(ctx.item) && ctx.isFunction(ctx.item.route));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isSubheading(ctx.item) && ((tmp_2_0 = ctx.item.children == null ? null : ctx.item.children.length) !== null && tmp_2_0 !== undefined ? tmp_2_0 : 0) > 0 || ctx.isDropdown(ctx.item));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuTrigger, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
    styles: [".navigation-item[_ngcontent-%COMP%] {\n  position: relative;\n  margin-inline-end: 0.5rem;\n  display: block;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n  border-radius: var(--vex-border-radius);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  text-decoration-line: none;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.navigation-color[_ngcontent-%COMP%] {\n  color: var(--vex-navigation-color);\n}\n\n.navigation-menu-item[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.navigation-menu-item[_ngcontent-%COMP%]:hover {\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity));\n}\n.navigation-menu-item[_ngcontent-%COMP%]:hover   .mat-icon[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity));\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUFBLGtCQUFBO0VBQUEseUJBQUE7RUFBQSxjQUFBO0VBQUEsZUFBQTtFQUFBLHlCQUFBO1VBQUEsaUJBQUE7RUFBQSx1Q0FBQTtFQUFBLGtCQUFBO0VBQUEsbUJBQUE7RUFBQSxtQkFBQTtFQUFBLHNCQUFBO0VBQUEsbUJBQUE7RUFBQSxvQkFBQTtFQUFBLGdCQUFBO0VBQUEsMEJBQUE7RUFDQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQURBOztBQUlGO0VBQ0Usa0NBQUE7QUFDRjs7QUFHRTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7QUFHRTtFQUFBLG9CQUFBO0VBQUE7QUFBQTtBQUdFO0VBQUEsb0JBQUE7RUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdmlnYXRpb24taXRlbSB7XG4gIEBhcHBseSByb3VuZGVkIGN1cnNvci1wb2ludGVyIHRleHQtc20gZm9udC1tZWRpdW0gcHgtNCBweS0yIHJlbGF0aXZlIHNlbGVjdC1ub25lIG5vLXVuZGVybGluZSBibG9jayBtZS0yO1xuICBAYXBwbHkgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwIGVhc2Utb3V0LXN3aWZ0O1xufVxuXG4ubmF2aWdhdGlvbi1jb2xvciB7XG4gIGNvbG9yOiB2YXIoLS12ZXgtbmF2aWdhdGlvbi1jb2xvcik7XG59XG5cbi5uYXZpZ2F0aW9uLW1lbnUtaXRlbSB7XG4gIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG5cbiAgJjpob3ZlciB7XG4gICAgQGFwcGx5IHRleHQtcHJpbWFyeS02MDA7XG5cbiAgICAubWF0LWljb24ge1xuICAgICAgQGFwcGx5IHRleHQtcHJpbWFyeS02MDA7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 9373:
/*!***********************************************************************!*\
  !*** ./src/app/layouts/components/navigation/navigation.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationComponent: () => (/* binding */ NavigationComponent)
/* harmony export */ });
/* harmony import */ var _navigation_item_navigation_item_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation-item/navigation-item.component */ 9208);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/navigation/navigation.service */ 120);




function NavigationComponent_vex_navigation_item_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "vex-navigation-item", 3);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("item", item_r1);
  }
}
class NavigationComponent {
  constructor(navigationService) {
    this.navigationService = navigationService;
    this.items$ = this.navigationService.items$;
  }
  static #_ = this.ɵfac = function NavigationComponent_Factory(t) {
    return new (t || NavigationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: NavigationComponent,
    selectors: [["vex-navigation"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 3,
    consts: [[1, "border-b"], [1, "navigation", "flex", "items-center", "container"], [3, "item", 4, "ngFor", "ngForOf"], [3, "item"]],
    template: function NavigationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, NavigationComponent_vex_navigation_item_2_Template, 1, 1, "vex-navigation-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 1, ctx.items$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgFor, _navigation_item_navigation_item_component__WEBPACK_IMPORTED_MODULE_0__.NavigationItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
    styles: ["[_nghost-%COMP%] {\n  background: var(--vex-navigation-background);\n  display: block;\n  height: var(--vex-navigation-height);\n  position: relative;\n  z-index: 200;\n}\n\n.navigation[_ngcontent-%COMP%] {\n  height: var(--vex-navigation-height);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRDQUFBO0VBQ0EsY0FBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQ0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtbmF2aWdhdGlvbi1iYWNrZ3JvdW5kKTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogdmFyKC0tdmV4LW5hdmlnYXRpb24taGVpZ2h0KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAyMDA7XG59XG5cbi5uYXZpZ2F0aW9uIHtcbiAgaGVpZ2h0OiB2YXIoLS12ZXgtbmF2aWdhdGlvbi1oZWlnaHQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4132:
/*!***********************************************************************!*\
  !*** ./src/app/layouts/components/quickpanel/quickpanel.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickpanelComponent: () => (/* binding */ QuickpanelComponent)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ 7765);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-bar */ 8173);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 3228);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/divider */ 9400);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);











const _c0 = () => [];
class QuickpanelComponent {
  constructor() {
    this.date = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().toFormat('DD');
    this.dayName = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().toFormat('EEEE');
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function QuickpanelComponent_Factory(t) {
    return new (t || QuickpanelComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: QuickpanelComponent,
    selectors: [["vex-quickpanel"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 67,
    vars: 19,
    consts: [[1, "body-2", "p-6", "bg-primary-600", "text-on-primary-600"], [1, "display-1"], ["matSubheader", ""], ["mat-list-item", "", 3, "routerLink"], ["matListItemTitle", ""], ["matListItemLine", ""], ["matRipple", "", 1, "vex-list-item"], [1, "progress-bar"], ["color", "primary", "mode", "determinate", 3, "value"], ["color", "accent", "mode", "determinate", 3, "value"], ["color", "warn", "mode", "determinate", 3, "value"]],
    template: function QuickpanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Today");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-nav-list")(9, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "UPCOMING EVENTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 3)(12, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Business Meeting");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "In 16 Minutes, Meeting Room");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "a", 3)(17, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Ask for Vacation");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "12:00 PM");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "a", 3)(22, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Dinner with Sophie");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "18:30 PM");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "a", 3)(27, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Deadline for Project X");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "21:00 PM");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](31, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "TODO-LIST");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "a", 3)(35, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Invite Jack to play golf");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Added: 6 hours ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "a", 3)(40, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Get to know Angular more");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Added: 2 days ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "a", 3)(45, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, "Configure that new router");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "Added: 5 days ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "SERVER STATISTICS");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div", 6)(53, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "CPU Load (71% / 100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](56, "mat-progress-bar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 6)(58, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "RAM Usage (6,175 MB / 16,384 MB)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](61, "mat-progress-bar", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 6)(63, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "CPU Temp (43\u00B0 / 80\u00B0)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](66, "mat-progress-bar", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.dayName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.date);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](13, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](15, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](17, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](18, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", 54);
      }
    },
    dependencies: [_angular_material_divider__WEBPACK_IMPORTED_MODULE_2__.MatDividerModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_2__.MatDivider, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatNavList, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItem, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListSubheaderCssMatStyler, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItemLine, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItemTitle, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatRipple, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__.MatProgressBarModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__.MatProgressBar],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-width: 80vw;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.vex-list-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: 72px;\n  position: relative;\n  -webkit-user-select: none;\n          user-select: none;\n  padding: 1rem;\n  padding-top: 0px;\n}\n.vex-list-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-background-hover);\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3F1aWNrcGFuZWwvcXVpY2twYW5lbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFFQSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxTQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFQUNBLGFBQUE7RUFBQSxnQkFBQTtBQUFGO0FBRUU7RUFDRSx1Q0FBQTtBQUFKOztBQUlBO0VBQ0UsZUFBQTtBQURGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgbWF4LXdpZHRoOiA4MHZ3O1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4udmV4LWxpc3QtaXRlbSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDcycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIEBhcHBseSBwLTQgcHQtMDtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtYmFja2dyb3VuZC1ob3Zlcik7XG4gIH1cbn1cblxuLnByb2dyZXNzLWJhciB7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 4914:
/*!***********************************************************************************!*\
  !*** ./src/app/layouts/components/sidenav/search-modal/search-modal.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchModalComponent: () => (/* binding */ SearchModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);








class SearchModalComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function SearchModalComponent_Factory(t) {
    return new (t || SearchModalComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: SearchModalComponent,
    selectors: [["vex-search-modal"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 66,
    vars: 0,
    consts: [[1, "flex", "items-center", "gap-4", "px-6", "py-3", "border-b", "border-divider"], ["svgIcon", "mat:search", 1, "text-secondary", "flex-none"], ["type", "text", "placeholder", "Search...", 1, "text-xl", "font-medium", "bg-transparent", "outline-none", "flex-auto", "placeholder-secondary"], ["type", "button", "mat-icon-button", "", 1, "flex-none", "ltr:-mr-2", "rtl:-ml-2", "text-secondary"], ["svgIcon", "mat:settings"], [1, "p-4"], [1, "text-xs", "font-semibold", "text-secondary", "px-2", "mb-2"], [1, "space-y-1"], ["matRipple", "", 1, "px-2", "py-2", "hover:bg-hover", "rounded", "transition", "duration-200", "ease-out", "flex", "items-center", "gap-4", "cursor-pointer", "select-none"], ["src", "assets/img/avatars/4.jpg", 1, "w-8", "h-8", "rounded-full", "flex-none"], [1, "flex-auto", "text-base", "font-medium"], [1, "flex-none", "text-xs", "text-secondary", "font-medium", "flex", "items-center", "gap-2"], ["svgIcon", "mat:contacts", 1, "icon-xs", "flex-none"], ["svgIcon", "mat:chevron_right", 1, "icon-sm", "flex-none"], ["src", "assets/img/avatars/3.jpg", 1, "w-8", "h-8", "rounded-full", "flex-none"], [1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "bg-foreground/20"], ["svgIcon", "mat:web", 1, "icon-sm", "flex-none"], [1, "text-secondary", "text-xs"], ["svgIcon", "mat:check", "color", "primary", 1, "icon-sm", "flex-none"]],
    template: function SearchModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 1)(3, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Contacts ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7)(10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Alice Miller");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11)(15, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "found in Contacts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Frank White");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 11)(24, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "found in Contacts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 5)(29, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Pages");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 7)(32, "div", 8)(33, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "mat-icon", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 10)(36, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Scrumboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "/apps/scrumboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 8)(42, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "mat-icon", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 10)(45, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Mailbox");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "/apps/mailbox");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 5)(51, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Tasks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 7)(54, "div", 8)(55, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "mat-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, " Configure OrderController as defined in RVT-11 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 8)(61, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "mat-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " Add more data-models to product-controller ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatIconButton, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRipple]
  });
}

/***/ }),

/***/ 6463:
/*!***********************************************************************************!*\
  !*** ./src/app/layouts/components/sidenav/sidenav-item/sidenav-item.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidenavItemComponent: () => (/* binding */ SidenavItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_animations_dropdown_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/animations/dropdown.animation */ 3943);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/navigation/navigation.service */ 120);













function SidenavItemComponent_a_0_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 7);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", ctx_r4.item.icon);
  }
}
const _c0 = (a0, a1) => [a0, a1];
function SidenavItemComponent_a_0_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c0, ctx_r5.item.badge.bgClass, ctx_r5.item.badge.textClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r5.item.badge.value);
  }
}
const _c1 = () => ({
  exact: false
});
function SidenavItemComponent_a_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidenavItemComponent_a_0_mat_icon_1_Template, 1, 1, "mat-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidenavItemComponent_a_0_span_4_Template, 2, 5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("fragment", ctx_r0.item.fragment)("routerLinkActiveOptions", ctx_r0.item.routerLinkActiveOptions || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c1))("routerLink", ctx_r0.item.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.level === 0 && ctx_r0.item.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.item.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.item.badge);
  }
}
function SidenavItemComponent_div_1_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 7);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", ctx_r6.item.icon);
  }
}
function SidenavItemComponent_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c0, ctx_r7.item.badge.bgClass, ctx_r7.item.badge.textClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r7.item.badge.value);
  }
}
function SidenavItemComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SidenavItemComponent_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r8.item.route());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidenavItemComponent_div_1_mat_icon_1_Template, 1, 1, "mat-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidenavItemComponent_div_1_span_4_Template, 2, 5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.level === 0 && ctx_r1.item.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.item.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.item.badge);
  }
}
function SidenavItemComponent_ng_container_2_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-icon", 7);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", ctx_r10.item.icon);
  }
}
function SidenavItemComponent_ng_container_2_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c0, ctx_r11.item.badge.bgClass, ctx_r11.item.badge.textClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r11.item.badge.value);
  }
}
function SidenavItemComponent_ng_container_2_vex_sidenav_item_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "vex-sidenav-item", 14);
  }
  if (rf & 2) {
    const subItem_r13 = ctx.$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("item", subItem_r13)("level", ctx_r12.level + 1);
  }
}
function SidenavItemComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SidenavItemComponent_ng_container_2_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r14.toggleOpen());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SidenavItemComponent_ng_container_2_mat_icon_2_Template, 1, 1, "mat-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidenavItemComponent_ng_container_2_span_5_Template, 2, 5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SidenavItemComponent_ng_container_2_vex_sidenav_item_8_Template, 1, 2, "vex-sidenav-item", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("vex-sidenav-item--active", ctx_r2.isOpen || ctx_r2.isActive)("vex-sidenav-item--open", ctx_r2.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.level === 0 && ctx_r2.item.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.item.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.item.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@dropdown", ctx_r2.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.item.children);
  }
}
function SidenavItemComponent_ng_container_3_vex_sidenav_item_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "vex-sidenav-item", 14);
  }
  if (rf & 2) {
    const subItem_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("item", subItem_r17)("level", 0);
  }
}
function SidenavItemComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidenavItemComponent_ng_container_3_vex_sidenav_item_3_Template, 1, 2, "vex-sidenav-item", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.item.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.item.children);
  }
}
class SidenavItemComponent {
  constructor(router, cd, navigationService) {
    this.router = router;
    this.cd = cd;
    this.navigationService = navigationService;
    this.isOpen = false;
    this.isActive = false;
    this.isLink = this.navigationService.isLink;
    this.isDropdown = this.navigationService.isDropdown;
    this.isSubheading = this.navigationService.isSubheading;
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.DestroyRef);
  }
  get levelClass() {
    return `item-level-${this.level}`;
  }
  ngOnInit() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(() => this.isDropdown(this.item)), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.onRouteChange());
    this.navigationService.openChange$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(() => this.isDropdown(this.item)), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.takeUntilDestroyed)(this.destroyRef)).subscribe(item => this.onOpenChange(item));
  }
  ngOnChanges(changes) {
    if (changes && changes.hasOwnProperty('item') && this.isDropdown(this.item)) {
      this.onRouteChange();
    }
  }
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.navigationService.triggerOpenChange(this.item);
    this.cd.markForCheck();
  }
  onOpenChange(item) {
    if (this.isChildrenOf(this.item, item)) {
      return;
    }
    if (this.hasActiveChilds(this.item)) {
      return;
    }
    if (this.item !== item) {
      this.isOpen = false;
      this.cd.markForCheck();
    }
  }
  onRouteChange() {
    if (this.hasActiveChilds(this.item)) {
      this.isActive = true;
      this.isOpen = true;
      this.navigationService.triggerOpenChange(this.item);
      this.cd.markForCheck();
    } else {
      this.isActive = false;
      this.isOpen = false;
      this.navigationService.triggerOpenChange(this.item);
      this.cd.markForCheck();
    }
  }
  isChildrenOf(parent, item) {
    if (parent.children.indexOf(item) !== -1) {
      return true;
    }
    return parent.children.filter(child => this.isDropdown(child)).some(child => this.isChildrenOf(child, item));
  }
  hasActiveChilds(parent) {
    return parent.children.some(child => {
      if (this.isDropdown(child)) {
        return this.hasActiveChilds(child);
      }
      if (this.isLink(child) && !this.isFunction(child.route)) {
        return this.router.isActive(child.route, false);
      }
    });
  }
  isFunction(prop) {
    return prop instanceof Function;
  }
  static #_ = this.ɵfac = function SidenavItemComponent_Factory(t) {
    return new (t || SidenavItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: SidenavItemComponent,
    selectors: [["vex-sidenav-item"]],
    hostVars: 2,
    hostBindings: function SidenavItemComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.levelClass);
      }
    },
    inputs: {
      item: "item",
      level: "level"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 4,
    consts: [["class", "vex-sidenav-item", "matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", "routerLinkActive", "vex-sidenav-item--active", 3, "fragment", "routerLinkActiveOptions", "routerLink", 4, "ngIf"], ["class", "vex-sidenav-item", "matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", "routerLinkActive", "vex-sidenav-item--active", 3, "click", 4, "ngIf"], [4, "ngIf"], ["matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", "routerLinkActive", "vex-sidenav-item--active", 1, "vex-sidenav-item", 3, "fragment", "routerLinkActiveOptions", "routerLink"], ["class", "vex-sidenav-item__icon", 3, "svgIcon", 4, "ngIf"], [1, "vex-sidenav-item__label"], ["class", "vex-sidenav-item__badge", 3, "ngClass", 4, "ngIf"], [1, "vex-sidenav-item__icon", 3, "svgIcon"], [1, "vex-sidenav-item__badge", 3, "ngClass"], ["matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", "routerLinkActive", "vex-sidenav-item--active", 1, "vex-sidenav-item", 3, "click"], ["matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", 1, "vex-sidenav-item", 3, "click"], ["svgIcon", "mat:keyboard_arrow_right", 1, "vex-sidenav-item__dropdown-icon"], [1, "vex-sidenav-item__dropdown"], [3, "item", "level", 4, "ngFor", "ngForOf"], [3, "item", "level"], [1, "vex-sidenav-subheading"]],
    template: function SidenavItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, SidenavItemComponent_a_0_Template, 5, 7, "a", 0)(1, SidenavItemComponent_div_1_Template, 5, 3, "div", 1)(2, SidenavItemComponent_ng_container_2_Template, 9, 9, "ng-container", 2)(3, SidenavItemComponent_ng_container_3_Template, 4, 2, "ng-container", 2);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLink(ctx.item) && !ctx.isFunction(ctx.item.route));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLink(ctx.item) && ctx.isFunction(ctx.item.route));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDropdown(ctx.item));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isSubheading(ctx.item));
      }
    },
    dependencies: [SidenavItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatRipple, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkActive, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor],
    styles: [".vex-sidenav-item[_ngcontent-%COMP%] {\n  align-items: center;\n  box-sizing: border-box;\n  color: var(--vex-sidenav-item-color);\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  min-height: var(--vex-sidenav-item-min-height);\n  padding: var(--vex-sidenav-item-padding-vertical) var(--vex-sidenav-item-padding-horizontal);\n  position: relative;\n  text-decoration: none;\n  -webkit-user-select: none;\n          user-select: none;\n  font-weight: var(--vex-sidenav-item-font-weight);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-background-active);\n}\n.vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__icon[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-icon-color-active);\n}\n.vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-color-active);\n}\n.vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__dropdown-icon[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-color-active);\n}\n.vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-background-hover);\n}\n.vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__icon[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-icon-color-hover);\n}\n.vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-color-hover);\n}\n.vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__dropdown-icon[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-color-hover);\n}\n.vex-sidenav-item.vex-sidenav-item--open[_ngcontent-%COMP%]   .vex-sidenav-item__dropdown-icon[_ngcontent-%COMP%] {\n  transform: rotate(90deg) !important;\n}\n\n.item-level-1[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 0);\n}\n.item-level-1[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-1[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-1[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-1[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.item-level-2[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 1);\n}\n.item-level-2[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-2[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-2[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-2[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.item-level-3[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 2);\n}\n.item-level-3[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-3[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-3[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-3[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.item-level-4[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 3);\n}\n.item-level-4[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-4[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-4[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-4[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.item-level-5[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 4);\n}\n.item-level-5[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-5[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-5[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-5[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.item-level-6[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background);\n  padding-inline-start: calc(var(--vex-sidenav-item-icon-size) + var(--vex-sidenav-item-icon-gap) + var(--vex-sidenav-item-padding-horizontal) + var(--vex-sidenav-item-dropdown-gap) * 5);\n}\n.item-level-6[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-item-dropdown-background-active);\n}\n.item-level-6[_nghost-%COMP%]   .vex-sidenav-item.vex-sidenav-item--active[_ngcontent-%COMP%]   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-active);\n}\n.item-level-6[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover {\n  background: var(--vex-sidenav-item-dropdown-background-hover);\n}\n.item-level-6[_nghost-%COMP%]   .vex-sidenav-item[_ngcontent-%COMP%]:hover   .vex-sidenav-item__label[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-dropdown-color-hover);\n}\n\n.vex-sidenav-item__icon[_ngcontent-%COMP%], .vex-sidenav-item__label[_ngcontent-%COMP%], .vex-sidenav-item__dropdown-icon[_ngcontent-%COMP%] {\n  transition: inherit;\n}\n\n.vex-sidenav-item__icon[_ngcontent-%COMP%] {\n  flex: none;\n  color: var(--vex-sidenav-item-icon-color);\n  font-size: var(--vex-sidenav-item-icon-size);\n  height: var(--vex-sidenav-item-icon-size);\n  margin-inline-end: var(--vex-sidenav-item-icon-gap);\n  width: var(--vex-sidenav-item-icon-size);\n}\n\n.vex-sidenav-item__label[_ngcontent-%COMP%] {\n  flex: auto;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.vex-sidenav-item__badge[_ngcontent-%COMP%] {\n  flex: none;\n  border-radius: 9999px;\n  font-size: 11px;\n  line-height: 20px;\n  padding: 0 7px;\n  text-align: center;\n  font-weight: 700;\n  margin-inline-start: 0.5rem;\n}\n\n.vex-sidenav-item__dropdown-icon[_ngcontent-%COMP%] {\n  color: var(--vex-sidenav-item-icon-color);\n  font-size: 18px;\n  height: 18px;\n  line-height: 18px;\n  transform: rotate(0deg) !important;\n  width: 18px;\n  margin-inline-start: 0.5rem;\n}\n\n.vex-sidenav-item__dropdown[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.vex-sidenav-subheading[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  color: var(--vex-sidenav-subheading-color);\n  text-transform: uppercase;\n  white-space: nowrap;\n  font-weight: 600;\n  -webkit-user-select: none;\n          user-select: none;\n  margin-top: 1.5rem;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n\n\n[_nghost-%COMP%]:first-child   .vex-sidenav-subheading[_ngcontent-%COMP%] {\n  margin-top: -0.75rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi1pdGVtL3NpZGVuYXYtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4Q0FBQTtFQUNBLDRGQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7RUFDQSxnREFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQSw0REFBQTtBQUNGO0FBQ0U7RUFDRSxxREFBQTtBQUNKO0FBQ0k7RUFDRSxnREFBQTtBQUNOO0FBRUk7RUFDRSwyQ0FBQTtBQUFOO0FBR0k7RUFDRSwyQ0FBQTtBQUROO0FBS0U7RUFDRSxvREFBQTtBQUhKO0FBS0k7RUFDRSwrQ0FBQTtBQUhOO0FBTUk7RUFDRSwwQ0FBQTtBQUpOO0FBT0k7RUFDRSwwQ0FBQTtBQUxOO0FBVUk7RUFDRSxtQ0FBQTtBQVJOOztBQWNFO0VBQ0UsdURBQUE7RUFDQSx3TEFBQTtBQVhKO0FBa0JJO0VBQ0UsOERBQUE7QUFoQk47QUFrQk07RUFDRSxvREFBQTtBQWhCUjtBQW9CSTtFQUNFLDZEQUFBO0FBbEJOO0FBb0JNO0VBQ0UsbURBQUE7QUFsQlI7O0FBSEU7RUFDRSx1REFBQTtFQUNBLHdMQUFBO0FBTUo7QUFDSTtFQUNFLDhEQUFBO0FBQ047QUFDTTtFQUNFLG9EQUFBO0FBQ1I7QUFHSTtFQUNFLDZEQUFBO0FBRE47QUFHTTtFQUNFLG1EQUFBO0FBRFI7O0FBcEJFO0VBQ0UsdURBQUE7RUFDQSx3TEFBQTtBQXVCSjtBQWhCSTtFQUNFLDhEQUFBO0FBa0JOO0FBaEJNO0VBQ0Usb0RBQUE7QUFrQlI7QUFkSTtFQUNFLDZEQUFBO0FBZ0JOO0FBZE07RUFDRSxtREFBQTtBQWdCUjs7QUFyQ0U7RUFDRSx1REFBQTtFQUNBLHdMQUFBO0FBd0NKO0FBakNJO0VBQ0UsOERBQUE7QUFtQ047QUFqQ007RUFDRSxvREFBQTtBQW1DUjtBQS9CSTtFQUNFLDZEQUFBO0FBaUNOO0FBL0JNO0VBQ0UsbURBQUE7QUFpQ1I7O0FBdERFO0VBQ0UsdURBQUE7RUFDQSx3TEFBQTtBQXlESjtBQWxESTtFQUNFLDhEQUFBO0FBb0ROO0FBbERNO0VBQ0Usb0RBQUE7QUFvRFI7QUFoREk7RUFDRSw2REFBQTtBQWtETjtBQWhETTtFQUNFLG1EQUFBO0FBa0RSOztBQXZFRTtFQUNFLHVEQUFBO0VBQ0Esd0xBQUE7QUEwRUo7QUFuRUk7RUFDRSw4REFBQTtBQXFFTjtBQW5FTTtFQUNFLG9EQUFBO0FBcUVSO0FBakVJO0VBQ0UsNkRBQUE7QUFtRU47QUFqRU07RUFDRSxtREFBQTtBQW1FUjs7QUE3REE7OztFQUdFLG1CQUFBO0FBZ0VGOztBQTdEQTtFQUNFLFVBQUE7RUFDQSx5Q0FBQTtFQUNBLDRDQUFBO0VBQ0EseUNBQUE7RUFDQSxtREFBQTtFQUNBLHdDQUFBO0FBZ0VGOztBQTdEQTtFQUNFLFVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFnRUY7O0FBN0RBO0VBQ0UsVUFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtBQWdFRjs7QUE3REE7RUFDRSx5Q0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQ0FBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtBQWdFRjs7QUE3REE7RUFDRSxnQkFBQTtBQWdFRjs7QUE3REE7RUFDRSxzQkFBQTtFQUNBLDBDQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFQUNBLGtCQUFBO0VBQUEsb0JBQUE7RUFBQSx1QkFBQTtFQUFBLG9CQUFBO0VBQUEscUJBQUE7RUFBQSxrQkFBQTtFQUFBLGlCQUFBO0FBZ0VGOztBQTdEQSxnREFBQTtBQUVFO0VBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi52ZXgtc2lkZW5hdi1pdGVtIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY29sb3I6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tY29sb3IpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tbWluLWhlaWdodCk7XG4gIHBhZGRpbmc6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tcGFkZGluZy12ZXJ0aWNhbCkgdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1wYWRkaW5nLWhvcml6b250YWwpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWZvbnQtd2VpZ2h0KTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG5cbiAgJi52ZXgtc2lkZW5hdi1pdGVtLS1hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tYmFja2dyb3VuZC1hY3RpdmUpO1xuXG4gICAgLnZleC1zaWRlbmF2LWl0ZW1fX2ljb24ge1xuICAgICAgY29sb3I6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1jb2xvci1hY3RpdmUpO1xuICAgIH1cblxuICAgIC52ZXgtc2lkZW5hdi1pdGVtX19sYWJlbCB7XG4gICAgICBjb2xvcjogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1jb2xvci1hY3RpdmUpO1xuICAgIH1cblxuICAgIC52ZXgtc2lkZW5hdi1pdGVtX19kcm9wZG93bi1pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWNvbG9yLWFjdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1iYWNrZ3JvdW5kLWhvdmVyKTtcblxuICAgIC52ZXgtc2lkZW5hdi1pdGVtX19pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tY29sb3ItaG92ZXIpO1xuICAgIH1cblxuICAgIC52ZXgtc2lkZW5hdi1pdGVtX19sYWJlbCB7XG4gICAgICBjb2xvcjogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1jb2xvci1ob3Zlcik7XG4gICAgfVxuXG4gICAgLnZleC1zaWRlbmF2LWl0ZW1fX2Ryb3Bkb3duLWljb24ge1xuICAgICAgY29sb3I6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tY29sb3ItaG92ZXIpO1xuICAgIH1cbiAgfVxuXG4gICYudmV4LXNpZGVuYXYtaXRlbS0tb3BlbiB7XG4gICAgLnZleC1zaWRlbmF2LWl0ZW1fX2Ryb3Bkb3duLWljb24ge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG59XG5cbkBmb3IgJGkgZnJvbSAxIHRocm91Z2ggNiB7XG4gIDpob3N0KC5pdGVtLWxldmVsLSN7JGl9KSAudmV4LXNpZGVuYXYtaXRlbSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1kcm9wZG93bi1iYWNrZ3JvdW5kKTtcbiAgICBwYWRkaW5nLWlubGluZS1zdGFydDogY2FsYyhcbiAgICAgIHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1zaXplKSArXG4gICAgICB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tZ2FwKSArXG4gICAgICB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLXBhZGRpbmctaG9yaXpvbnRhbCkgK1xuICAgICAgKHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tZHJvcGRvd24tZ2FwKSAqICN7JGkgLSAxfSlcbiAgICApO1xuXG4gICAgJi52ZXgtc2lkZW5hdi1pdGVtLS1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1kcm9wZG93bi1iYWNrZ3JvdW5kLWFjdGl2ZSk7XG5cbiAgICAgIC52ZXgtc2lkZW5hdi1pdGVtX19sYWJlbCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWRyb3Bkb3duLWNvbG9yLWFjdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWRyb3Bkb3duLWJhY2tncm91bmQtaG92ZXIpO1xuXG4gICAgICAudmV4LXNpZGVuYXYtaXRlbV9fbGFiZWwge1xuICAgICAgICBjb2xvcjogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1kcm9wZG93bi1jb2xvci1ob3Zlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi52ZXgtc2lkZW5hdi1pdGVtX19pY29uLFxuLnZleC1zaWRlbmF2LWl0ZW1fX2xhYmVsLFxuLnZleC1zaWRlbmF2LWl0ZW1fX2Ryb3Bkb3duLWljb24ge1xuICB0cmFuc2l0aW9uOiBpbmhlcml0O1xufVxuXG4udmV4LXNpZGVuYXYtaXRlbV9faWNvbiB7XG4gIGZsZXg6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tY29sb3IpO1xuICBmb250LXNpemU6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tc2l6ZSk7XG4gIG1hcmdpbi1pbmxpbmUtZW5kOiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tZ2FwKTtcbiAgd2lkdGg6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1zaXplKTtcbn1cblxuLnZleC1zaWRlbmF2LWl0ZW1fX2xhYmVsIHtcbiAgZmxleDogYXV0bztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi52ZXgtc2lkZW5hdi1pdGVtX19iYWRnZSB7XG4gIGZsZXg6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA3cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgQGFwcGx5IG1zLTI7XG59XG5cbi52ZXgtc2lkZW5hdi1pdGVtX19kcm9wZG93bi1pY29uIHtcbiAgY29sb3I6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1jb2xvcik7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgIWltcG9ydGFudDtcbiAgd2lkdGg6IDE4cHg7XG4gIEBhcHBseSBtcy0yO1xufVxuXG4udmV4LXNpZGVuYXYtaXRlbV9fZHJvcGRvd24ge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4udmV4LXNpZGVuYXYtc3ViaGVhZGluZyB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1zdWJoZWFkaW5nLWNvbG9yKTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIEBhcHBseSB0ZXh0LXhzIHB5LTMgcHgtNiBtdC02O1xufVxuXG4vKiogSWYgZmlyc3QgaXRlbSBpcyBzdWJoZWFkaW5nLCByZW1vdmUgbWFyZ2luICovXG46aG9zdCg6Zmlyc3QtY2hpbGQpIC52ZXgtc2lkZW5hdi1zdWJoZWFkaW5nIHtcbiAgQGFwcGx5IC1tdC0zO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [_vex_animations_dropdown_animation__WEBPACK_IMPORTED_MODULE_0__.dropdownAnimation]
    },
    changeDetection: 0
  });
}

/***/ }),

/***/ 3569:
/*!*********************************************************************************************!*\
  !*** ./src/app/layouts/components/sidenav/sidenav-user-menu/sidenav-user-menu.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidenavUserMenuComponent: () => (/* binding */ SidenavUserMenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover-ref */ 5925);







const _c0 = () => ["/apps/social"];
const _c1 = () => ["/"];
const _c2 = () => ["/apps/social/timeline"];
const _c3 = () => ["/login"];
class SidenavUserMenuComponent {
  constructor(popoverRef) {
    this.popoverRef = popoverRef;
  }
  ngOnInit() {}
  close() {
    /** Wait for animation to complete and then close */
    setTimeout(() => this.popoverRef.close(), 250);
  }
  static #_ = this.ɵfac = function SidenavUserMenuComponent_Factory(t) {
    return new (t || SidenavUserMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__.VexPopoverRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: SidenavUserMenuComponent,
    selectors: [["vex-sidenav-user-menu"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 25,
    vars: 8,
    consts: [[1, "vex-user-menu"], ["matRipple", "", "matRippleColor", "rgb(var(--vex-color-primary-600), 0.1)", 1, "vex-user-menu-item", 3, "routerLink", "click"], ["svgIcon", "mat:account_circle", 1, "vex-user-menu-item__icon", "icon-sm"], [1, "vex-user-menu-item__label"], ["svgIcon", "mat:insights", 1, "vex-user-menu-item__icon", "icon-sm"], [1, "vex-user-menu-item__badge"], ["svgIcon", "mat:settings", 1, "vex-user-menu-item__icon", "icon-sm"], [1, "border-b", "border-divider", "mx-4"], ["matRipple", "", "matRippleColor", "rgb(var(--vex-color-primary-600), 0.1)", 1, "vex-user-menu-item"], ["svgIcon", "mat:switch_account", 1, "vex-user-menu-item__icon", "icon-sm"], ["svgIcon", "mat:chevron_right", 1, "vex-user-menu-item__icon", "icon-sm"], ["svgIcon", "mat:logout", 1, "vex-user-menu-item__icon", "icon-sm"]],
    template: function SidenavUserMenuComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidenavUserMenuComponent_Template_a_click_1_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Your Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidenavUserMenuComponent_Template_a_click_5_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Analytics");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "NEW");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidenavUserMenuComponent_Template_a_click_11_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "mat-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Account Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "mat-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Switch Account");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidenavUserMenuComponent_Template_a_click_21_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Sign Out");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](6, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](7, _c3));
      }
    },
    dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatRipple, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon],
    styles: [".vex-user-menu[_ngcontent-%COMP%] {\n\n    border-radius: var(--vex-border-radius);\n\n    border-width: 1px;\n\n    border-color: var(--vex-foreground-divider);\n\n    --tw-bg-opacity: 1;\n\n    background-color: rgb(var(--vex-background-card-rgb) / var(--tw-bg-opacity));\n\n    padding-top: 0.5rem;\n\n    padding-bottom: 0.5rem;\n\n    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n\n    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n\n    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}\n\n.vex-user-menu-item[_ngcontent-%COMP%] {\n\n    position: relative;\n\n    margin-left: 0.5rem;\n\n    margin-right: 0.5rem;\n\n    display: flex;\n\n    height: 2.5rem;\n\n    cursor: pointer;\n\n    -webkit-user-select: none;\n\n            user-select: none;\n\n    align-items: center;\n\n    gap: 1rem;\n\n    border-radius: var(--vex-border-radius);\n\n    padding-left: 0.5rem;\n\n    padding-right: 0.5rem;\n\n    padding-top: 0.5rem;\n\n    padding-bottom: 0.5rem;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\n    transition-duration: 100ms;\n\n    transition-timing-function: cubic-bezier(0, 0, 0.2, 1)\n}\n\n.vex-user-menu-item[_ngcontent-%COMP%]:hover {\n\n    background-color: rgb(var(--vex-color-primary-600) / 0.1)\n}\n.vex-user-menu-item[_ngcontent-%COMP%]:hover   .vex-user-menu-item__icon[_ngcontent-%COMP%] {\n\n    --tw-text-opacity: 1;\n\n    color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity))\n}\n\n.vex-user-menu-item__label[_ngcontent-%COMP%] {\n\n    flex: 1 1 auto;\n\n    font-weight: 500;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\n    transition-duration: 100ms;\n\n    transition-timing-function: cubic-bezier(0, 0, 0.2, 1)\n}\n\n.vex-user-menu-item__badge[_ngcontent-%COMP%] {\n\n    flex: none;\n\n    border-radius: var(--vex-border-radius);\n\n    background-color: rgb(var(--vex-color-primary-600) / 0.1);\n\n    padding-left: 0.5rem;\n\n    padding-right: 0.5rem;\n\n    padding-top: 0.25rem;\n\n    padding-bottom: 0.25rem;\n\n    font-size: 0.625rem;\n\n    font-weight: 600;\n\n    --tw-text-opacity: 1;\n\n    color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity))\n}\n\n.vex-user-menu-item__icon[_ngcontent-%COMP%] {\n\n    flex: none;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\n    transition-duration: 100ms;\n\n    transition-timing-function: cubic-bezier(0, 0, 0.2, 1)\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi11c2VyLW1lbnUvc2lkZW5hdi11c2VyLW1lbnUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7O0lBQUEsdUNBQUE7O0lBQUEsaUJBQUE7O0lBQUEsMkNBQUE7O0lBQUEsa0JBQUE7O0lBQUEsNEVBQUE7O0lBQUEsbUJBQUE7O0lBQUEsc0JBQUE7O0lBQUEsK0VBQUE7O0lBQUEsbUdBQUE7O0lBQUE7QUFBQTs7QUFJQTs7SUFBQSxrQkFBQTs7SUFBQSxtQkFBQTs7SUFBQSxvQkFBQTs7SUFBQSxhQUFBOztJQUFBLGNBQUE7O0lBQUEsZUFBQTs7SUFBQSx5QkFBQTs7WUFBQSxpQkFBQTs7SUFBQSxtQkFBQTs7SUFBQSxTQUFBOztJQUFBLHVDQUFBOztJQUFBLG9CQUFBOztJQUFBLHFCQUFBOztJQUFBLG1CQUFBOztJQUFBLHNCQUFBOztJQUFBLGdLQUFBOztJQUFBLHdKQUFBOztJQUFBLGlMQUFBOztJQUFBLHdEQUFBOztJQUFBLDBCQUFBOztJQUFBO0FBQUE7O0FBQUE7O0lBQUE7QUFBQTtBQUlJOztJQUFBLG9CQUFBOztJQUFBO0FBQUE7O0FBTUo7O0lBQUEsY0FBQTs7SUFBQSxnQkFBQTs7SUFBQSxnS0FBQTs7SUFBQSx3SkFBQTs7SUFBQSxpTEFBQTs7SUFBQSx3REFBQTs7SUFBQSwwQkFBQTs7SUFBQTtBQUFBOztBQUlBOztJQUFBLFVBQUE7O0lBQUEsdUNBQUE7O0lBQUEseURBQUE7O0lBQUEsb0JBQUE7O0lBQUEscUJBQUE7O0lBQUEsb0JBQUE7O0lBQUEsdUJBQUE7O0lBQUEsbUJBQUE7O0lBQUEsZ0JBQUE7O0lBQUEsb0JBQUE7O0lBQUE7QUFBQTs7QUFJQTs7SUFBQSxVQUFBOztJQUFBLGdLQUFBOztJQUFBLHdKQUFBOztJQUFBLGlMQUFBOztJQUFBLHdEQUFBOztJQUFBLDBCQUFBOztJQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIudmV4LXVzZXItbWVudSB7XG4gIEBhcHBseSBiZy1mb3JlZ3JvdW5kIHNoYWRvdy1sZyBib3JkZXIgYm9yZGVyLWRpdmlkZXIgcm91bmRlZCBweS0yO1xufVxuXG4udmV4LXVzZXItbWVudS1pdGVtIHtcbiAgQGFwcGx5IHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHB4LTIgbXgtMiBweS0yIHJvdW5kZWQgaG92ZXI6YmctcHJpbWFyeS02MDAvMTAgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbiBkdXJhdGlvbi0xMDAgZWFzZS1vdXQgc2VsZWN0LW5vbmUgaC0xMDtcblxuICAmOmhvdmVyIHtcbiAgICAudmV4LXVzZXItbWVudS1pdGVtX19pY29uIHtcbiAgICAgIEBhcHBseSB0ZXh0LXByaW1hcnktNjAwO1xuICAgIH1cbiAgfVxufVxuXG4udmV4LXVzZXItbWVudS1pdGVtX19sYWJlbCB7XG4gIEBhcHBseSBmbGV4LWF1dG8gZm9udC1tZWRpdW0gdHJhbnNpdGlvbiBkdXJhdGlvbi0xMDAgZWFzZS1vdXQ7XG59XG5cbi52ZXgtdXNlci1tZW51LWl0ZW1fX2JhZGdlIHtcbiAgQGFwcGx5IHB4LTIgcHktMSByb3VuZGVkIGJnLXByaW1hcnktNjAwLzEwIHRleHQtcHJpbWFyeS02MDAgdGV4dC0yeHMgZm9udC1zZW1pYm9sZCBmbGV4LW5vbmU7XG59XG5cbi52ZXgtdXNlci1tZW51LWl0ZW1fX2ljb24ge1xuICBAYXBwbHkgZmxleC1ub25lIHRyYW5zaXRpb24gZHVyYXRpb24tMTAwIGVhc2Utb3V0O1xufVxuXG4udmV4LXVzZXItbWVudS1pdGVtX19kcm9wZG93bi1pY29uIHtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6468:
/*!*****************************************************************!*\
  !*** ./src/app/layouts/components/sidenav/sidenav.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidenavComponent: () => (/* binding */ SidenavComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 1891);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _sidenav_user_menu_sidenav_user_menu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidenav-user-menu/sidenav-user-menu.component */ 3569);
/* harmony import */ var _search_modal_search_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-modal/search-modal.component */ 4914);
/* harmony import */ var _sidenav_item_sidenav_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidenav-item/sidenav-item.component */ 6463);
/* harmony import */ var _vex_components_vex_scrollbar_vex_scrollbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vex/components/vex-scrollbar/vex-scrollbar.component */ 9844);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/navigation/navigation.service */ 120);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);
/* harmony import */ var _vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover.service */ 563);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ 7401);



















function SidenavComponent_button_9_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "mat-icon", 17);
  }
}
function SidenavComponent_button_9_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "mat-icon", 18);
  }
}
function SidenavComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SidenavComponent_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r6.toggleCollapse());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SidenavComponent_button_9_mat_icon_1_Template, 1, 0, "mat-icon", 15)(2, SidenavComponent_button_9_mat_icon_2_Template, 1, 0, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.collapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.collapsed);
  }
}
function SidenavComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 19)(1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SidenavComponent_div_11_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r8.openSearch());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, " Quick Search ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Ctrl K");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
}
function SidenavComponent_vex_sidenav_item_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "vex-sidenav-item", 24);
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("item", item_r10)("level", 0);
  }
}
function SidenavComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 25)(1, "div", 26, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SidenavComponent_div_21_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r13);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](2);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r12.openProfileMenu(_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 29)(6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "David Smith");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Product Manager");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("vex-sidenav-user--open", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, ctx_r3.userMenuOpen$));
  }
}
class SidenavComponent {
  constructor(navigationService, layoutService, configService, popoverService, dialog) {
    this.navigationService = navigationService;
    this.layoutService = layoutService;
    this.configService = configService;
    this.popoverService = popoverService;
    this.dialog = dialog;
    this.collapsed = false;
    this.collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
    this.title$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(config => config.sidenav.title));
    this.imageUrl$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(config => config.sidenav.imageUrl));
    this.showCollapsePin$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(config => config.sidenav.showCollapsePin));
    this.userVisible$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(config => config.sidenav.user.visible));
    this.searchVisible$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(config => config.sidenav.search.visible));
    this.userMenuOpen$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(false);
    this.items$ = this.navigationService.items$;
  }
  ngOnInit() {}
  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }
  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav();
  }
  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }
  trackByRoute(index, item) {
    if (item.type === 'link') {
      return item.route;
    }
    return item.label;
  }
  openProfileMenu(origin) {
    this.userMenuOpen$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(this.popoverService.open({
      content: _sidenav_user_menu_sidenav_user_menu_component__WEBPACK_IMPORTED_MODULE_0__.SidenavUserMenuComponent,
      origin,
      offsetY: -8,
      width: origin.clientWidth,
      position: [{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(popoverRef => popoverRef.afterClosed$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.startWith)(true));
  }
  openSearch() {
    this.dialog.open(_search_modal_search_modal_component__WEBPACK_IMPORTED_MODULE_1__.SearchModalComponent, {
      panelClass: 'vex-dialog-glossy',
      width: '100%',
      maxWidth: '600px'
    });
  }
  static #_ = this.ɵfac = function SidenavComponent_Factory(t) {
    return new (t || SidenavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_4__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_5__.VexLayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_6__.VexConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_7__.VexPopoverService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialog));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: SidenavComponent,
    selectors: [["vex-sidenav"]],
    inputs: {
      collapsed: "collapsed"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵStandaloneFeature"]],
    decls: 23,
    vars: 28,
    consts: [[1, "vex-sidenav", "flex", "flex-col", 3, "mouseenter", "mouseleave"], [1, "vex-sidenav-toolbar__container"], [1, "sidenav-toolbar", "flex-none", "flex", "items-center"], ["alt", "Logo", 1, "w-6", "select-none", "flex-none", 3, "src"], [1, "vex-sidenav-toolbar__headline", "flex-auto"], ["class", "vex-sidenav-toolbar__collapse-toggle -mr-4 leading-none flex-none hidden lg:block", "mat-icon-button", "", "type", "button", 3, "click", 4, "ngIf"], ["class", "vex-sidenav-search__container", 4, "ngIf"], [1, "vex-sidenav-toolbar__divider"], [1, "flex-1", "flex", "flex-col"], [1, "pt-6", "flex-1"], [3, "item", "level", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "vex-sidenav-footer", "flex", "items-center", "justify-center", "opacity-20", "px-6", "py-6", "select-none", "flex-none"], ["alt", "Logo", 1, "w-8", "select-none", 3, "src"], ["class", "vex-sidenav-user__container flex-none", 4, "ngIf"], ["mat-icon-button", "", "type", "button", 1, "vex-sidenav-toolbar__collapse-toggle", "-mr-4", "leading-none", "flex-none", "hidden", "lg:block", 3, "click"], ["class", "icon-xs", "svgIcon", "mat:radio_button_checked", 4, "ngIf"], ["class", "icon-xs", "svgIcon", "mat:radio_button_unchecked", 4, "ngIf"], ["svgIcon", "mat:radio_button_checked", 1, "icon-xs"], ["svgIcon", "mat:radio_button_unchecked", 1, "icon-xs"], [1, "vex-sidenav-search__container"], ["matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", 1, "vex-sidenav-search", "relative", 3, "click"], ["svgIcon", "mat:search", 1, "flex-none", "vex-sidenav-search__icon"], [1, "flex-auto", "vex-sidenav-search__placeholder"], [1, "flex-none", "vex-sidenav-search__keybind"], [3, "item", "level"], [1, "vex-sidenav-user__container", "flex-none"], ["matRipple", "", "matRippleColor", "var(--vex-sidenav-item-ripple-color)", 1, "vex-sidenav-user", "flex", "items-center", 3, "click"], ["userProfileMenuOriginRef", ""], ["alt", "User Avatar", "src", "../../../../assets/img/avatars/1.jpg", 1, "vex-sidenav-user__image", "flex-none"], [1, "vex-sidenav-user__content", "flex-auto"], [1, "vex-sidenav-user__title"], [1, "vex-sidenav-user__subtitle"], ["svgIcon", "mat:arrow_drop_down", 1, "vex-sidenav-user__dropdown-icon", "flex-none"]],
    template: function SidenavComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("mouseenter", function SidenavComponent_Template_div_mouseenter_0_listener() {
          return ctx.collapseOpenSidenav();
        })("mouseleave", function SidenavComponent_Template_div_mouseleave_0_listener() {
          return ctx.collapseCloseSidenav();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 1)(3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "h2", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, SidenavComponent_button_9_Template, 3, 2, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, SidenavComponent_div_11_Template, 7, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "vex-scrollbar", 8)(15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, SidenavComponent_vex_sidenav_item_16_Template, 1, 2, "vex-sidenav-item", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](19, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](20, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, SidenavComponent_div_21_Template, 11, 4, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("collapsed", ctx.collapsed)("open", ctx.collapsed && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 12, ctx.collapsedOpen$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 14, ctx.imageUrl$), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 16, ctx.title$), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](10, 18, ctx.showCollapsePin$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 20, ctx.searchVisible$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](17, 22, ctx.items$))("ngForTrackBy", ctx.trackByRoute);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](20, 24, ctx.imageUrl$), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 26, ctx.userVisible$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatRipple, _vex_components_vex_scrollbar_vex_scrollbar_component__WEBPACK_IMPORTED_MODULE_3__.VexScrollbarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgFor, _sidenav_item_sidenav_item_component__WEBPACK_IMPORTED_MODULE_2__.SidenavItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
    styles: [".vex-sidenav[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-background);\n  color: var(--vex-sidenav-color);\n  height: 100%;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  width: var(--vex-sidenav-width);\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%] {\n  width: var(--vex-sidenav-collapsed-width);\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)   .vex-sidenav-toolbar__headline[_ngcontent-%COMP%], .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)   .vex-sidenav-toolbar__collapse-toggle[_ngcontent-%COMP%] {\n  opacity: 0;\n  padding-inline-start: var(--vex-sidenav-item-padding-horizontal);\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-item__icon {\n  margin-inline-end: var(--vex-sidenav-item-padding-horizontal);\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-subheading, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-item__badge, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-item__label, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-user__title, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-user__subtitle, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-user__dropdown-icon, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-search__placeholder, .vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-search__keybind {\n  opacity: 0;\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .vex-sidenav-user {\n  padding-right: 0.625rem;\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]:not(.open)     .simplebar-track.simplebar-vertical {\n  visibility: hidden !important;\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]     .vex-sidenav-subheading, .vex-sidenav.collapsed[_ngcontent-%COMP%]     .vex-sidenav-item__label {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-sidenav.collapsed[_ngcontent-%COMP%]     .vex-sidenav-item__badge {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-sidenav.collapsed.open[_ngcontent-%COMP%] {\n  width: var(--vex-sidenav-width);\n}\n.vex-sidenav.collapsed.open[_ngcontent-%COMP%]   .vex-sidenav-toolbar__collapse-toggle[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-sidenav.collapsed.open[_ngcontent-%COMP%]     .vex-sidenav-item__badge {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.vex-sidenav[_ngcontent-%COMP%]     .simplebar-track.simplebar-horizontal {\n  visibility: hidden !important;\n}\n\n\n\n.vex-sidenav-toolbar__container[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-background);\n  position: sticky;\n  top: 0px;\n  z-index: 10;\n}\n\n.sidenav-toolbar[_ngcontent-%COMP%] {\n  align-items: center;\n  background: var(--vex-sidenav-toolbar-background);\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  height: var(--vex-toolbar-height);\n  white-space: nowrap;\n  width: 100%;\n  padding-top: 0px;\n  padding-bottom: 0px;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.vex-sidenav-toolbar__headline[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 700;\n  letter-spacing: 0.025em;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  padding-inline-start: var(--vex-sidenav-item-icon-gap);\n}\n\n.vex-sidenav-toolbar__collapse-toggle[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.vex-sidenav-toolbar__divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--vex-sidenav-section-divider-color);\n}\n\n\n\n.vex-sidenav-user__container[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-toolbar-background);\n  border-color: var(--vex-sidenav-section-divider-color);\n  position: sticky;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border-top-width: 1px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n.vex-sidenav-user[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n  border-radius: var(--vex-border-radius);\n  padding: 0.375rem;\n  padding-top: 0.5rem;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.vex-sidenav-user[_ngcontent-%COMP%]:hover {\n  background-color: rgb(255 255 255 / 0.1);\n}\n\n.vex-sidenav-user__image[_ngcontent-%COMP%] {\n  display: block;\n  height: 2.25rem;\n  width: 2.25rem;\n  border-radius: 9999px;\n}\n\n.vex-sidenav-user__content[_ngcontent-%COMP%] {\n  padding-left: 0.75rem;\n}\n\n.vex-sidenav-user__title[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.vex-sidenav-user__subtitle[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  color: rgb(255 255 255 / 0.5);\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.vex-sidenav-user__dropdown-icon[_ngcontent-%COMP%] {\n  color: rgb(255 255 255 / 0.5);\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.vex-sidenav-user--open[_ngcontent-%COMP%] {\n  background-color: rgb(255 255 255 / 0.1);\n}\n\n\n\n.vex-sidenav-search__container[_ngcontent-%COMP%] {\n  background: var(--vex-sidenav-toolbar-background);\n  z-index: 10;\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n.vex-sidenav-search[_ngcontent-%COMP%] {\n  display: flex;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n  align-items: center;\n  border-radius: var(--vex-border-radius);\n  background-color: rgb(255 255 255 / 0.1);\n  padding: 0.25rem;\n  padding-left: 0.75rem;\n  color: rgb(255 255 255 / 0.3);\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.vex-sidenav-search[_ngcontent-%COMP%]:hover {\n  background-color: rgb(255 255 255 / 0.2);\n  color: rgb(255 255 255 / 0.6);\n}\n\n.vex-sidenav-search__icon[_ngcontent-%COMP%], .vex-sidenav-search__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  height: 1.25rem;\n  width: 1.25rem;\n  line-height: 1.25rem;\n}\n\n.vex-sidenav-search__icon[_ngcontent-%COMP%] {\n  width: var(--vex-sidenav-item-icon-size);\n}\n\n.vex-sidenav-search__placeholder[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  margin-left: var(--vex-sidenav-item-icon-gap);\n}\n\n.vex-sidenav-search__keybind[_ngcontent-%COMP%] {\n  border-radius: var(--vex-border-radius);\n  background-color: rgb(255 255 255 / 0.1);\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 600;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlDQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFBQSx3REFBQTtFQUFBLDBCQUFBO0VBQUEsNERBQUE7RUFDQSwrQkFBQTtBQUNGO0FBQ0U7RUFDRSx5Q0FBQTtBQUNKO0FBRU07O0VBRUUsVUFBQTtFQUNBLGdFQUFBO0FBQVI7QUFJUTtFQUNFLDZEQUFBO0FBRlY7QUFLUTs7Ozs7Ozs7RUFRRSxVQUFBO0FBSFY7QUFPVTtFQUFBO0FBQUE7QUFHRjtFQUNFLDZCQUFBO0FBTFY7QUFhUTs7RUFBQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQUFBO0FBSUE7RUFBQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQUFBO0FBSUo7RUFDRSwrQkFBQTtBQVpOO0FBZVE7RUFBQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQUFBO0FBS0U7RUFBQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQUFBO0FBT047RUFDRSw2QkFBQTtBQW5CTjs7QUF3QkEscUJBQUE7QUFDQTtFQUNFLHlDQUFBO0VBRUEsZ0JBQUE7RUFBQSxRQUFBO0VBQUEsV0FBQTtBQXRCRjs7QUF5QkE7RUFDRSxtQkFBQTtFQUNBLGlEQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQUEsbUJBQUE7RUFBQSxvQkFBQTtFQUFBLHFCQUFBO0FBdEJGOztBQTBCRTtFQUFBLHlCQUFBO1VBQUEsaUJBQUE7RUFBQSxpQkFBQTtFQUFBLGlCQUFBO0VBQUEsZ0JBQUE7RUFBQSx1QkFBQTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBLDREQUFBO0VBQ0E7QUFEQTs7QUFLQTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7O0FBR0Y7RUFDRSxXQUFBO0VBQ0Esb0RBQUE7QUF0QkY7O0FBeUJBLHNCQUFBO0FBQ0E7RUFDRSxpREFBQTtFQUNBLHNEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFFQSxxQkFBQTtFQUFBLG9CQUFBO0VBQUEscUJBQUE7RUFBQSxvQkFBQTtFQUFBLHVCQUFBO0FBdkJGOztBQTJCRTtFQUFBLGtCQUFBO0VBQUEsZUFBQTtFQUFBLHlCQUFBO1VBQUEsaUJBQUE7RUFBQSx1Q0FBQTtFQUFBLGlCQUFBO0VBQUEsbUJBQUE7RUFBQSx3QkFBQTtFQUFBLHdEQUFBO0VBQUEsMEJBQUE7RUFBQTtBQUFBOztBQUFBO0VBQUE7QUFBQTs7QUFJQTtFQUFBLGNBQUE7RUFBQSxlQUFBO0VBQUEsY0FBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQTtBQUFBOztBQUlBO0VBQUEsbUJBQUE7RUFBQSxtQkFBQTtFQUFBLG9CQUFBO0VBQUEsZ0JBQUE7RUFBQSxnS0FBQTtFQUFBLHdKQUFBO0VBQUEsaUxBQUE7RUFBQSx3REFBQTtFQUFBLDBCQUFBO0VBQUE7QUFBQTs7QUFJQTtFQUFBLG1CQUFBO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLGdCQUFBO0VBQUEsNkJBQUE7RUFBQSxnS0FBQTtFQUFBLHdKQUFBO0VBQUEsaUxBQUE7RUFBQSx3REFBQTtFQUFBLDBCQUFBO0VBQUE7QUFBQTs7QUFJQTtFQUFBLDZCQUFBO0VBQUEsZ0tBQUE7RUFBQSx3SkFBQTtFQUFBLGlMQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQTtBQUFBOztBQUdGLHdCQUFBO0FBQ0E7RUFDRSxpREFBQTtFQUNBLFdBQUE7RUFBQSxxQkFBQTtFQUFBLHNCQUFBO0VBQUEsdUJBQUE7QUF2QkY7O0FBMkJFO0VBQUEsYUFBQTtFQUFBLGVBQUE7RUFBQSx5QkFBQTtVQUFBLGlCQUFBO0VBQUEsbUJBQUE7RUFBQSx1Q0FBQTtFQUFBLHdDQUFBO0VBQUEsZ0JBQUE7RUFBQSxxQkFBQTtFQUFBLDZCQUFBO0VBQUEsZ0tBQUE7RUFBQSx3SkFBQTtFQUFBLGlMQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7O0FBQUE7RUFBQSx3Q0FBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQSxrQkFBQTtFQUFBLGVBQUE7RUFBQSxjQUFBO0VBQUE7QUFBQTs7QUFERjtFQUVFLHdDQUFBO0FBdkJGOztBQTJCRTtFQUFBLG1CQUFBO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLGdCQUFBO0VBQUEsZ0tBQUE7RUFBQSx3SkFBQTtFQUFBLGlMQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBLHNEQUFBO0VBQ0E7QUFEQTs7QUFLQTtFQUFBLHVDQUFBO0VBQUEsd0NBQUE7RUFBQSxvQkFBQTtFQUFBLHFCQUFBO0VBQUEsb0JBQUE7RUFBQSx1QkFBQTtFQUFBLG1CQUFBO0VBQUEsZ0JBQUE7RUFBQSxnS0FBQTtFQUFBLHdKQUFBO0VBQUEsaUxBQUE7RUFBQSx3REFBQTtFQUFBLDBCQUFBO0VBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi52ZXgtc2lkZW5hdiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXZleC1zaWRlbmF2LWJhY2tncm91bmQpO1xuICBjb2xvcjogdmFyKC0tdmV4LXNpZGVuYXYtY29sb3IpO1xuICBoZWlnaHQ6IDEwMCU7XG4gIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG4gIHdpZHRoOiB2YXIoLS12ZXgtc2lkZW5hdi13aWR0aCk7XG5cbiAgJi5jb2xsYXBzZWQge1xuICAgIHdpZHRoOiB2YXIoLS12ZXgtc2lkZW5hdi1jb2xsYXBzZWQtd2lkdGgpO1xuXG4gICAgJjpub3QoLm9wZW4pIHtcbiAgICAgIC52ZXgtc2lkZW5hdi10b29sYmFyX19oZWFkbGluZSxcbiAgICAgIC52ZXgtc2lkZW5hdi10b29sYmFyX19jb2xsYXBzZS10b2dnbGUge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwYWRkaW5nLWlubGluZS1zdGFydDogdmFyKC0tdmV4LXNpZGVuYXYtaXRlbS1wYWRkaW5nLWhvcml6b250YWwpO1xuICAgICAgfVxuXG4gICAgICA6Om5nLWRlZXAge1xuICAgICAgICAudmV4LXNpZGVuYXYtaXRlbV9faWNvbiB7XG4gICAgICAgICAgbWFyZ2luLWlubGluZS1lbmQ6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0tcGFkZGluZy1ob3Jpem9udGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC52ZXgtc2lkZW5hdi1zdWJoZWFkaW5nLFxuICAgICAgICAudmV4LXNpZGVuYXYtaXRlbV9fYmFkZ2UsXG4gICAgICAgIC52ZXgtc2lkZW5hdi1pdGVtX19sYWJlbCxcbiAgICAgICAgLnZleC1zaWRlbmF2LXVzZXJfX3RpdGxlLFxuICAgICAgICAudmV4LXNpZGVuYXYtdXNlcl9fc3VidGl0bGUsXG4gICAgICAgIC52ZXgtc2lkZW5hdi11c2VyX19kcm9wZG93bi1pY29uLFxuICAgICAgICAudmV4LXNpZGVuYXYtc2VhcmNoX19wbGFjZWhvbGRlcixcbiAgICAgICAgLnZleC1zaWRlbmF2LXNlYXJjaF9fa2V5YmluZCB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC52ZXgtc2lkZW5hdi11c2VyIHtcbiAgICAgICAgICBAYXBwbHkgcHItMi41O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgOjpuZy1kZWVwIHtcbiAgICAgIC52ZXgtc2lkZW5hdi1zdWJoZWFkaW5nLFxuICAgICAgLnZleC1zaWRlbmF2LWl0ZW1fX2xhYmVsIHtcbiAgICAgICAgQGFwcGx5IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTQwMCBlYXNlLW91dC1zd2lmdDtcbiAgICAgIH1cblxuICAgICAgLnZleC1zaWRlbmF2LWl0ZW1fX2JhZGdlIHtcbiAgICAgICAgQGFwcGx5IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBlYXNlLW91dC1zd2lmdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm9wZW4ge1xuICAgICAgd2lkdGg6IHZhcigtLXZleC1zaWRlbmF2LXdpZHRoKTtcblxuICAgICAgLnZleC1zaWRlbmF2LXRvb2xiYXJfX2NvbGxhcHNlLXRvZ2dsZSB7XG4gICAgICAgIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCB7XG4gICAgICAgIC52ZXgtc2lkZW5hdi1pdGVtX19iYWRnZSB7XG4gICAgICAgICAgQGFwcGx5IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTQwMCBlYXNlLW91dC1zd2lmdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIDo6bmctZGVlcCB7XG4gICAgLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCB7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgICB9XG4gIH1cbn1cblxuLyoqIFNJREVOQVYgVE9PTEJBUiAqL1xuLnZleC1zaWRlbmF2LXRvb2xiYXJfX2NvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXZleC1zaWRlbmF2LWJhY2tncm91bmQpO1xuXG4gIEBhcHBseSBzdGlja3kgdG9wLTAgei0xMDtcbn1cblxuLnNpZGVuYXYtdG9vbGJhciB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHZhcigtLXZleC1zaWRlbmF2LXRvb2xiYXItYmFja2dyb3VuZCk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGhlaWdodDogdmFyKC0tdmV4LXRvb2xiYXItaGVpZ2h0KTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIEBhcHBseSBweS0wIHB4LTY7XG59XG5cbi52ZXgtc2lkZW5hdi10b29sYmFyX19oZWFkbGluZSB7XG4gIEBhcHBseSB0ZXh0LTJ4bCBmb250LWJvbGQgdHJhY2tpbmctd2lkZSBzZWxlY3Qtbm9uZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgZWFzZS1vdXQtc3dpZnQ7XG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS12ZXgtc2lkZW5hdi1pdGVtLWljb24tZ2FwKTtcbn1cblxuLnZleC1zaWRlbmF2LXRvb2xiYXJfX2NvbGxhcHNlLXRvZ2dsZSB7XG4gIEBhcHBseSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgZWFzZS1vdXQtc3dpZnQ7XG59XG5cbi52ZXgtc2lkZW5hdi10b29sYmFyX19kaXZpZGVyIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXZleC1zaWRlbmF2LXNlY3Rpb24tZGl2aWRlci1jb2xvcik7XG59XG5cbi8qKiBWRVggU0lERU5BViBVU0VSICovXG4udmV4LXNpZGVuYXYtdXNlcl9fY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdmV4LXNpZGVuYXYtdG9vbGJhci1iYWNrZ3JvdW5kKTtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS12ZXgtc2lkZW5hdi1zZWN0aW9uLWRpdmlkZXItY29sb3IpO1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuXG4gIEBhcHBseSBib3JkZXItdCBweC0yIHB5LTM7XG59XG5cbi52ZXgtc2lkZW5hdi11c2VyIHtcbiAgQGFwcGx5IHJlbGF0aXZlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBlYXNlLW91dCByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHNlbGVjdC1ub25lIGN1cnNvci1wb2ludGVyIHAtMS41IHB0LTI7XG59XG5cbi52ZXgtc2lkZW5hdi11c2VyX19pbWFnZSB7XG4gIEBhcHBseSB3LTkgaC05IGJsb2NrIHJvdW5kZWQtZnVsbDtcbn1cblxuLnZleC1zaWRlbmF2LXVzZXJfX2NvbnRlbnQge1xuICBAYXBwbHkgcGwtMztcbn1cblxuLnZleC1zaWRlbmF2LXVzZXJfX3RpdGxlIHtcbiAgQGFwcGx5IHRleHQtc20gZm9udC1tZWRpdW0gd2hpdGVzcGFjZS1ub3dyYXAgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDAgZWFzZS1vdXQ7XG59XG5cbi52ZXgtc2lkZW5hdi11c2VyX19zdWJ0aXRsZSB7XG4gIEBhcHBseSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtd2hpdGUvNTAgd2hpdGVzcGFjZS1ub3dyYXAgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDAgZWFzZS1vdXQ7XG59XG5cbi52ZXgtc2lkZW5hdi11c2VyX19kcm9wZG93bi1pY29uIHtcbiAgQGFwcGx5IHRleHQtd2hpdGUvNTAgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDAgZWFzZS1vdXQ7XG59XG5cbi52ZXgtc2lkZW5hdi11c2VyLS1vcGVuIHtcbiAgQGFwcGx5IGJnLXdoaXRlLzEwO1xufVxuXG4vKiogVkVYIFNJREVOQVYgU0VBUkNIICovXG4udmV4LXNpZGVuYXYtc2VhcmNoX19jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtc2lkZW5hdi10b29sYmFyLWJhY2tncm91bmQpO1xuICBAYXBwbHkgcHgtMyBwYi0zIHotMTA7XG59XG5cbi52ZXgtc2lkZW5hdi1zZWFyY2gge1xuICBAYXBwbHkgcm91bmRlZCBiZy13aGl0ZS8xMCB0ZXh0LXdoaXRlLzMwIGhvdmVyOmJnLXdoaXRlLzIwIGhvdmVyOnRleHQtd2hpdGUvNjAgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDAgZWFzZS1vdXQgZmxleCBpdGVtcy1jZW50ZXIgc2VsZWN0LW5vbmUgcC0xIHBsLTM7XG59XG5cbi52ZXgtc2lkZW5hdi1zZWFyY2hfX2ljb24ge1xuICBAYXBwbHkgaWNvbi1zbTtcbiAgd2lkdGg6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1zaXplKTtcbn1cblxuLnZleC1zaWRlbmF2LXNlYXJjaF9fcGxhY2Vob2xkZXIge1xuICBAYXBwbHkgdGV4dC14cyBmb250LW1lZGl1bSB3aGl0ZXNwYWNlLW5vd3JhcCB0cmFuc2l0aW9uIGR1cmF0aW9uLTMwMCBlYXNlLW91dDtcbiAgbWFyZ2luLWxlZnQ6IHZhcigtLXZleC1zaWRlbmF2LWl0ZW0taWNvbi1nYXApO1xufVxuXG4udmV4LXNpZGVuYXYtc2VhcmNoX19rZXliaW5kIHtcbiAgQGFwcGx5IGJnLXdoaXRlLzEwIHJvdW5kZWQgdGV4dC0yeHMgcHgtMiBweS0xIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbiBkdXJhdGlvbi0zMDAgZWFzZS1vdXQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 2276:
/*!*****************************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/mega-menu/mega-menu.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MegaMenuComponent: () => (/* binding */ MegaMenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover-ref */ 5925);








function MegaMenuComponent_a_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MegaMenuComponent_a_14_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const feature_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", feature_r2.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", feature_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](feature_r2.label);
  }
}
function MegaMenuComponent_a_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MegaMenuComponent_a_19_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r6.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const page_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", page_r5.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](page_r5.label);
  }
}
class MegaMenuComponent {
  constructor(popoverRef) {
    this.popoverRef = popoverRef;
    this.features = [{
      icon: 'mat:layers',
      label: 'Dashboard',
      route: '/'
    }, {
      icon: 'mat:assignment',
      label: 'AIO-Table',
      route: '/apps/aio-table'
    }, {
      icon: 'mat:contact_support',
      label: 'Help Center',
      route: '/apps/help-center'
    }, {
      icon: 'mat:contacts',
      label: 'Contacts',
      route: '/apps/contacts/grid'
    }, {
      icon: 'mat:assessment',
      label: 'Scrumboard',
      route: '/apps/scrumboard/1'
    }, {
      icon: 'mat:book',
      label: 'Documentation',
      route: '/documentation'
    }];
    this.pages = [{
      label: 'All-In-One Table',
      route: '/apps/aio-table'
    }, {
      label: 'Authentication',
      route: '/login'
    }, {
      label: 'Components',
      route: '/ui/components/overview'
    }, {
      label: 'Documentation',
      route: '/documentation'
    }, {
      label: 'FAQ',
      route: '/pages/faq'
    }, {
      label: 'Form Elements',
      route: '/ui/forms/form-elements'
    }, {
      label: 'Form Wizard',
      route: '/ui/forms/form-wizard'
    }, {
      label: 'Guides',
      route: '/pages/guides'
    }, {
      label: 'Help Center',
      route: '/apps/help-center'
    }, {
      label: 'Scrumboard',
      route: '/apps/scrumboard'
    }];
  }
  ngOnInit() {}
  close() {
    this.popoverRef.close();
  }
  static #_ = this.ɵfac = function MegaMenuComponent_Factory(t) {
    return new (t || MegaMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_0__.VexPopoverRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MegaMenuComponent,
    selectors: [["vex-mega-menu"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 20,
    vars: 2,
    consts: [[1, "card", "overflow-auto", "flex", "flex-col", "md:flex-row", "sm:mr-6"], [1, "bg-primary-600/10", "p-6", "flex-auto", "max-w-[300px]"], [1, "headline", "mb-4", "text-primary-600"], [1, "caption"], ["color", "primary", "mat-flat-button", "", "type", "button", 1, "mt-4", "w-full"], [1, "p-6", "flex-auto", "max-w-[400px]"], [1, "body-2", "m-0"], [1, "mt-4", "grid", "grid-cols-3"], ["class", "text-dark p-3 text-center hover:bg-primary-600/10 hover:text-primary-600 transition duration-400 ease-out-swift rounded block no-underline", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], [1, "p-6", "flex-auto", "max-w-[350px]"], [1, "mt-6", "grid", "grid-cols-2", "gap-x-12", "gap-y-4"], ["class", "text-dark body-1 no-underline hover:text-primary-600 transition duration-400 ease-out-swift", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], [1, "text-dark", "p-3", "text-center", "hover:bg-primary-600/10", "hover:text-primary-600", "transition", "duration-400", "ease-out-swift", "rounded", "block", "no-underline", 3, "routerLink", "click"], ["color", "primary", 1, "icon-xl", 3, "svgIcon"], [1, "body-2", "mt-2"], [1, "text-dark", "body-1", "no-underline", "hover:text-primary-600", "transition", "duration-400", "ease-out-swift", 3, "routerLink", "click"]],
    template: function MegaMenuComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Mega Menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Learn More ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5)(11, "h3", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Features");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, MegaMenuComponent_a_14_Template, 4, 3, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 9)(16, "h3", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Pages");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, MegaMenuComponent_a_19_Template, 2, 2, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.features);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.pages);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgFor, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon],
    encapsulation: 2
  });
}

/***/ }),

/***/ 6182:
/*!***********************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/search/search.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchComponent: () => (/* binding */ SearchComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _search_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.service */ 3925);













const _c0 = ["searchInput"];
function SearchComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SearchComponent_div_8_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class SearchComponent {
  constructor(layoutService, searchService) {
    this.layoutService = layoutService;
    this.searchService = searchService;
    this.show$ = this.layoutService.searchOpen$;
    this.searchCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormControl();
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.DestroyRef);
  }
  ngOnInit() {
    this.searchService.isOpenSubject.next(true);
    this.searchCtrl.valueChanges.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.takeUntilDestroyed)(this.destroyRef)).subscribe(value => this.searchService.valueChangesSubject.next(value));
    this.show$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(show => show), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.input?.nativeElement.focus());
  }
  close() {
    this.layoutService.closeSearch();
    this.searchCtrl.setValue(undefined);
    this.searchService.isOpenSubject.next(false);
  }
  search() {
    this.searchService.submitSubject.next(this.searchCtrl.value);
    this.close();
  }
  ngOnDestroy() {
    this.layoutService.closeSearch();
    this.searchCtrl.setValue(undefined);
    this.searchService.isOpenSubject.next(false);
  }
  static #_ = this.ɵfac = function SearchComponent_Factory(t) {
    return new (t || SearchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_0__.VexLayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_search_service__WEBPACK_IMPORTED_MODULE_1__.SearchService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: SearchComponent,
    selectors: [["vex-search"]],
    viewQuery: function SearchComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 10,
    vars: 8,
    consts: [[1, "search", 3, "keyup.escape"], ["color", "primary", "mat-icon-button", "", "type", "button", 1, "ltr:right-12", "rtl:left-12", "top-12", "absolute", 3, "click"], ["svgIcon", "mat:close"], ["placeholder", "Search...", 1, "search-input", 3, "formControl", "keyup.enter"], ["searchInput", ""], [1, "search-hint"], ["class", "search-overlay", 3, "click", 4, "ngIf"], [1, "search-overlay", 3, "click"]],
    template: function SearchComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.escape", function SearchComponent_Template_div_keyup_escape_0_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SearchComponent_Template_button_click_2_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.enter", function SearchComponent_Template_input_keyup_enter_4_listener() {
          return ctx.search();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Hit enter to search");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SearchComponent_div_8_Template, 1, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("show", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 4, ctx.show$));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.searchCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 6, ctx.show$));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
    styles: [".search[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  opacity: 0;\n  height: 50vh;\n  pointer-events: none;\n  transform: scale(0.75);\n  transition: all 0.25s cubic-bezier(0.2, 1, 0.3, 1);\n  z-index: 1050;\n}\n.search.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n  transform: scale(1);\n  transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);\n}\n\n.search-input[_ngcontent-%COMP%] {\n  font-size: 7vw;\n  line-height: 3rem;\n  width: 75%;\n  margin: 0px;\n  border-radius: 0px;\n  border-bottom-width: 1px;\n  border-right-width: 0px;\n  border-left-width: 0px;\n  border-top-width: 0px;\n  background-color: transparent;\n  font-weight: 700;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n.search-hint[_ngcontent-%COMP%] {\n  width: 75%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  text-align: right;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 700;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-hint-text-rgb) / var(--tw-text-opacity));\n}\n\n.search-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  opacity: 0;\n  height: 50vh;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3Rvb2xiYXIvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUFBLGVBQUE7RUFBQSxRQUFBO0VBQUEsU0FBQTtFQUFBLGFBQUE7RUFBQSxXQUFBO0VBQUEsc0JBQUE7RUFBQSxtQkFBQTtFQUFBLHVCQUFBO0VBQUEsa0JBQUE7RUFBQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrREFBQTtFQUNBO0FBTEE7QUFPQTtFQUNFLFVBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaURBQUE7QUFDSjs7QUFHQTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQUEsa0JBQUE7RUFBQSx3QkFBQTtFQUFBLHVCQUFBO0VBQUEsc0JBQUE7RUFBQSxxQkFBQTtFQUFBLDZCQUFBO0VBQUEsZ0JBQUE7QUFBRjtBQUVFO0VBQ0UsYUFBQTtBQUFKOztBQUlBO0VBQ0UsVUFBQTtFQUNBLGlCQUFBO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLG9CQUFBO0VBQUEsaUJBQUE7RUFBQSxlQUFBO0VBQUEsbUJBQUE7RUFBQSxnQkFBQTtFQUFBLG9CQUFBO0VBQUEsd0VBQUE7QUFERjs7QUFLRTtFQUFBLGVBQUE7RUFBQSxXQUFBO0VBQUEsU0FBQTtFQUFBLFdBQUE7RUFBQSxVQUFBO0VBQ0E7QUFEQSIsInNvdXJjZXNDb250ZW50IjpbIi5zZWFyY2gge1xuICBAYXBwbHkgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgZml4ZWQgdG9wLTAgbGVmdC0wIHctZnVsbCBvcGFjaXR5LTA7XG4gIGhlaWdodDogNTB2aDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBjdWJpYy1iZXppZXIoMC4yLCAxLCAwLjMsIDEpO1xuICB6LWluZGV4OiAxMDUwO1xuXG4gICYuc2hvdyB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGN1YmljLWJlemllcigwLjIsIDEsIDAuMywgMSk7XG4gIH1cbn1cblxuLnNlYXJjaC1pbnB1dCB7XG4gIGZvbnQtc2l6ZTogN3Z3O1xuICBsaW5lLWhlaWdodDogM3JlbTtcbiAgd2lkdGg6IDc1JTtcbiAgQGFwcGx5IGJvcmRlci1iIG0tMCByb3VuZGVkLW5vbmUgYm9yZGVyLXItMCBib3JkZXItbC0wIGJvcmRlci10LTAgZm9udC1ib2xkIGJnLXRyYW5zcGFyZW50O1xuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbn1cblxuLnNlYXJjaC1oaW50IHtcbiAgd2lkdGg6IDc1JTtcbiAgQGFwcGx5IHRleHQtYmFzZSB0ZXh0LXJpZ2h0IHB5LTQgbXgtYXV0byB0ZXh0LWhpbnQgZm9udC1ib2xkO1xufVxuXG4uc2VhcmNoLW92ZXJsYXkge1xuICBAYXBwbHkgZml4ZWQgdy1mdWxsIGJvdHRvbS0wIGxlZnQtMCBvcGFjaXR5LTA7XG4gIGhlaWdodDogNTB2aDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 3925:
/*!*********************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/search/search.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchService: () => (/* binding */ SearchService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);


class SearchService {
  constructor() {
    this.valueChangesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject('');
    this.valueChanges$ = this.valueChangesSubject.asObservable();
    this.submitSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.submit$ = this.submitSubject.asObservable();
    this.isOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
    this.isOpen$ = this.isOpenSubject.asObservable();
  }
  static #_ = this.ɵfac = function SearchService_Factory(t) {
    return new (t || SearchService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: SearchService,
    factory: SearchService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 1951:
/*!*********************************************************************************************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/toolbar-notifications/toolbar-notifications-dropdown/toolbar-notifications-dropdown.component.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarNotificationsDropdownComponent: () => (/* binding */ ToolbarNotificationsDropdownComponent)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ 7765);
/* harmony import */ var _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/utils/track-by */ 7637);
/* harmony import */ var _vex_pipes_vex_date_format_relative_vex_date_format_relative_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe */ 1031);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);














const _c0 = () => [];
function ToolbarNotificationsDropdownComponent_a_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "vexDateFormatRelative");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("read", notification_r2.read);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](9, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", notification_r2.colorClass)("svgIcon", notification_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](notification_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 7, notification_r2.datetime), " ");
  }
}
class ToolbarNotificationsDropdownComponent {
  constructor() {
    this.notifications = [{
      id: '1',
      label: 'New Order Received',
      icon: 'mat:shopping_basket',
      colorClass: 'text-primary-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 1
      })
    }, {
      id: '2',
      label: 'New customer has registered',
      icon: 'mat:account_circle',
      colorClass: 'text-orange-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 2
      })
    }, {
      id: '3',
      label: 'Campaign statistics are available',
      icon: 'mat:insert_chart',
      colorClass: 'text-purple-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 5
      })
    }, {
      id: '4',
      label: 'Project has been approved',
      icon: 'mat:check_circle',
      colorClass: 'text-green-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 9
      })
    }, {
      id: '5',
      label: 'Client reports are available',
      icon: 'mat:description',
      colorClass: 'text-primary-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 30
      })
    }, {
      id: '6',
      label: 'New review received',
      icon: 'mat:feedback',
      colorClass: 'text-orange-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 40
      }),
      read: true
    }, {
      id: '7',
      label: '22 verified registrations',
      icon: 'mat:verified_user',
      colorClass: 'text-green-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 60
      })
    }, {
      id: '8',
      label: 'New files available',
      icon: 'mat:file_copy',
      colorClass: 'text-amber-600',
      datetime: luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.local().minus({
        hour: 90
      })
    }];
    this.trackById = _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_1__.trackById;
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function ToolbarNotificationsDropdownComponent_Factory(t) {
    return new (t || ToolbarNotificationsDropdownComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ToolbarNotificationsDropdownComponent,
    selectors: [["vex-toolbar-notifications-dropdown"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 24,
    vars: 4,
    consts: [[1, "dropdown"], [1, "dropdown-header", "flex", "items-center", "justify-between"], [1, "dropdown-heading"], [1, "dropdown-subheading"], ["mat-icon-button", "", "type", "button", 3, "matMenuTriggerFor"], ["svgIcon", "mat:settings", 1, "notifications-header-icon"], [1, "dropdown-content"], ["class", "notification flex items-center", "matRipple", "", 3, "read", "routerLink", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "dropdown-footer", "flex", "items-center", "justify-center"], ["color", "primary", "mat-button", "", "type", "button"], ["xPosition", "before", "yPosition", "below"], ["settingsMenu", "matMenu"], ["mat-menu-item", ""], ["svgIcon", "mat:clear_all"], ["svgIcon", "mat:notifications_off"], ["matRipple", "", 1, "notification", "flex", "items-center", 3, "routerLink"], [1, "notification-icon", "flex-none", 3, "ngClass", "svgIcon"], [1, "flex-auto"], [1, "notification-label"], [1, "notification-description"], ["svgIcon", "mat:chevron_right", 1, "notification-chevron", "flex-none"]],
    template: function ToolbarNotificationsDropdownComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ToolbarNotificationsDropdownComponent_a_10_Template, 9, 10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 8)(12, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "MARK ALL AS READ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "mat-menu", 10, 11)(16, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Mark all as read");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "mat-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Disable Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" You have ", ctx.notifications.length, " new notifications. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matMenuTriggerFor", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.notifications)("ngForTrackBy", ctx.trackById);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatIconButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuTrigger, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRipple, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _vex_pipes_vex_date_format_relative_vex_date_format_relative_pipe__WEBPACK_IMPORTED_MODULE_2__.VexDateFormatRelativePipe],
    styles: [".dropdown[_ngcontent-%COMP%] {\n  background: var(--vex-background-card);\n  border-bottom-left-radius: var(--vex-border-radius);\n  border-bottom-right-radius: var(--vex-border-radius);\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  max-width: 100vw;\n  overflow: hidden;\n  width: 350px;\n  border-radius: var(--vex-border-radius);\n}\n\n.dropdown-header[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-color-primary-600) / var(--tw-bg-opacity));\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-on-primary-600) / var(--tw-text-opacity));\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.dropdown-heading[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.dropdown-subheading[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.dropdown-content[_ngcontent-%COMP%] {\n  max-height: 291px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.dropdown-footer[_ngcontent-%COMP%] {\n  border-top-width: 1px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-background-app-bar-rgb) / var(--tw-bg-opacity));\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.notification[_ngcontent-%COMP%] {\n  position: relative;\n  -webkit-user-select: none;\n          user-select: none;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-text-rgb) / var(--tw-text-opacity));\n  text-decoration-line: none;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.notification[_ngcontent-%COMP%]:hover {\n  background-color: var(--vex-background-hover);\n}\n.notification[_ngcontent-%COMP%]:hover   .notification-label[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity));\n}\n.notification.read[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n.notification-icon[_ngcontent-%COMP%] {\n  margin-inline-end: 1.5rem;\n}\n\n.notification-label[_ngcontent-%COMP%] {\n  transition: inherit;\n}\n\n.notification-description[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-secondary-text-rgb) / var(--tw-text-opacity));\n}\n\n.notification-chevron[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.notification[_ngcontent-%COMP%]    + .notification[_ngcontent-%COMP%] {\n  border-top-width: 1px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3Rvb2xiYXIvdG9vbGJhci1ub3RpZmljYXRpb25zL3Rvb2xiYXItbm90aWZpY2F0aW9ucy1kcm9wZG93bi90b29sYmFyLW5vdGlmaWNhdGlvbnMtZHJvcGRvd24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQ0FBQTtFQUNBLG1EQUFBO0VBQ0Esb0RBQUE7RUFDQSwrRUFBQTtFQUFBLG1HQUFBO0VBQUEsdUdBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHVDQUFBO0FBQ0Y7O0FBR0U7RUFBQSxrQkFBQTtFQUFBLDBFQUFBO0VBQUEsaUJBQUE7RUFBQSxvQkFBQTtFQUFBLG9CQUFBO0VBQUEscUJBQUE7RUFBQSxvQkFBQTtFQUFBLG9FQUFBO0VBQUEsMEVBQUE7RUFBQSw4RkFBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQSxtQkFBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQSxrQkFBQTtFQUFBO0FBQUE7O0FBR0Y7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFHRTtFQUFBLHFCQUFBO0VBQUEsa0JBQUE7RUFBQSwrRUFBQTtFQUFBLG1CQUFBO0VBQUEsc0JBQUE7RUFBQSxvQkFBQTtFQUFBO0FBQUE7O0FBSUE7RUFBQSxrQkFBQTtFQUFBLHlCQUFBO1VBQUEsaUJBQUE7RUFBQSxpQkFBQTtFQUFBLG9CQUFBO0VBQUEsb0JBQUE7RUFBQSxxQkFBQTtFQUFBLG9CQUFBO0VBQUEsbUVBQUE7RUFBQSwwQkFBQTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7QUFHRTtFQUFBO0FBQUE7QUFHRTtFQUFBLG9CQUFBO0VBQUE7QUFBQTtBQUtGO0VBQUE7QUFBQTs7QUFLRjtFQUFBO0FBQUE7O0FBR0Y7RUFDRSxtQkFBQTtBQUZGOztBQU1FO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLG9CQUFBO0VBQUE7QUFBQTs7QUFHRjtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0VBQUEsZ0RBQUE7QUFGRjs7QUFNRTtFQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJvcGRvd24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtYmFja2dyb3VuZC1jYXJkKTtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdmFyKC0tdmV4LWJvcmRlci1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tdmV4LWJvcmRlci1yYWRpdXMpO1xuICBAYXBwbHkgc2hhZG93LWxnO1xuICBtYXgtd2lkdGg6IDEwMHZ3O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogMzUwcHg7XG4gIEBhcHBseSByb3VuZGVkO1xufVxuXG4uZHJvcGRvd24taGVhZGVyIHtcbiAgQGFwcGx5IGJnLXByaW1hcnktNjAwIHNoYWRvdyB0ZXh0LW9uLXByaW1hcnktNjAwIHB5LTQgcHgtNjtcbn1cblxuLmRyb3Bkb3duLWhlYWRpbmcge1xuICBAYXBwbHkgdGV4dC1sZztcbn1cblxuLmRyb3Bkb3duLXN1YmhlYWRpbmcge1xuICBAYXBwbHkgdGV4dC14cztcbn1cblxuLmRyb3Bkb3duLWNvbnRlbnQge1xuICBtYXgtaGVpZ2h0OiAyOTFweDsgLy8gNzNweCBoZWlnaHQgb2YgMSBub3RpZmljYXRpb24gKiA0XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLmRyb3Bkb3duLWZvb3RlciB7XG4gIEBhcHBseSBiZy1hcHAtYmFyIGJvcmRlci10IHB5LTIgcHgtNjtcbn1cblxuLm5vdGlmaWNhdGlvbiB7XG4gIEBhcHBseSB0ZXh0LWRlZmF1bHQgcmVsYXRpdmUgc2VsZWN0LW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwIGVhc2Utb3V0LXN3aWZ0IHB5LTQgcHgtNiBuby11bmRlcmxpbmU7XG5cbiAgJjpob3ZlciB7XG4gICAgQGFwcGx5IGJnLWhvdmVyO1xuXG4gICAgLm5vdGlmaWNhdGlvbi1sYWJlbCB7XG4gICAgICBAYXBwbHkgdGV4dC1wcmltYXJ5LTYwMDtcbiAgICB9XG4gIH1cblxuICAmLnJlYWQge1xuICAgIEBhcHBseSBvcGFjaXR5LTUwO1xuICB9XG59XG5cbi5ub3RpZmljYXRpb24taWNvbiB7XG4gIEBhcHBseSBtZS02O1xufVxuXG4ubm90aWZpY2F0aW9uLWxhYmVsIHtcbiAgdHJhbnNpdGlvbjogaW5oZXJpdDtcbn1cblxuLm5vdGlmaWNhdGlvbi1kZXNjcmlwdGlvbiB7XG4gIEBhcHBseSB0ZXh0LXNlY29uZGFyeSB0ZXh0LXhzO1xufVxuXG4ubm90aWZpY2F0aW9uLWNoZXZyb24ge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgd2lkdGg6IDE4cHg7XG4gIEBhcHBseSB0ZXh0LWdyYXktNDAwO1xufVxuXG4ubm90aWZpY2F0aW9uICsgLm5vdGlmaWNhdGlvbiB7XG4gIEBhcHBseSBib3JkZXItdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 2824:
/*!*****************************************************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/toolbar-notifications/toolbar-notifications.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarNotificationsComponent: () => (/* binding */ ToolbarNotificationsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _toolbar_notifications_dropdown_toolbar_notifications_dropdown_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbar-notifications-dropdown/toolbar-notifications-dropdown.component */ 1951);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover.service */ 563);








const _c0 = ["originRef"];
class ToolbarNotificationsComponent {
  constructor(popover, cd) {
    this.popover = popover;
    this.cd = cd;
    this.dropdownOpen = false;
  }
  ngOnInit() {}
  showPopover() {
    this.dropdownOpen = true;
    this.cd.markForCheck();
    if (!this.originRef) {
      throw new Error('originRef undefined!');
    }
    const popoverRef = this.popover.open({
      content: _toolbar_notifications_dropdown_toolbar_notifications_dropdown_component__WEBPACK_IMPORTED_MODULE_0__.ToolbarNotificationsDropdownComponent,
      origin: this.originRef,
      offsetY: 12,
      position: [{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }]
    });
    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
  static #_ = this.ɵfac = function ToolbarNotificationsComponent_Factory(t) {
    return new (t || ToolbarNotificationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_1__.VexPopoverService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ToolbarNotificationsComponent,
    selectors: [["vex-toolbar-notifications"]],
    viewQuery: function ToolbarNotificationsComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7, _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.originRef = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 2,
    consts: [["mat-icon-button", "", "type", "button", 1, "button", 3, "click"], ["originRef", ""], ["color", "primary", "svgIcon", "mat:notifications_active"]],
    template: function ToolbarNotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToolbarNotificationsComponent_Template_button_click_0_listener() {
          return ctx.showPopover();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-hover", ctx.dropdownOpen);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 7799:
/*!******************************************************************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/toolbar-user/toolbar-user-dropdown/toolbar-user-dropdown.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarUserDropdownComponent: () => (/* binding */ ToolbarUserDropdownComponent)
/* harmony export */ });
/* harmony import */ var _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/utils/track-by */ 7637);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover-ref */ 5925);















function ToolbarUserDropdownComponent_a_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToolbarUserDropdownComponent_a_10_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r6.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 25)(3, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "mat-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", item_r5.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", item_r5.colorClass)("svgIcon", item_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r5.description);
  }
}
function ToolbarUserDropdownComponent_ng_container_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const status_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", status_r8.colorClass)("svgIcon", status_r8.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](status_r8.label);
  }
}
function ToolbarUserDropdownComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ToolbarUserDropdownComponent_ng_container_13_span_1_Template, 5, 3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const status_r8 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", status_r8 === ctx_r1.activeStatus);
  }
}
function ToolbarUserDropdownComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToolbarUserDropdownComponent_button_18_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const status_r11 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r12.setStatus(status_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const status_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", status_r11.colorClass)("svgIcon", status_r11.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](status_r11.label);
  }
}
const _c0 = () => ["/login"];
class ToolbarUserDropdownComponent {
  constructor(cd, popoverRef) {
    this.cd = cd;
    this.popoverRef = popoverRef;
    this.items = [{
      id: '1',
      icon: 'mat:account_circle',
      label: 'My Profile',
      description: 'Personal Information',
      colorClass: 'text-teal-600',
      route: '/apps/social'
    }, {
      id: '2',
      icon: 'mat:move_to_inbox',
      label: 'My Inbox',
      description: 'Messages & Latest News',
      colorClass: 'text-primary-600',
      route: '/apps/chat'
    }, {
      id: '3',
      icon: 'mat:list_alt',
      label: 'My Projects',
      description: 'Tasks & Active Projects',
      colorClass: 'text-amber-600',
      route: '/apps/scrumboard'
    }, {
      id: '4',
      icon: 'mat:table_chart',
      label: 'Billing Information',
      description: 'Pricing & Current Plan',
      colorClass: 'text-purple-600',
      route: '/pages/pricing'
    }];
    this.statuses = [{
      id: 'online',
      label: 'Online',
      icon: 'mat:check_circle',
      colorClass: 'text-green-600'
    }, {
      id: 'away',
      label: 'Away',
      icon: 'mat:access_time',
      colorClass: 'text-orange-600'
    }, {
      id: 'dnd',
      label: 'Do not disturb',
      icon: 'mat:do_not_disturb',
      colorClass: 'text-red-600'
    }, {
      id: 'offline',
      label: 'Offline',
      icon: 'mat:offline_bolt',
      colorClass: 'text-gray-600'
    }];
    this.activeStatus = this.statuses[0];
    this.trackById = _vex_utils_track_by__WEBPACK_IMPORTED_MODULE_0__.trackById;
  }
  ngOnInit() {}
  setStatus(status) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }
  close() {
    this.popoverRef.close();
  }
  static #_ = this.ɵfac = function ToolbarUserDropdownComponent_Factory(t) {
    return new (t || ToolbarUserDropdownComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_ref__WEBPACK_IMPORTED_MODULE_1__.VexPopoverRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ToolbarUserDropdownComponent,
    selectors: [["vex-toolbar-user-dropdown"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 37,
    vars: 10,
    consts: [[1, "dropdown"], [1, "dropdown-header", "flex", "items-center", "justify-between"], [1, "flex", "items-center"], [1, "dropdown-heading-icon", "flex", "items-center", "justify-center"], ["svgIcon", "mat:person"], [1, "dropdown-heading"], ["mat-icon-button", "", "matTooltip", "Settings", "matTooltipPosition", "before", "type", "button", 3, "matMenuTriggerFor"], ["svgIcon", "mat:settings", 1, "notifications-header-icon"], [1, "dropdown-content"], ["class", "notification flex items-center", "matRipple", "", 3, "routerLink", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "dropdown-footer", "flex", "items-center", "justify-between"], ["mat-button", "", "type", "button", 1, "dropdown-footer-select", 3, "matMenuTriggerFor"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["color", "primary", "mat-button", "", 3, "routerLink", "click"], ["xPosition", "before", "yPosition", "below"], ["statusMenu", "matMenu"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["settingsMenu", "matMenu"], ["mat-menu-item", ""], ["svgIcon", "mat:business"], ["svgIcon", "mat:verified_user"], ["svgIcon", "mat:lock"], ["svgIcon", "mat:notifications_off"], ["matRipple", "", 1, "notification", "flex", "items-center", 3, "routerLink", "click"], [1, "notification-icon", "flex-none", 3, "ngClass", "svgIcon"], [1, "flex-auto"], [1, "notification-label"], [1, "notification-description"], ["svgIcon", "mat:chevron_right", 1, "notification-chevron", "flex-none"], [4, "ngIf"], [3, "ngClass", "svgIcon"], ["svgIcon", "mat:arrow_drop_down", 1, "dropdown-footer-select-caret"], ["mat-menu-item", "", 3, "click"]],
    template: function ToolbarUserDropdownComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "David Smith");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ToolbarUserDropdownComponent_a_10_Template, 8, 5, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 10)(12, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, ToolbarUserDropdownComponent_ng_container_13_Template, 2, 1, "ng-container", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToolbarUserDropdownComponent_Template_a_click_14_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Logout");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "mat-menu", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ToolbarUserDropdownComponent_button_18_Template, 4, 3, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "mat-menu", 14, 17)(21, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "mat-icon", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Change Address");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "mat-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Change Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "mat-icon", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Change Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](34, "mat-icon", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Disable Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](17);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.items)("ngForTrackBy", ctx.trackById);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.statuses)("ngForTrackBy", ctx.trackById);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](9, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.statuses)("ngForTrackBy", ctx.trackById);
      }
    },
    dependencies: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatIconButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltip, _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__.MatMenuModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_6__.MatMenuTrigger, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatRipple, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
    styles: [".dropdown[_ngcontent-%COMP%] {\n  background: var(--vex-background-card);\n  border-bottom-left-radius: var(--vex-border-radius);\n  border-bottom-right-radius: var(--vex-border-radius);\n  max-width: 100vw;\n  overflow: hidden;\n  width: 350px;\n  border-radius: var(--vex-border-radius);\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.dropdown-header[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-color-primary-600) / var(--tw-bg-opacity));\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  padding-right: 1rem;\n  padding-left: 0.75rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-on-primary-600) / var(--tw-text-opacity));\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.dropdown-heading-icon[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 999999px;\n  margin-right: 0.75rem;\n  padding: 0.5rem;\n}\n.dropdown-heading-icon[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  height: 32px;\n  width: 32px;\n}\n\n.dropdown-heading[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.dropdown-content[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.dropdown-footer[_ngcontent-%COMP%] {\n  border-top-width: 1px;\n  --tw-bg-opacity: 1;\n  background-color: rgb(var(--vex-background-app-bar-rgb) / var(--tw-bg-opacity));\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n.dropdown-footer-select[_ngcontent-%COMP%] {\n  padding-left: 0.75rem;\n}\n.dropdown-footer-select[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]:not(.dropdown-footer-select-caret) {\n  vertical-align: -7px !important;\n  margin-right: 0.5rem;\n}\n\n.dropdown-footer-select-caret[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  vertical-align: -4px !important;\n  width: 18px;\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.notification[_ngcontent-%COMP%] {\n  position: relative;\n  -webkit-user-select: none;\n          user-select: none;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-text-rgb) / var(--tw-text-opacity));\n  text-decoration-line: none;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.notification[_ngcontent-%COMP%]:hover {\n  background-color: var(--vex-background-hover);\n}\n.notification[_ngcontent-%COMP%]:hover   .notification-label[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-color-primary-600) / var(--tw-text-opacity));\n}\n.notification.read[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n.notification-icon[_ngcontent-%COMP%] {\n  margin-right: 1.5rem;\n}\n\n.notification-label[_ngcontent-%COMP%] {\n  transition: inherit;\n}\n\n.notification-description[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(var(--vex-foreground-secondary-text-rgb) / var(--tw-text-opacity));\n}\n\n.notification-chevron[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.notification[_ngcontent-%COMP%]    + .notification[_ngcontent-%COMP%] {\n  border-top-width: 1px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3Rvb2xiYXIvdG9vbGJhci11c2VyL3Rvb2xiYXItdXNlci1kcm9wZG93bi90b29sYmFyLXVzZXItZHJvcGRvd24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQ0FBQTtFQUNBLG1EQUFBO0VBQ0Esb0RBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHVDQUFBO0VBQUEsK0VBQUE7RUFBQSxtR0FBQTtFQUFBLHVHQUFBO0FBQ0Y7O0FBR0U7RUFBQSxrQkFBQTtFQUFBLDBFQUFBO0VBQUEsaUJBQUE7RUFBQSxvQkFBQTtFQUFBLG1CQUFBO0VBQUEscUJBQUE7RUFBQSxvQkFBQTtFQUFBLG9FQUFBO0VBQUEsMEVBQUE7RUFBQSw4RkFBQTtFQUFBO0FBQUE7O0FBR0Y7RUFDRSxvQ0FBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFBQSxlQUFBO0FBQ0Y7QUFDRTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUlFO0VBQUEsbUJBQUE7RUFBQTtBQUFBOztBQUdGO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBSUU7RUFBQSxxQkFBQTtFQUFBLGtCQUFBO0VBQUEsK0VBQUE7RUFBQSxvQkFBQTtFQUFBLHFCQUFBO0VBQUEsb0JBQUE7RUFBQTtBQUFBOztBQUlBO0VBQUE7QUFBQTtBQUVBO0VBQ0UsK0JBQUE7RUFDQSxvQkFBQTtBQUFKOztBQUlBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGdEQUFBO0FBREY7O0FBS0U7RUFBQSxrQkFBQTtFQUFBLHlCQUFBO1VBQUEsaUJBQUE7RUFBQSxpQkFBQTtFQUFBLG9CQUFBO0VBQUEsb0JBQUE7RUFBQSxxQkFBQTtFQUFBLG9CQUFBO0VBQUEsbUVBQUE7RUFBQSwwQkFBQTtFQUFBLHdCQUFBO0VBQUEsd0RBQUE7RUFBQSwwQkFBQTtFQUFBO0FBQUE7QUFHRTtFQUFBO0FBQUE7QUFHRTtFQUFBLG9CQUFBO0VBQUE7QUFBQTtBQUtGO0VBQUE7QUFBQTs7QUFLRjtFQUFBO0FBQUE7O0FBR0Y7RUFDRSxtQkFBQTtBQUpGOztBQVFFO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLG9CQUFBO0VBQUE7QUFBQTs7QUFHRjtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0VBQUEsZ0RBQUE7QUFKRjs7QUFRRTtFQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJvcGRvd24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS12ZXgtYmFja2dyb3VuZC1jYXJkKTtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdmFyKC0tdmV4LWJvcmRlci1yYWRpdXMpO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdmFyKC0tdmV4LWJvcmRlci1yYWRpdXMpO1xuICBtYXgtd2lkdGg6IDEwMHZ3O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogMzUwcHg7XG4gIEBhcHBseSByb3VuZGVkIHNoYWRvdy1sZztcbn1cblxuLmRyb3Bkb3duLWhlYWRlciB7XG4gIEBhcHBseSBiZy1wcmltYXJ5LTYwMCB0ZXh0LW9uLXByaW1hcnktNjAwIHB5LTQgcHItNCBwbC0zIHNoYWRvdztcbn1cblxuLmRyb3Bkb3duLWhlYWRpbmctaWNvbiB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogOTk5OTk5cHg7XG4gIEBhcHBseSBwLTIgbXItMztcblxuICAubWF0LWljb24ge1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICBoZWlnaHQ6IDMycHg7XG4gICAgd2lkdGg6IDMycHg7XG4gIH1cbn1cblxuLmRyb3Bkb3duLWhlYWRpbmcge1xuICBAYXBwbHkgdGV4dC1sZztcbn1cblxuLmRyb3Bkb3duLWNvbnRlbnQge1xuICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uZHJvcGRvd24tZm9vdGVyIHtcbiAgQGFwcGx5IGJvcmRlci10IGJnLWFwcC1iYXIgcHgtMiBweS0zO1xufVxuXG4uZHJvcGRvd24tZm9vdGVyLXNlbGVjdCB7XG4gIEBhcHBseSBwbC0zO1xuXG4gIC5tYXQtaWNvbjpub3QoLmRyb3Bkb3duLWZvb3Rlci1zZWxlY3QtY2FyZXQpIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogLTdweCAhaW1wb3J0YW50O1xuICAgIEBhcHBseSBtci0yO1xuICB9XG59XG5cbi5kcm9wZG93bi1mb290ZXItc2VsZWN0LWNhcmV0IHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIHZlcnRpY2FsLWFsaWduOiAtNHB4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxOHB4O1xuICBAYXBwbHkgdGV4dC1ncmF5LTQwMDtcbn1cblxuLm5vdGlmaWNhdGlvbiB7XG4gIEBhcHBseSB0ZXh0LWRlZmF1bHQgcmVsYXRpdmUgc2VsZWN0LW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwIGVhc2Utb3V0LXN3aWZ0IHB5LTQgcHgtNiBuby11bmRlcmxpbmU7XG5cbiAgJjpob3ZlciB7XG4gICAgQGFwcGx5IGJnLWhvdmVyO1xuXG4gICAgLm5vdGlmaWNhdGlvbi1sYWJlbCB7XG4gICAgICBAYXBwbHkgdGV4dC1wcmltYXJ5LTYwMDtcbiAgICB9XG4gIH1cblxuICAmLnJlYWQge1xuICAgIEBhcHBseSBvcGFjaXR5LTUwO1xuICB9XG59XG5cbi5ub3RpZmljYXRpb24taWNvbiB7XG4gIEBhcHBseSBtci02O1xufVxuXG4ubm90aWZpY2F0aW9uLWxhYmVsIHtcbiAgdHJhbnNpdGlvbjogaW5oZXJpdDtcbn1cblxuLm5vdGlmaWNhdGlvbi1kZXNjcmlwdGlvbiB7XG4gIEBhcHBseSB0ZXh0LXNlY29uZGFyeSB0ZXh0LXhzO1xufVxuXG4ubm90aWZpY2F0aW9uLWNoZXZyb24ge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgd2lkdGg6IDE4cHg7XG4gIEBhcHBseSB0ZXh0LWdyYXktNDAwO1xufVxuXG4ubm90aWZpY2F0aW9uICsgLm5vdGlmaWNhdGlvbiB7XG4gIEBhcHBseSBib3JkZXItdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 9546:
/*!***********************************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/toolbar-user/toolbar-user.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarUserComponent: () => (/* binding */ ToolbarUserComponent)
/* harmony export */ });
/* harmony import */ var _toolbar_user_dropdown_toolbar_user_dropdown_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbar-user-dropdown/toolbar-user-dropdown.component */ 7799);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover.service */ 563);







class ToolbarUserComponent {
  constructor(popover, cd) {
    this.popover = popover;
    this.cd = cd;
    this.dropdownOpen = false;
  }
  ngOnInit() {}
  showPopover(originRef) {
    this.dropdownOpen = true;
    this.cd.markForCheck();
    const popoverRef = this.popover.open({
      content: _toolbar_user_dropdown_toolbar_user_dropdown_component__WEBPACK_IMPORTED_MODULE_0__.ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }]
    });
    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
  static #_ = this.ɵfac = function ToolbarUserComponent_Factory(t) {
    return new (t || ToolbarUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_1__.VexPopoverService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ToolbarUserComponent,
    selectors: [["vex-toolbar-user"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 6,
    vars: 2,
    consts: [["matRipple", "", 1, "flex", "items-center", "rounded", "cursor-pointer", "relative", "transition", "duration-400", "ease-out-swift", "select-none", "py-1", "pr-1", "pl-3", "hover:bg-hover", 3, "click"], ["originRef", ""], [1, "body-1", "font-medium", "leading-snug", "ltr:mr-3", "rtl:ml-3", "hidden", "sm:block"], [1, "rounded-full", "h-9", "w-9", "flex", "items-center", "justify-center", "text-primary-600", "bg-primary-600/10"], ["svgIcon", "mat:person"]],
    template: function ToolbarUserComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ToolbarUserComponent_Template_div_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.showPopover(_r0));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " David Smith ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-hover", ctx.dropdownOpen);
      }
    },
    dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRipple, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 52:
/*!*****************************************************************!*\
  !*** ./src/app/layouts/components/toolbar/toolbar.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarComponent: () => (/* binding */ ToolbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 4520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 5043);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 1891);
/* harmony import */ var _mega_menu_mega_menu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mega-menu/mega-menu.component */ 2276);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _navigation_navigation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../navigation/navigation.component */ 9373);
/* harmony import */ var _toolbar_user_toolbar_user_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbar-user/toolbar-user.component */ 9546);
/* harmony import */ var _toolbar_notifications_toolbar_notifications_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toolbar-notifications/toolbar-notifications.component */ 2824);
/* harmony import */ var _navigation_navigation_item_navigation_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../navigation/navigation-item/navigation-item.component */ 9208);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _vex_utils_check_router_childs_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vex/utils/check-router-childs-data */ 9681);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);
/* harmony import */ var _core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/navigation/navigation.service */ 120);
/* harmony import */ var _vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @vex/components/vex-popover/vex-popover.service */ 563);
























const _c0 = () => ["/"];
function ToolbarComponent_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "a", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h1", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](8, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 4, ctx_r0.isDesktop$));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 6, ctx_r0.title$), " ");
  }
}
function ToolbarComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, " Add New ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", !_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 3, ctx_r1.isDesktop$));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r2);
  }
}
const _c1 = a0 => ({
  "bg-primary-600/10": a0
});
function ToolbarComponent_button_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ToolbarComponent_button_43_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](42);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r10.openMegaMenu(_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Mega Menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "mat-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", !_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 3, ctx_r5.isDesktop$));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](7, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 5, ctx_r5.megaMenuOpen$)));
  }
}
function ToolbarComponent_div_45_vex_navigation_item_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "vex-navigation-item", 41);
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("item", item_r13);
  }
}
function ToolbarComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, ToolbarComponent_div_45_vex_navigation_item_2_Template, 1, 1, "vex-navigation-item", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", !_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 3, ctx_r6.isDesktop$));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 5, ctx_r6.navigationItems$));
  }
}
function ToolbarComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "vex-toolbar-user");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ToolbarComponent_vex_navigation_73_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "vex-navigation");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", !_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 2, ctx_r9.isDesktop$));
  }
}
class ToolbarComponent {
  constructor(layoutService, configService, navigationService, popoverService, router) {
    this.layoutService = layoutService;
    this.configService = configService;
    this.navigationService = navigationService;
    this.popoverService = popoverService;
    this.router = router;
    this.showShadow = false;
    this.navigationItems$ = this.navigationService.items$;
    this.isHorizontalLayout$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(config => config.layout === 'horizontal'));
    this.isVerticalLayout$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(config => config.layout === 'vertical'));
    this.isNavbarInToolbar$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(config => config.navbar.position === 'in-toolbar'));
    this.isNavbarBelowToolbar$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(config => config.navbar.position === 'below-toolbar'));
    this.userVisible$ = this.configService.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(config => config.toolbar.user.visible));
    this.title$ = this.configService.select(config => config.sidenav.title);
    this.isDesktop$ = this.layoutService.isDesktop$;
    this.megaMenuOpen$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)(false);
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_10__.DestroyRef);
  }
  ngOnInit() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_14__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.startWith)(null), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_16__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => {
      this.showShadow = (0,_vex_utils_check_router_childs_data__WEBPACK_IMPORTED_MODULE_5__.checkRouterChildsData)(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled ?? false);
    });
  }
  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }
  openSidenav() {
    this.layoutService.openSidenav();
  }
  openMegaMenu(origin) {
    this.megaMenuOpen$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)(this.popoverService.open({
      content: _mega_menu_mega_menu_component__WEBPACK_IMPORTED_MODULE_0__.MegaMenuComponent,
      origin,
      offsetY: 12,
      position: [{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }]
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.switchMap)(popoverRef => popoverRef.afterClosed$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.startWith)(true));
  }
  openSearch() {
    this.layoutService.openSearch();
  }
  static #_ = this.ɵfac = function ToolbarComponent_Factory(t) {
    return new (t || ToolbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_6__.VexLayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_7__.VexConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_8__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_vex_components_vex_popover_vex_popover_service__WEBPACK_IMPORTED_MODULE_9__.VexPopoverService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: ToolbarComponent,
    selectors: [["vex-toolbar"]],
    hostVars: 2,
    hostBindings: function ToolbarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("shadow-b", ctx.showShadow);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵStandaloneFeature"]],
    decls: 76,
    vars: 33,
    consts: [[1, "toolbar", "text-default", "w-full", "px-6", "flex", "items-center"], ["mat-icon-button", "", "type", "button", 3, "click"], ["svgIcon", "mat:menu"], ["class", "ltr:mr-4 rtl:ml-4 flex items-center", 3, "routerLink", 4, "ngIf"], ["color", "primary", "mat-flat-button", "", "type", "button", 3, "hidden", "matMenuTriggerFor", 4, "ngIf"], ["xPosition", "after", "yPosition", "below", 3, "overlapTrigger"], ["addNewMenu", "matMenu"], ["mat-menu-item", ""], ["svgIcon", "mat:person_add"], ["svgIcon", "mat:done_all"], ["svgIcon", "mat:assignment_turned_in"], ["mat-menu-item", "", 3, "matMenuTriggerFor"], ["svgIcon", "mat:ballot"], ["documentMenu", "matMenu"], ["svgIcon", "mat:description"], ["svgIcon", "mat:assignment"], ["svgIcon", "mat:receipt"], [1, "ltr:ml-2", "rtl:mr-2"], ["megaMenuOriginRef", ""], ["color", "primary", "mat-button", "", "type", "button", 3, "hidden", "ngClass", "click", 4, "ngIf"], ["class", "px-6 flex-none flex items-center", 3, "hidden", 4, "ngIf"], [1, "flex-1"], [1, "-mx-1", "flex", "items-center"], [1, "px-1"], ["color", "primary", "svgIcon", "mat:search"], ["color", "primary", "svgIcon", "mat:bookmarks"], ["mat-icon-button", "", "type", "button", 3, "matMenuTriggerFor"], ["svgIcon", "flag:united-states"], ["class", "px-1", 4, "ngIf"], ["overlapTrigger", "false", "xPosition", "before", "yPosition", "below"], ["languageMenu", "matMenu"], ["svgIcon", "flag:germany"], [3, "hidden", 4, "ngIf"], [1, "ltr:mr-4", "rtl:ml-4", "flex", "items-center", 3, "routerLink"], ["alt", "Logo", "src", "assets/img/logo/logo.svg", 1, "w-8", "select-none"], [1, "text-2xl", "font-bold", "tracking-wide", "ltr:pl-4", "rtl:pr-4", "m-0", "select-none"], ["color", "primary", "mat-flat-button", "", "type", "button", 3, "matMenuTriggerFor"], ["color", "primary", "mat-button", "", "type", "button", 3, "ngClass", "click"], ["svgIcon", "mat:arrow_drop_down", 1, "icon-sm"], [1, "px-6", "flex-none", "flex", "items-center"], [3, "item", 4, "ngFor", "ngForOf"], [3, "item"]],
    template: function ToolbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_2_listener() {
          return ctx.openSidenav();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, ToolbarComponent_a_5_Template, 6, 9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ToolbarComponent_button_7_Template, 3, 5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "mat-menu", 5, 6)(11, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](12, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "Add Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](16, "mat-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "Add Task");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](20, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22, "Add Project");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](24, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26, "Add Document");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "mat-menu", null, 13)(29, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](30, "mat-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](32, "Add Quote");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](36, "Add Invoice");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](38, "mat-icon", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](40, "Add Receipt");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "div", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, ToolbarComponent_button_43_Template, 6, 9, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](44, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](45, ToolbarComponent_div_45_Template, 4, 7, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](46, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](47, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](48, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](49, "div", 22)(50, "div", 23)(51, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_51_listener() {
          return ctx.openSearch();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](52, "mat-icon", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](54, "vex-toolbar-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](55, "div", 23)(56, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_56_listener() {
          return ctx.openQuickpanel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](57, "mat-icon", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](58, "div", 23)(59, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](60, "mat-icon", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](61, ToolbarComponent_div_61_Template, 2, 0, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](62, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](63, "mat-menu", 29, 30)(65, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](66, "mat-icon", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](67, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](68, "English");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](69, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](70, "mat-icon", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](71, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](72, "German");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](73, ToolbarComponent_vex_navigation_73_Template, 2, 4, "vex-navigation", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](74, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](75, "async");
      }
      if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](28);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("container", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 13, ctx.isVerticalLayout$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 15, ctx.isDesktop$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](6, 17, ctx.isVerticalLayout$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 19, ctx.isHorizontalLayout$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("overlapTrigger", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](44, 21, ctx.isHorizontalLayout$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](46, 23, ctx.isVerticalLayout$) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](47, 25, ctx.isNavbarInToolbar$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matMenuTriggerFor", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](62, 27, ctx.userVisible$));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](74, 29, ctx.isVerticalLayout$) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](75, 31, ctx.isNavbarBelowToolbar$));
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLink, _angular_material_menu__WEBPACK_IMPORTED_MODULE_21__.MatMenuModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_21__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_21__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_21__.MatMenuTrigger, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgFor, _navigation_navigation_item_navigation_item_component__WEBPACK_IMPORTED_MODULE_4__.NavigationItemComponent, _toolbar_notifications_toolbar_notifications_component__WEBPACK_IMPORTED_MODULE_3__.ToolbarNotificationsComponent, _toolbar_user_toolbar_user_component__WEBPACK_IMPORTED_MODULE_2__.ToolbarUserComponent, _navigation_navigation_component__WEBPACK_IMPORTED_MODULE_1__.NavigationComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.AsyncPipe],
    styles: ["[_nghost-%COMP%] {\n  background: var(--vex-toolbar-background);\n  box-sizing: border-box;\n  display: block;\n  white-space: nowrap;\n  width: 100%;\n  z-index: var(--vex-toolbar-z-index);\n  border-bottom-width: 1px;\n  --tw-backdrop-blur: blur(8px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  height: var(--vex-toolbar-height);\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGF5b3V0cy9jb21wb25lbnRzL3Rvb2xiYXIvdG9vbGJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlDQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsbUNBQUE7RUFDQSx3QkFBQTtFQUFBLDZCQUFBO0VBQUEsK1FBQUE7VUFBQSx1UUFBQTtBQUNGOztBQUVBO0VBQ0UsaUNBQUE7QUFDRjs7QUFFQTtFQUNFLHFCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXZleC10b29sYmFyLWJhY2tncm91bmQpO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIHotaW5kZXg6IHZhcigtLXZleC10b29sYmFyLXotaW5kZXgpO1xuICBAYXBwbHkgYmFja2Ryb3AtYmx1ciBib3JkZXItYjtcbn1cblxuLnRvb2xiYXIge1xuICBoZWlnaHQ6IHZhcigtLXZleC10b29sYmFyLWhlaWdodCk7XG59XG5cbmEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 8349:
/*!****************************************************!*\
  !*** ./src/app/layouts/layout/layout.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutComponent: () => (/* binding */ LayoutComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 3839);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _vex_components_vex_sidebar_vex_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vex/components/vex-sidebar/vex-sidebar.component */ 483);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _components_sidenav_sidenav_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/sidenav/sidenav.component */ 6468);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/toolbar/toolbar.component */ 52);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/footer/footer.component */ 3147);
/* harmony import */ var _components_quickpanel_quickpanel_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/quickpanel/quickpanel.component */ 4132);
/* harmony import */ var _components_config_panel_config_panel_toggle_config_panel_toggle_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/config-panel/config-panel-toggle/config-panel-toggle.component */ 3593);
/* harmony import */ var _components_config_panel_config_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/config-panel/config-panel.component */ 6426);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _base_layout_base_layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../base-layout/base-layout.component */ 8158);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sidenav */ 1465);
/* harmony import */ var _components_toolbar_search_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/toolbar/search/search.component */ 6182);
/* harmony import */ var _vex_components_vex_progress_bar_vex_progress_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @vex/components/vex-progress-bar/vex-progress-bar.component */ 6912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @vex/services/vex-layout.service */ 4952);
/* harmony import */ var _vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @vex/config/vex-config.service */ 376);




















function LayoutComponent_vex_base_layout_0_vex_footer_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "vex-footer", 12);
  }
}
function LayoutComponent_vex_base_layout_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "vex-base-layout");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "vex-progress-bar")(2, "vex-search");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "mat-sidenav-container", 1)(4, "mat-sidenav", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("closedStart", function LayoutComponent_vex_base_layout_0_Template_mat_sidenav_closedStart_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r4.onSidenavClosed());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](9, "vex-sidenav", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](10, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "mat-sidenav", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("closedStart", function LayoutComponent_vex_base_layout_0_Template_mat_sidenav_closedStart_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r6.onQuickpanelClosed());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "vex-quickpanel");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "mat-sidenav-content", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](15, "vex-toolbar", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "main", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](17, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](18, LayoutComponent_vex_base_layout_0_vex_footer_18_Template, 1, 0, "vex-footer", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "vex-config-panel-toggle", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("openConfig", function LayoutComponent_vex_base_layout_0_Template_vex_config_panel_toggle_openConfig_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r5);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](21);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](_r3.open());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "vex-sidebar", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](22, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "vex-config-panel");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const config_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disableClose", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 11, ctx_r0.sidenavDisableClose$))("fixedInViewport", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 13, ctx_r0.sidenavFixedInViewport$))("mode", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 15, ctx_r0.sidenavMode$)) !== null && tmp_2_0 !== undefined ? tmp_2_0 : "side")("opened", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](8, 17, ctx_r0.sidenavOpen$));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("collapsed", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](10, 19, ctx_r0.sidenavCollapsed$));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("opened", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](12, 21, ctx_r0.quickpanelOpen$));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("dark", config_r1.layout === "vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", config_r1.footer.visible);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("invisibleBackdrop", true)("opened", !!_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](22, 23, ctx_r0.configPanelOpen$));
  }
}
class LayoutComponent {
  constructor(layoutService, configService) {
    this.layoutService = layoutService;
    this.configService = configService;
    this.config$ = this.configService.config$;
    this.sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
    this.sidenavDisableClose$ = this.layoutService.isDesktop$;
    this.sidenavFixedInViewport$ = this.layoutService.isDesktop$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(isDesktop => !isDesktop));
    this.sidenavMode$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.combineLatest)([this.layoutService.isDesktop$, this.configService.select(config => config.layout)]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(([isDesktop, layout]) => !isDesktop || layout === 'vertical' ? 'over' : 'side'));
    this.sidenavOpen$ = this.layoutService.sidenavOpen$;
    this.configPanelOpen$ = this.layoutService.configPanelOpen$;
    this.quickpanelOpen$ = this.layoutService.quickpanelOpen$;
  }
  onSidenavClosed() {
    this.layoutService.closeSidenav();
  }
  onQuickpanelClosed() {
    this.layoutService.closeQuickpanel();
  }
  static #_ = this.ɵfac = function LayoutComponent_Factory(t) {
    return new (t || LayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_vex_services_vex_layout_service__WEBPACK_IMPORTED_MODULE_10__.VexLayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_vex_config_vex_config_service__WEBPACK_IMPORTED_MODULE_11__.VexConfigService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: LayoutComponent,
    selectors: [["vex-layout"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [[4, "ngIf"], [1, "vex-layout-sidenav-container"], [3, "disableClose", "fixedInViewport", "mode", "opened", "closedStart"], [3, "collapsed"], ["mode", "over", "position", "end", 1, "vex-layout-quickpanel", 3, "opened", "closedStart"], [1, "vex-layout-sidenav-content"], [1, "vex-toolbar"], [1, "vex-layout-content"], ["class", "vex-footer", 4, "ngIf"], [3, "openConfig"], ["position", "right", 3, "invisibleBackdrop", "opened"], ["configpanel", ""], [1, "vex-footer"]],
    template: function LayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, LayoutComponent_vex_base_layout_0_Template, 24, 25, "vex-base-layout", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](1, 1, ctx.config$));
      }
    },
    dependencies: [_base_layout_base_layout_component__WEBPACK_IMPORTED_MODULE_7__.BaseLayoutComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _components_sidenav_sidenav_component__WEBPACK_IMPORTED_MODULE_1__.SidenavComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_2__.ToolbarComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent, _components_quickpanel_quickpanel_component__WEBPACK_IMPORTED_MODULE_4__.QuickpanelComponent, _components_config_panel_config_panel_toggle_config_panel_toggle_component__WEBPACK_IMPORTED_MODULE_5__.ConfigPanelToggleComponent, _vex_components_vex_sidebar_vex_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.VexSidebarComponent, _components_config_panel_config_panel_component__WEBPACK_IMPORTED_MODULE_6__.ConfigPanelComponent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialogModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenavModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenav, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenavContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__.MatSidenavContent, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterOutlet, _components_toolbar_search_search_component__WEBPACK_IMPORTED_MODULE_8__.SearchComponent, _vex_components_vex_progress_bar_vex_progress_bar_component__WEBPACK_IMPORTED_MODULE_9__.VexProgressBarComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5451:
/*!****************************************************!*\
  !*** ./src/app/services/vanguardia-api.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VanguardiaApiService: () => (/* binding */ VanguardiaApiService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9736);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);





class VanguardiaApiService {
  constructor(http) {
    this.http = http;
    // Configuración de la API basada en tu archivo Postman
    this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api.baseUrl;
    this.providerTokenHeader = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api.providerTokenHeader;
    this.providerTokenValue = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api.providerTokenValue;
    // Token de autenticación (se debe obtener del login)
    this.authToken = null;
  }
  /**
   * Crea los headers necesarios para las peticiones
   */
  getHeaders() {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
      'Content-Type': 'application/json',
      [this.providerTokenHeader]: this.providerTokenValue
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }
  /**
   * Obtiene el inventario desde /vgd/invoice con ordenamiento por defecto por fecha de facturación
   */
  getInvoices() {
    const url = `${this.baseUrl}/vgd/invoice?ordertype=desc&orderby=billing_date`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbyOrder_dms(order_dms) {
    const url = `${this.baseUrl}/vgd/invoice?order_dms=${order_dms}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API Order:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbyVin(vin) {
    const url = `${this.baseUrl}/vgd/invoice?vin=${vin}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API VIN:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbySendSF(send) {
    const url = `${this.baseUrl}/vgd/invoice?sendedSalesForce=${send}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API Send:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbyInsert(status) {
    // status: 'true' => Insertado correctamente (insertCorrect == '1')
    // status: 'false' => Error (insertCorrect == '0')
    const insertCorrectValue = status === 'true' ? '1' : '0';
    const url = `${this.baseUrl}/vgd/invoice?insertCorrect=${insertCorrectValue}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API Insert:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbyReference(reference) {
    const url = `${this.baseUrl}/vgd/invoice?invoice_reference=${reference}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API Rerence:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }

  getInvoicesbyAgencies(agencie) {
    const url = `${this.baseUrl}/vgd/invoice?agencyName=${agencie}`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API por Agencia:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }
  /**
   * Paginación y filtros combinados: retorna items y metadatos (total, per_page, page)
   */
  getInvoicesPaged(params) {
    const url = `${this.baseUrl}/vgd/invoice`;
    let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
    const p = params || {};
    // Core filters
    ['order_dms', 'vin', 'invoice_reference', 'agencyName', 'sendedSalesForce', 'insertCorrect'].forEach(k => {
      const v = p[k];
      if (v !== undefined && v !== null && v !== '') {
        httpParams = httpParams.set(k, String(v));
      }
    });
    // Paginación con page y perpage
    const page = Number(p.page || 1);
    const perpage = Number(p.perpage || 5);
    httpParams = httpParams.set('page', String(page));
    httpParams = httpParams.set('perpage', String(perpage));
    // Agregar ordenamiento si existe
    if (p.orderby && p.ordertype) {
      httpParams = httpParams.set('orderby', p.orderby);
      httpParams = httpParams.set('ordertype', p.ordertype);
    }
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    console.log('🌐 getInvoicesPaged - URL:', url);
    console.log('🌐 getInvoicesPaged - Params enviados:', httpParams.toString());
    return this.http.get(url, {
      headers,
      params: httpParams
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      const d = res?.data ?? {};
      return {
        items: d?.data ?? [],
        total: d?.total_rows ?? 0,
        per_page: d?.per_page ?? (Array.isArray(d?.data) ? d.data.length : 0),
        page: d?.page ?? 1
      };
    }));
  }
  getAgencies() {
    // Solicitar todas las agencias usando un perpage alto
    const url = `${this.baseUrl}/vgd/agenciesfilter?perpage=100`;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders().set('Content-Type', 'application/json').set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');
    return this.http.get(url, {
      headers
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      console.log('Respuesta completa de la API Agencias:', res);
      return res?.data?.data ?? []; //devolver solo array
    }));
  }
  /**
   * Refresca el token desde /auth/refresh
   */
  refreshToken(refreshToken) {
    const url = `${this.baseUrl}/auth/refresh`;
    return this.http.post(url, {
      refresh_token: refreshToken
    }, {
      headers: this.getHeaders()
    });
  }
  static #_ = this.ɵfac = function VanguardiaApiService_Factory(t) {
    return new (t || VanguardiaApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: VanguardiaApiService,
    factory: VanguardiaApiService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  api: {
    baseUrl: 'https://apisvanguardia.com:400',
    providerTokenHeader: 'X-Provider-Token',
    providerTokenValue: 'b26e88c4-ddbe-4adb-a214-4667f454824a'
  }
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 6401);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config */ 7110);



(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _app_app_config__WEBPACK_IMPORTED_MODULE_1__.appConfig).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map