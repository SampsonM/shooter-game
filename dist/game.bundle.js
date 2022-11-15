/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/Game.js":
/*!******************************!*\
  !*** ./src/services/Game.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nfunction shouldResizeRender(renderer) {\n\tconst { width, height, clientWidth, clientHeight } = renderer.domElement;\n\treturn width !== clientWidth || height !== clientHeight;\n}\n\nfunction resizeRenderer(renderer) {\n\tconst { clientWidth, clientHeight } = renderer.domElement;\n\trenderer.setSize(clientWidth, clientHeight, false);\n}\n\nfunction createCamera() {\n\tconst fov = 85;\n\tconst aspect = 2;  // the canvas default\n\tconst near = 0.1;\n\tconst far = 5;\n\treturn new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(fov, aspect, near, far);\n}\n\nfunction createBoxGeometry() {\n\tconst boxWidth = 1;\n\tconst boxHeight = 1;\n\tconst boxDepth = 1;\n\n\treturn new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(boxWidth, boxHeight, boxDepth);\n}\n\nfunction createCubeInstance(geometry, color, x, scene) {\n\tconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color });\n\tconst cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n\tcube.position.x = x;\n\n\tscene.add(cube);\n\n\treturn cube;\n}\n\nfunction createLight(scene, x, y, z) {\n\tconst color = 0xFFFF00;\n\tconst intensity = 1;\n\tconst light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(color, intensity);\n\tlight.position.set(x, y, z);\n\n\tscene.add(light);\n\n\treturn light\n}\n\nfunction renderCubes(time, renderer, camera, cubes, scene) {\n\ttime *= 0.001;  // convert time to seconds\n\n\tif (shouldResizeRender(renderer)) {\n\t\tresizeRenderer(renderer)\n\n\t\tconst { clientWidth, clientHeight } = renderer.domElement\n\t\tcamera.aspect = clientWidth / clientHeight;\n\t\tcamera.updateProjectionMatrix();\n\t}\n\n\tcubes.forEach((cube, ndx) => {\n\t\tconst speed = 1 + ndx * .1;\n\t\tconst rot = time * speed;\n\t\tcube.rotation.x = rot;\n\t\tcube.rotation.y = rot;\n\t});\n\n\trenderer.render(scene, camera);\n\n\trequestAnimationFrame((t) => renderCubes(t, renderer, camera, cubes, scene));\n}\n\nfunction createCanvas() {\n\tconst canvas = document.createElement('canvas');\n\tcanvas.id = \"game-canvas\"\n\tdocument.body.appendChild(canvas)\n\n\treturn canvas\n}\n\nclass Game {\n\tconstructor() {\n\t\tconst canvas = createCanvas();\n\t\tconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ canvas });\n\t\tconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n\t\n\t\tconst camera = createCamera();\n\t\tcamera.position.z = 2;\n\t\n\t\tcreateLight(scene, -1, 2, 4)\n\t\n\t\tconst boxGeometry = createBoxGeometry();\n\t\n\t\tconst cubes = [\n\t\t\tcreateCubeInstance(boxGeometry, 0x44aa88, 0, scene),\n\t\t\tcreateCubeInstance(boxGeometry, 0x8844aa, -2, scene),\n\t\t\tcreateCubeInstance(boxGeometry, 0xaa8844, 2, scene),\n\t\t];\n\t\n\t\trenderCubes(1000, renderer, camera, cubes, scene)\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://shooter-game/./src/services/Game.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/services/Game.js");
/******/ 	
/******/ })()
;