"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@monorepo/database");
const boardResolver = {
    Query: {
        board: async (_parent, { id }) => await database_1.Board.findByPk(id),
        userBoards: async () => await database_1.Board.findAll(),
        allBoards: async () => await database_1.Board.findAll()
    },
    Mutation: {
        addBoard: async (_parent, { input }) => {
            const newBoard = await database_1.Board.create(input);
            return newBoard;
        },
        updateBoard: async (_parent, { id, input }) => {
            await database_1.Board.update(input, { where: { id } });
            const updatedBoard = await database_1.Board.findByPk(id);
            return updatedBoard;
        },
        deleteBoard: async (_parent, { id }) => {
            try {
                await database_1.Board.destroy({ where: { id } });
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
exports.default = boardResolver;
