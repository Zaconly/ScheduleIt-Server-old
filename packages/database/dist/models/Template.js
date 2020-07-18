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
const Board_1 = __importDefault(require("./Board"));
let Template = class Template extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(() => shortid_1.default.generate()),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Template.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Length({ min: 2, max: 30 }),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Template.prototype, "authorId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.default),
    __metadata("design:type", User_1.default)
], Template.prototype, "author", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Board_1.default),
    __metadata("design:type", Array)
], Template.prototype, "boards", void 0);
Template = __decorate([
    sequelize_typescript_1.Table
], Template);
exports.default = Template;
