/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/mandelbrot-wasm.js":
/*!********************************!*\
  !*** ./src/mandelbrot-wasm.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wasm_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm-loader */ \"./src/wasm-loader.js\");\n\n\nconst SIZE = 1000;\nconst POINT_A = {\n    x: -2.3,\n    y: 2\n};\nconst POINT_B = {\n    x: 1.4,\n    y: -2\n};\n\nfunction allocateMemory(bytes) {\n    const WEBASSEMBLY_MEMORY_PAGE = 65536;\n\n    const pages = Math.floor(bytes / WEBASSEMBLY_MEMORY_PAGE) + 1;\n    return new WebAssembly.Memory({\n        initial: pages\n    });\n}\n\n(async function () {\n    const canvas = document.createElement('canvas');\n    canvas.width = SIZE;\n    canvas.height = SIZE;\n    document.body.appendChild(canvas);\n\n    const memorySize = SIZE * SIZE * 4;\n    const memory = allocateMemory(memorySize);\n    const wasmArray = new Uint8ClampedArray(memory.buffer);\n    const instance = await Object(_wasm_loader__WEBPACK_IMPORTED_MODULE_0__[\"loadWasm\"])('./mandelbrot.wasm', {\n        env: {\n            log: str => {\n                console.log(str);\n            },\n            memory: memory\n        }\n    });\n\n    instance.exports.computeFractal(SIZE, SIZE, POINT_A.x, POINT_A.y, POINT_B.x, POINT_B.y);\n\n    const context = canvas.getContext('2d');\n    const image = context.createImageData(SIZE, SIZE);\n\n    const length = image.data.length;\n    for (let index = 0; index < length; index++) {\n        image.data[index] = wasmArray[index];\n    }\n\n    context.putImageData(image, 0, 0);\n})();\n\n//# sourceURL=webpack:///./src/mandelbrot-wasm.js?");

/***/ }),

/***/ "./src/wasm-loader.js":
/*!****************************!*\
  !*** ./src/wasm-loader.js ***!
  \****************************/
/*! exports provided: loadWasm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadWasm\", function() { return loadWasm; });\n/*\n * Load a WASM module from the remote url\n *\n * @param {String} url\n * @param {Object} importObject\n * @return {WebAssembly.Instance}\n */\nasync function loadWasm(url, importObject) {\n  // const result = await WebAssembly.instantiateStreaming(fetch(url), importObject || {});\n  // return result.instance;\n\n  const response = await fetch(url);\n  const buffer = await response.arrayBuffer();\n  const module = await WebAssembly.instantiate(buffer, importObject);\n\n  return module.instance;\n}\n\n//# sourceURL=webpack:///./src/wasm-loader.js?");

/***/ }),

/***/ 1:
/*!**************************************!*\
  !*** multi ./src/mandelbrot-wasm.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/mandelbrot-wasm.js */\"./src/mandelbrot-wasm.js\");\n\n\n//# sourceURL=webpack:///multi_./src/mandelbrot-wasm.js?");

/***/ })

/******/ });