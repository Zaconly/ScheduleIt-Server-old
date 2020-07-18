import { Model } from "sequelize-typescript";
import User from "./User";
import Board from "./Board";
declare class Template extends Model<Template> {
    id: string;
    name: string;
    authorId: string;
    author: User;
    boards: Board[];
}
export default Template;
