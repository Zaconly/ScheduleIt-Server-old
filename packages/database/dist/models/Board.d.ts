import { Model } from "sequelize-typescript";
import User from "./User";
import Template from "./Template";
declare class Board extends Model<Board> {
    id: string;
    name: string;
    icon?: string;
    isArchived: boolean;
    userId: string;
    user: User;
    templateId: string;
    template: Template;
}
export default Board;
