"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@monorepo/database");
const userResolver = {
    Query: {
        user: async (_parent, { id }) => await database_1.User.findByPk(id),
        allUsers: async () => await database_1.User.findAll()
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const newUser = await database_1.User.create(input);
            return newUser;
        },
        updateUser: async (_parent, { id, input }) => {
            await database_1.User.update(input, { where: { id } });
            const updatedUser = await database_1.User.findByPk(id);
            return updatedUser;
        },
        deleteUser: async (_parent, { id }) => {
            try {
                await database_1.User.destroy({ where: { id } });
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
exports.default = userResolver;
