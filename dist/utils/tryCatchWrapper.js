"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = tryCatchWrapper;
/**
 * Fully generic async wrapper — works with any typed controller method.
 */
function tryCatchWrapper(controllerFn) {
    return (req, res, next) => {
        controllerFn(req, res, next).catch(next);
    };
}
