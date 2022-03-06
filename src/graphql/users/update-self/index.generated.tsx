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

export type UpdateSelfMutationVariables = Types.Exact<{
  update: Types.UpdateUserInput;
}>;


export type UpdateSelfMutation = { __typename?: 'Mutation', updateSelf: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, roles: Array<{ __typename?: 'RoleWithoutUser', level: string, label: string }>, profile: { __typename?: 'ProfileWithoutUser', displayname?: string | null, bio?: string | null } } };


export const UpdateSelfDocument = gql`
    mutation UpdateSelf($update: UpdateUserInput!) {
  updateSelf(update: $update) {
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
    }
  }
}
    `;
export type UpdateSelfMutationFn = Apollo.MutationFunction<UpdateSelfMutation, UpdateSelfMutationVariables>;

/**
 * __useUpdateSelfMutation__
 *
 * To run a mutation, you first call `useUpdateSelfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSelfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSelfMutation, { data, loading, error }] = useUpdateSelfMutation({
 *   variables: {
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpdateSelfMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSelfMutation, UpdateSelfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSelfMutation, UpdateSelfMutationVariables>(UpdateSelfDocument, options);
      }
export type UpdateSelfMutationHookResult = ReturnType<typeof useUpdateSelfMutation>;
export type UpdateSelfMutationResult = Apollo.MutationResult<UpdateSelfMutation>;
export type UpdateSelfMutationOptions = Apollo.BaseMutationOptions<UpdateSelfMutation, UpdateSelfMutationVariables>;