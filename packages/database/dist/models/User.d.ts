import { Model } from "sequelize-typescript";
import Template from "./Template";
import Board from "./Board";
import { Role } from "../types";
declare class User extends Model<User> {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
    templates: Template[];
    boards: Board[];
    static setPassword(user: User): Promise<void>;
    static findByIdentifier(identifier: string): Promise<User | null>;
    validatePassword(password: string): Promise<boolean>;
}
export default User;
