"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_json_1 = __importDefault(require("./config/config.json"));
const User_1 = __importDefault(require("./models/User"));
const Board_1 = __importDefault(require("./models/Board"));
const Template_1 = __importDefault(require("./models/Template"));
const conf = config_json_1.default;
const env = process.env.NODE_ENV || "development";
// @ts-ignore
const sequelize = new sequelize_typescript_1.Sequelize({
    ...conf[env],
    port: conf[env].port || 3306,
    dialect: conf[env].dialect || "mysql",
    models: [User_1.default, Board_1.default, Template_1.default]
});
__exportStar(require("./models"), exports);
exports.default = sequelize;
