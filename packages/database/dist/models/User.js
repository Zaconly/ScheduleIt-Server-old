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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Template_1 = __importDefault(require("./Template"));
const Board_1 = __importDefault(require("./Board"));
const types_1 = require("../types");
let User = User_1 = class User extends sequelize_typescript_1.Model {
    static async setPassword(user) {
        user.password = await bcryptjs_1.default.hash(user.password, 10);
    }
    static async findByIdentifier(identifier) {
        let user = await User_1.findOne({
            where: { username: identifier }
        });
        if (!user) {
            user = await User_1.findOne({
                where: { email: identifier }
            });
        }
        return user;
    }
    async validatePassword(password) {
        const match = await bcryptjs_1.default.compare(password, this.password);
        return match;
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(() => shortid_1.default.generate()),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.IsAlphanumeric,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Length({ min: 3, max: 30 }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Length({ min: 4, max: 60 }),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Default(types_1.Role.User),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Template_1.default),
    __metadata("design:type", Array)
], User.prototype, "templates", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Board_1.default),
    __metadata("design:type", Array)
], User.prototype, "boards", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "setPassword", null);
User = User_1 = __decorate([
    sequelize_typescript_1.Table
], User);
exports.default = User;
