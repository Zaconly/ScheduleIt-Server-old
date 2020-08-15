import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date
  Time: Date
  DateTime: Date
  Void: void
}

export type Query = {
  __typename?: "Query"
  _?: Maybe<Scalars["Boolean"]>
  board?: Maybe<Board>
  boards?: Maybe<Array<Board>>
  boardsMe?: Maybe<Array<Board>>
  boardsUser?: Maybe<Array<Board>>
  card?: Maybe<Card>
  cards?: Maybe<Array<Card>>
  cardsList?: Maybe<Array<Card>>
  cardsTag?: Maybe<Array<Card>>
  checkList?: Maybe<CheckList>
  checkLists?: Maybe<Array<CheckList>>
  checkListsCard?: Maybe<Array<CheckList>>
  list?: Maybe<List>
  lists?: Maybe<Array<List>>
  listsBoard?: Maybe<Array<List>>
  me: User
  tag?: Maybe<Tag>
  tags?: Maybe<Array<Tag>>
  tagsBoard?: Maybe<Array<Tag>>
  tagsCard?: Maybe<Array<Tag>>
  task?: Maybe<Task>
  tasks?: Maybe<Array<Task>>
  tasksBoard?: Maybe<Array<Task>>
  tasksCheckList?: Maybe<Array<Task>>
  template?: Maybe<Template>
  templates?: Maybe<Array<Template>>
  templatesAuthor?: Maybe<Array<Template>>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
}

export type QueryBoardArgs = {
  id: Scalars["ID"]
}

export type QueryBoardsUserArgs = {
  userId?: Maybe<Scalars["ID"]>
}

export type QueryCardArgs = {
  id: Scalars["ID"]
}

export type QueryCardsListArgs = {
  listId: Scalars["ID"]
}

export type QueryCardsTagArgs = {
  tagId: Scalars["ID"]
}

export type QueryCheckListArgs = {
  id: Scalars["ID"]
}

export type QueryCheckListsCardArgs = {
  cardId: Scalars["ID"]
}

export type QueryListArgs = {
  id: Scalars["ID"]
}

export type QueryListsBoardArgs = {
  boardId: Scalars["ID"]
}

export type QueryTagArgs = {
  id: Scalars["ID"]
}

export type QueryTagsBoardArgs = {
  boardId: Scalars["ID"]
}

export type QueryTagsCardArgs = {
  cardId: Scalars["ID"]
}

export type QueryTaskArgs = {
  id: Scalars["ID"]
}

export type QueryTemplateArgs = {
  id: Scalars["ID"]
}

export type QueryTemplatesAuthorArgs = {
  authorId: Scalars["ID"]
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type Mutation = {
  __typename?: "Mutation"
  _?: Maybe<Scalars["Boolean"]>
  addBoard?: Maybe<Board>
  addCard?: Maybe<Card>
  addCheckList?: Maybe<CheckList>
  addList?: Maybe<List>
  addTag?: Maybe<Tag>
  addTaskBoard?: Maybe<Task>
  addTaskCheckList?: Maybe<Task>
  addTemplate?: Maybe<Template>
  addUser?: Maybe<User>
  attachTag?: Maybe<Card>
  changePassword?: Maybe<Scalars["Void"]>
  deleteBoard?: Maybe<Scalars["Void"]>
  deleteCard?: Maybe<Scalars["Void"]>
  deleteCheckList?: Maybe<Scalars["Void"]>
  deleteList?: Maybe<Scalars["Void"]>
  deleteTag?: Maybe<Scalars["Void"]>
  deleteTask?: Maybe<Scalars["Void"]>
  deleteTemplate?: Maybe<Scalars["Void"]>
  deleteUser?: Maybe<Scalars["Void"]>
  detachTag?: Maybe<Card>
  forgotPassword?: Maybe<Scalars["Void"]>
  login: User
  logout?: Maybe<Scalars["Void"]>
  register: User
  resetPassword?: Maybe<Scalars["Void"]>
  updateBoard?: Maybe<Board>
  updateCard?: Maybe<Card>
  updateCheckList?: Maybe<CheckList>
  updateList?: Maybe<List>
  updateTag?: Maybe<Tag>
  updateTask?: Maybe<Task>
  updateTemplate?: Maybe<Template>
  updateUser?: Maybe<User>
}

export type MutationAddBoardArgs = {
  input: BoardInput
}

export type MutationAddCardArgs = {
  listId: Scalars["ID"]
  input: CardInput
}

export type MutationAddCheckListArgs = {
  cardId: Scalars["ID"]
  input: CheckListInput
}

export type MutationAddListArgs = {
  boardId: Scalars["ID"]
  input: ListInput
}

export type MutationAddTagArgs = {
  boardId: Scalars["ID"]
  input: TagInput
}

export type MutationAddTaskBoardArgs = {
  boardId: Scalars["ID"]
  input: TaskInput
}

export type MutationAddTaskCheckListArgs = {
  checkListId: Scalars["ID"]
  input: TaskInput
}

export type MutationAddTemplateArgs = {
  input: TemplateInput
}

export type MutationAddUserArgs = {
  input: UserInput
}

export type MutationAttachTagArgs = {
  cardId: Scalars["ID"]
  tagId: Scalars["ID"]
}

export type MutationChangePasswordArgs = {
  oldPassword: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationDeleteBoardArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteCardArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteCheckListArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteListArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteTagArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteTemplateArgs = {
  id: Scalars["ID"]
}

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]
}

export type MutationDetachTagArgs = {
  cardId: Scalars["ID"]
  tagId: Scalars["ID"]
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationResetPasswordArgs = {
  token: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationUpdateBoardArgs = {
  id: Scalars["ID"]
  input: BoardInput
}

export type MutationUpdateCardArgs = {
  id: Scalars["ID"]
  input: CardInput
}

export type MutationUpdateCheckListArgs = {
  id: Scalars["ID"]
  input: CheckListInput
}

export type MutationUpdateListArgs = {
  id: Scalars["ID"]
  input: ListInput
}

export type MutationUpdateTagArgs = {
  id: Scalars["ID"]
  input: TagInput
}

export type MutationUpdateTaskArgs = {
  id: Scalars["ID"]
  input: TaskInput
}

export type MutationUpdateTemplateArgs = {
  id: Scalars["ID"]
  input: TemplateInput
}

export type MutationUpdateUserArgs = {
  id: Scalars["ID"]
  input: UpdateInput
}

export type LoginInput = {
  identifier: Scalars["String"]
  password: Scalars["String"]
}

export type RegisterInput = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type BoardInput = {
  name?: Maybe<Scalars["String"]>
  icon?: Maybe<Scalars["String"]>
  isArchived?: Maybe<Scalars["Boolean"]>
  order?: Maybe<Scalars["Int"]>
}

export type Board = {
  __typename?: "Board"
  id: Scalars["ID"]
  name: Scalars["String"]
  template?: Maybe<Template>
  tasks?: Maybe<Array<Task>>
  lists?: Maybe<Array<List>>
  icon?: Maybe<Scalars["String"]>
  isArchived: Scalars["Boolean"]
  order: Scalars["Int"]
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type CardInput = {
  name?: Maybe<Scalars["String"]>
  dueDate?: Maybe<Scalars["DateTime"]>
  desc?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
}

export type Card = {
  __typename?: "Card"
  id: Scalars["ID"]
  name: Scalars["String"]
  dueDate?: Maybe<Scalars["DateTime"]>
  desc?: Maybe<Scalars["String"]>
  order: Scalars["Int"]
  checkLists?: Maybe<Array<CheckList>>
  tags?: Maybe<Array<Tag>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type CheckListInput = {
  name?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
}

export type CheckList = {
  __typename?: "CheckList"
  id: Scalars["ID"]
  name: Scalars["String"]
  order: Scalars["Int"]
  tasks?: Maybe<Array<Task>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type Subscription = {
  __typename?: "Subscription"
  _?: Maybe<Scalars["Boolean"]>
}

export type ListInput = {
  name?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
}

export type List = {
  __typename?: "List"
  id: Scalars["ID"]
  name: Scalars["String"]
  order: Scalars["Int"]
  cards?: Maybe<Array<Card>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type TagInput = {
  name?: Maybe<Scalars["String"]>
  color?: Maybe<Scalars["String"]>
}

export type Tag = {
  __typename?: "Tag"
  id: Scalars["ID"]
  name: Scalars["String"]
  color?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type TaskInput = {
  name: Scalars["String"]
  isCompleted: Scalars["Boolean"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
  order?: Maybe<Scalars["Int"]>
}

export type Task = {
  __typename?: "Task"
  id: Scalars["ID"]
  name: Scalars["String"]
  isCompleted: Scalars["Boolean"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
  order: Scalars["Int"]
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type TemplateInput = {
  name: Scalars["String"]
}

export type Template = {
  __typename?: "Template"
  id: Scalars["ID"]
  name: Scalars["String"]
  desc?: Maybe<Scalars["String"]>
  type: Scalars["String"]
  author?: Maybe<User>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export enum Role {
  User = "USER",
  Admin = "ADMIN"
}

export type UpdateInput = {
  username?: Maybe<Scalars["String"]>
}

export type UserInput = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  username: Scalars["String"]
  email: Scalars["String"]
  isActive: Scalars["Boolean"]
  role: Role
  boards?: Maybe<Array<Board>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Mutation: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars["String"]>
  LoginInput: LoginInput
  RegisterInput: RegisterInput
  BoardInput: BoardInput
  Int: ResolverTypeWrapper<Scalars["Int"]>
  Board: ResolverTypeWrapper<Board>
  CardInput: CardInput
  Card: ResolverTypeWrapper<Card>
  CheckListInput: CheckListInput
  CheckList: ResolverTypeWrapper<CheckList>
  Subscription: ResolverTypeWrapper<{}>
  Date: ResolverTypeWrapper<Scalars["Date"]>
  Time: ResolverTypeWrapper<Scalars["Time"]>
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>
  Void: ResolverTypeWrapper<Scalars["Void"]>
  ListInput: ListInput
  List: ResolverTypeWrapper<List>
  TagInput: TagInput
  Tag: ResolverTypeWrapper<Tag>
  TaskInput: TaskInput
  Task: ResolverTypeWrapper<Task>
  TemplateInput: TemplateInput
  Template: ResolverTypeWrapper<Template>
  Role: Role
  UpdateInput: UpdateInput
  UserInput: UserInput
  User: ResolverTypeWrapper<User>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  Boolean: Scalars["Boolean"]
  ID: Scalars["ID"]
  Mutation: {}
  String: Scalars["String"]
  LoginInput: LoginInput
  RegisterInput: RegisterInput
  BoardInput: BoardInput
  Int: Scalars["Int"]
  Board: Board
  CardInput: CardInput
  Card: Card
  CheckListInput: CheckListInput
  CheckList: CheckList
  Subscription: {}
  Date: Scalars["Date"]
  Time: Scalars["Time"]
  DateTime: Scalars["DateTime"]
  Void: Scalars["Void"]
  ListInput: ListInput
  List: List
  TagInput: TagInput
  Tag: Tag
  TaskInput: TaskInput
  Task: Task
  TemplateInput: TemplateInput
  Template: Template
  UpdateInput: UpdateInput
  UserInput: UserInput
  User: User
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
  board?: Resolver<
    Maybe<ResolversTypes["Board"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBoardArgs, "id">
  >
  boards?: Resolver<Maybe<Array<ResolversTypes["Board"]>>, ParentType, ContextType>
  boardsMe?: Resolver<Maybe<Array<ResolversTypes["Board"]>>, ParentType, ContextType>
  boardsUser?: Resolver<
    Maybe<Array<ResolversTypes["Board"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryBoardsUserArgs, never>
  >
  card?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCardArgs, "id">
  >
  cards?: Resolver<Maybe<Array<ResolversTypes["Card"]>>, ParentType, ContextType>
  cardsList?: Resolver<
    Maybe<Array<ResolversTypes["Card"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryCardsListArgs, "listId">
  >
  cardsTag?: Resolver<
    Maybe<Array<ResolversTypes["Card"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryCardsTagArgs, "tagId">
  >
  checkList?: Resolver<
    Maybe<ResolversTypes["CheckList"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCheckListArgs, "id">
  >
  checkLists?: Resolver<Maybe<Array<ResolversTypes["CheckList"]>>, ParentType, ContextType>
  checkListsCard?: Resolver<
    Maybe<Array<ResolversTypes["CheckList"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryCheckListsCardArgs, "cardId">
  >
  list?: Resolver<
    Maybe<ResolversTypes["List"]>,
    ParentType,
    ContextType,
    RequireFields<QueryListArgs, "id">
  >
  lists?: Resolver<Maybe<Array<ResolversTypes["List"]>>, ParentType, ContextType>
  listsBoard?: Resolver<
    Maybe<Array<ResolversTypes["List"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryListsBoardArgs, "boardId">
  >
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  tag?: Resolver<
    Maybe<ResolversTypes["Tag"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTagArgs, "id">
  >
  tags?: Resolver<Maybe<Array<ResolversTypes["Tag"]>>, ParentType, ContextType>
  tagsBoard?: Resolver<
    Maybe<Array<ResolversTypes["Tag"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryTagsBoardArgs, "boardId">
  >
  tagsCard?: Resolver<
    Maybe<Array<ResolversTypes["Tag"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryTagsCardArgs, "cardId">
  >
  task?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTaskArgs, "id">
  >
  tasks?: Resolver<Maybe<Array<ResolversTypes["Task"]>>, ParentType, ContextType>
  tasksBoard?: Resolver<Maybe<Array<ResolversTypes["Task"]>>, ParentType, ContextType>
  tasksCheckList?: Resolver<Maybe<Array<ResolversTypes["Task"]>>, ParentType, ContextType>
  template?: Resolver<
    Maybe<ResolversTypes["Template"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTemplateArgs, "id">
  >
  templates?: Resolver<Maybe<Array<ResolversTypes["Template"]>>, ParentType, ContextType>
  templatesAuthor?: Resolver<
    Maybe<Array<ResolversTypes["Template"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryTemplatesAuthorArgs, "authorId">
  >
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >
  users?: Resolver<Maybe<Array<ResolversTypes["User"]>>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>
  addBoard?: Resolver<
    Maybe<ResolversTypes["Board"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddBoardArgs, "input">
  >
  addCard?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCardArgs, "listId" | "input">
  >
  addCheckList?: Resolver<
    Maybe<ResolversTypes["CheckList"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCheckListArgs, "cardId" | "input">
  >
  addList?: Resolver<
    Maybe<ResolversTypes["List"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddListArgs, "boardId" | "input">
  >
  addTag?: Resolver<
    Maybe<ResolversTypes["Tag"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTagArgs, "boardId" | "input">
  >
  addTaskBoard?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskBoardArgs, "boardId" | "input">
  >
  addTaskCheckList?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskCheckListArgs, "checkListId" | "input">
  >
  addTemplate?: Resolver<
    Maybe<ResolversTypes["Template"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTemplateArgs, "input">
  >
  addUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddUserArgs, "input">
  >
  attachTag?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAttachTagArgs, "cardId" | "tagId">
  >
  changePassword?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, "oldPassword" | "newPassword">
  >
  deleteBoard?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBoardArgs, "id">
  >
  deleteCard?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCardArgs, "id">
  >
  deleteCheckList?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCheckListArgs, "id">
  >
  deleteList?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteListArgs, "id">
  >
  deleteTag?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagArgs, "id">
  >
  deleteTask?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, "id">
  >
  deleteTemplate?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTemplateArgs, "id">
  >
  deleteUser?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, "id">
  >
  detachTag?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDetachTagArgs, "cardId" | "tagId">
  >
  forgotPassword?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationForgotPasswordArgs, "email">
  >
  login?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >
  logout?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>
  register?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >
  resetPassword?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, "token" | "newPassword">
  >
  updateBoard?: Resolver<
    Maybe<ResolversTypes["Board"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBoardArgs, "id" | "input">
  >
  updateCard?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCardArgs, "id" | "input">
  >
  updateCheckList?: Resolver<
    Maybe<ResolversTypes["CheckList"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCheckListArgs, "id" | "input">
  >
  updateList?: Resolver<
    Maybe<ResolversTypes["List"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateListArgs, "id" | "input">
  >
  updateTag?: Resolver<
    Maybe<ResolversTypes["Tag"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagArgs, "id" | "input">
  >
  updateTask?: Resolver<
    Maybe<ResolversTypes["Task"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "id" | "input">
  >
  updateTemplate?: Resolver<
    Maybe<ResolversTypes["Template"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTemplateArgs, "id" | "input">
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "id" | "input">
  >
}>

export type BoardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Board"] = ResolversParentTypes["Board"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  template?: Resolver<Maybe<ResolversTypes["Template"]>, ParentType, ContextType>
  tasks?: Resolver<Maybe<Array<ResolversTypes["Task"]>>, ParentType, ContextType>
  lists?: Resolver<Maybe<Array<ResolversTypes["List"]>>, ParentType, ContextType>
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  isArchived?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  dueDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  desc?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  checkLists?: Resolver<Maybe<Array<ResolversTypes["CheckList"]>>, ParentType, ContextType>
  tags?: Resolver<Maybe<Array<ResolversTypes["Tag"]>>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type CheckListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CheckList"] = ResolversParentTypes["CheckList"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  tasks?: Resolver<Maybe<Array<ResolversTypes["Task"]>>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes["Boolean"]>, "_", ParentType, ContextType>
}>

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date"
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time"
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime"
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void"
}

export type ListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["List"] = ResolversParentTypes["List"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  cards?: Resolver<Maybe<Array<ResolversTypes["Card"]>>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  startDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  endDate?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type TemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Template"] = ResolversParentTypes["Template"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  desc?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  author?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>
  boards?: Resolver<Maybe<Array<ResolversTypes["Board"]>>, ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Board?: BoardResolvers<ContextType>
  Card?: CardResolvers<ContextType>
  CheckList?: CheckListResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Date?: GraphQLScalarType
  Time?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  Void?: GraphQLScalarType
  List?: ListResolvers<ContextType>
  Tag?: TagResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
  Template?: TemplateResolvers<ContextType>
  User?: UserResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
