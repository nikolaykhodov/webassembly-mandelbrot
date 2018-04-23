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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/mandelbrot-es6.js":
/*!*******************************!*\
  !*** ./src/mandelbrot-es6.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const SIZE = 1000;\nconst POINT_A = {\n    x: -2.3,\n    y: 2\n};\nconst POINT_B = {\n    x: 1.4,\n    y: -2\n};\n\n/*\n * @param {Uint8ClampedArray} pixelArray Image data\n * @param {Number} width Image width\n * @param {Number} height Image height\n * @param {{x, y}} pointA Defines the top-left corner\n * @param {{x, y}} pointB Defined the bottom-right corner\n */\nfunction computeFractal(pixelArray, width, height, pointA, pointB) {\n    const getColor = (colorComponent, interations) => (width - interations) * colorComponent % 256;\n    let currentColorComponent = 0;\n\n    for (let y = 0; y < height; y++) {\n        for (let x = 0; x < width; x++) {\n            // Z = (0, 0)\n            let zA = 0;\n            let zB = 0;\n\n            // translate the image pixel onto (x, y)-coordinates: C = (x, y)\n            let cA = pointA.x + (pointB.x - pointA.x) / width * x;\n            let cB = pointA.y + (pointB.y - pointA.y) / height * y;\n\n            // while |Z| <= 2\n            let interations = 0;\n            while (interations++ < width && zA * zA + zB * zB <= 4) {\n                // Z = Z * Z + C\n                const t = zA * zA - zB * zB;\n                zB = 2 * zA * zB + cB;\n                zA = t + cA;\n            }\n\n            // compute the pixel color\n            // R\n            pixelArray[currentColorComponent++] = getColor(255, interations);\n            // G\n            pixelArray[currentColorComponent++] = getColor(255, interations);\n            // B\n            pixelArray[currentColorComponent++] = getColor(255, interations);\n            // A\n            pixelArray[currentColorComponent++] = 255;\n        }\n    }\n}\n\n(function () {\n    const canvas = document.createElement('canvas');\n    canvas.width = SIZE;\n    canvas.height = SIZE;\n    document.body.appendChild(canvas);\n\n    const context = canvas.getContext('2d');\n    const image = context.createImageData(SIZE, SIZE);\n    computeFractal(image.data, SIZE, SIZE, POINT_A, POINT_B);\n    context.putImageData(image, 0, 0);\n})();\n\n//# sourceURL=webpack:///./src/mandelbrot-es6.js?");

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./src/mandelbrot-es6.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/mandelbrot-es6.js */\"./src/mandelbrot-es6.js\");\n\n\n//# sourceURL=webpack:///multi_./src/mandelbrot-es6.js?");

/***/ })

/******/ });