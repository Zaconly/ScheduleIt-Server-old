import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: any;
}> = {
    [K in keyof T]: T[K];
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    Time: any;
    DateTime: any;
};
export declare type Query = {
    __typename?: "Query";
    _?: Maybe<Scalars["Boolean"]>;
    allBoards?: Maybe<Array<Board>>;
    allUsers?: Maybe<Array<User>>;
    board?: Maybe<Board>;
    user?: Maybe<User>;
    userBoards?: Maybe<Array<Board>>;
};
export declare type QueryBoardArgs = {
    id: Scalars["ID"];
};
export declare type QueryUserArgs = {
    id: Scalars["ID"];
};
export declare type Mutation = {
    __typename?: "Mutation";
    _?: Maybe<Scalars["Boolean"]>;
    addBoard?: Maybe<Board>;
    addUser?: Maybe<User>;
    deleteBoard?: Maybe<Scalars["Boolean"]>;
    deleteUser?: Maybe<Scalars["Boolean"]>;
    updateBoard?: Maybe<Board>;
    updateUser?: Maybe<User>;
};
export declare type MutationAddBoardArgs = {
    input: BoardInput;
};
export declare type MutationAddUserArgs = {
    input: UserInput;
};
export declare type MutationDeleteBoardArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteUserArgs = {
    id: Scalars["ID"];
};
export declare type MutationUpdateBoardArgs = {
    id: Scalars["ID"];
    input: BoardInput;
};
export declare type MutationUpdateUserArgs = {
    id: Scalars["ID"];
    input: UserInput;
};
export declare type BoardInput = {
    name: Scalars["String"];
    icon: Scalars["String"];
    isArchived: Scalars["Boolean"];
};
export declare type Board = {
    __typename?: "Board";
    id: Scalars["ID"];
    name: Scalars["String"];
    icon?: Maybe<Scalars["String"]>;
    isArchived: Scalars["Boolean"];
    createdAt?: Maybe<Scalars["DateTime"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
};
export declare type Subscription = {
    __typename?: "Subscription";
    _?: Maybe<Scalars["Boolean"]>;
};
export declare enum Role {
    User = "USER",
    Admin = "ADMIN"
}
export declare type UserInput = {
    username: Scalars["String"];
    email: Scalars["String"];
    password: Scalars["String"];
};
export declare type User = {
    __typename?: "User";
    id: Scalars["ID"];
    username: Scalars["String"];
    email: Scalars["String"];
    isActive: Scalars["Boolean"];
    role: Role;
    createdAt?: Maybe<Scalars["DateTime"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
    ID: ResolverTypeWrapper<Scalars["ID"]>;
    Mutation: ResolverTypeWrapper<{}>;
    BoardInput: BoardInput;
    String: ResolverTypeWrapper<Scalars["String"]>;
    Board: ResolverTypeWrapper<Board>;
    Subscription: ResolverTypeWrapper<{}>;
    Date: ResolverTypeWrapper<Scalars["Date"]>;
    Time: ResolverTypeWrapper<Scalars["Time"]>;
    DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
    Role: Role;
    UserInput: UserInput;
    User: ResolverTypeWrapper<User>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    Boolean: Scalars["Boolean"];
    ID: Scalars["ID"];
    Mutation: {};
    BoardInput: BoardInput;
    String: Scalars["String"];
    Board: Board;
    Subscription: {};
    Date: Scalars["Date"];
    Time: Scalars["Time"];
    DateTime: Scalars["DateTime"];
    UserInput: UserInput;
    User: User;
}>;
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = ResolversObject<{
    _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
    allBoards?: Resolver<Maybe<Array<ResolversTypes["Board"]>>, ParentType, ContextType>;
    allUsers?: Resolver<Maybe<Array<ResolversTypes["User"]>>, ParentType, ContextType>;
    board?: Resolver<Maybe<ResolversTypes["Board"]>, ParentType, ContextType, RequireFields<QueryBoardArgs, "id">>;
    user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<QueryUserArgs, "id">>;
    userBoards?: Resolver<Maybe<Array<ResolversTypes["Board"]>>, ParentType, ContextType>;
}>;
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = ResolversObject<{
    _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
    addBoard?: Resolver<Maybe<ResolversTypes["Board"]>, ParentType, ContextType, RequireFields<MutationAddBoardArgs, "input">>;
    addUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<MutationAddUserArgs, "input">>;
    deleteBoard?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, "id">>;
    deleteUser?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, "id">>;
    updateBoard?: Resolver<Maybe<ResolversTypes["Board"]>, ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, "id" | "input">>;
    updateUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, "id" | "input">>;
}>;
export declare type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes["Board"] = ResolversParentTypes["Board"]> = ResolversObject<{
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    isArchived?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;
export declare type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]> = ResolversObject<{
    _?: SubscriptionResolver<Maybe<ResolversTypes["Boolean"]>, "_", ParentType, ContextType>;
}>;
export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
    name: "Date";
}
export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
    name: "Time";
}
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
    name: "DateTime";
}
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = ResolversObject<{
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;
export declare type Resolvers<ContextType = any> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Board?: BoardResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    Date?: GraphQLScalarType;
    Time?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    User?: UserResolvers<ContextType>;
}>;
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
