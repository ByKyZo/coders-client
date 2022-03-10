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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FindAllUserInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FindAllUserOutput = {
  __typename?: 'FindAllUserOutput';
  total: Scalars['Int'];
  users: Array<User>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: LoginOutput;
  updateSelf: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateSelfArgs = {
  backgroundPictureFile?: InputMaybe<Scalars['Upload']>;
  profilePictureFile?: InputMaybe<Scalars['Upload']>;
  update?: InputMaybe<UpdateUserInput>;
};

export type Profile = {
  __typename?: 'Profile';
  backroundPicture?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  user: User;
};

export type ProfileWithoutUser = {
  __typename?: 'ProfileWithoutUser';
  backroundPicture?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  login: LoginOutput;
  me: User;
  rememberMe: LoginOutput;
  user: User;
  users: FindAllUserOutput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<FindAllUserInput>;
};

export type Role = {
  __typename?: 'Role';
  label: Scalars['String'];
  level: Scalars['String'];
  users: User;
};

export type RoleWithoutUser = {
  __typename?: 'RoleWithoutUser';
  label: Scalars['String'];
  level: Scalars['String'];
};

export type SubUpdateProfileInput = {
  backroundPicture?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  displayname?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<SubUpdateProfileInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  profile: ProfileWithoutUser;
  roles: Array<RoleWithoutUser>;
  username: Scalars['String'];
};
