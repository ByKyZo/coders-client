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
  update: UpdateUserInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  user: User;
};

export type ProfileWithoutUser = {
  __typename?: 'ProfileWithoutUser';
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
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
  bio?: InputMaybe<Scalars['String']>;
  displayname?: InputMaybe<Scalars['String']>;
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

export type LoginQueryVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', accessToken: string, user: { __typename?: 'User', id: number, username: string, roles: Array<{ __typename?: 'RoleWithoutUser', level: string, label: string }> } } };


export const LoginDocument = gql`
    query Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      id
      username
      roles {
        level
        label
      }
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;