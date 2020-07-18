"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@monorepo/shared");
const loggerPlugin = {
    requestDidStart(requestContext) {
        shared_1.logger("Request started\n" + requestContext.request.query);
        return {
            didEncounterErrors(requestContext) {
                shared_1.logger("Request error\n" + requestContext.errors, "ERROR");
            }
        };
    }
};
exports.default = loggerPlugin;
