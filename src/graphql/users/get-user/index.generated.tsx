import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type UserQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, roles: Array<{ __typename?: 'RoleWithoutUser', level: string, label: string }>, profile: { __typename?: 'ProfileWithoutUser', displayname?: string | null, bio?: string | null, profilePicture?: string | null, backroundPicture?: string | null } } };


export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    id
    username
    email
    createdAt
    roles {
      level
      label
    }
    profile {
      displayname
      bio
      profilePicture
      backroundPicture
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;