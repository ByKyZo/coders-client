export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  removeAccount: User;
  updateAccount: User;
};


export type MutationCreateUserArgs = {
  displayname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveAccountArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAccountArgs = {
  updateAccountInput: UpdateAccountInput;
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<User>;
  login: LoginOutput;
  user: User;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type UpdateAccountInput = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};
