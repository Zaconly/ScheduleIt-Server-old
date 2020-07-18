"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./User"));
const Template_1 = __importDefault(require("./Template"));
let Board = class Board extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(() => shortid_1.default.generate()),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Length({ min: 2, max: 30 }),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Board.prototype, "icon", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Board.prototype, "isArchived", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Board.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.default),
    __metadata("design:type", User_1.default)
], Board.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Template_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Board.prototype, "templateId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Template_1.default),
    __metadata("design:type", Template_1.default)
], Board.prototype, "template", void 0);
Board = __decorate([
    sequelize_typescript_1.Table
], Board);
exports.default = Board;
