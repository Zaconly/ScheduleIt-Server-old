"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.logger = (message, type) => {
    const dateFormat = `[${new Date().toLocaleString()}] `;
    switch (type) {
        case "WARNING":
            console.warn(chalk_1.default.yellowBright(`WARN ${dateFormat}`) + message);
            break;
        case "ERROR":
            console.error(chalk_1.default.redBright(`ERROR ${dateFormat}`) + message);
            break;
        default:
            console.info(chalk_1.default.blueBright(`INFO ${dateFormat}`) + message);
    }
};
