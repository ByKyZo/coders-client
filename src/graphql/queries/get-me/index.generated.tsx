import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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

export type CreatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  isFollowOnly?: InputMaybe<Scalars['Boolean']>;
  postParentId?: InputMaybe<Scalars['Int']>;
};

export type CreatePostMediaInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FindAllPostOutput = {
  list: Array<Post>;
  total: Scalars['Int'];
};

export type FindAllUserInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FindAllUserOutput = {
  total: Scalars['Int'];
  users: Array<User>;
};

export type FollowInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FollowMutationOutput = {
  follower: User;
  following: User;
};

export type FollowOutput = {
  list: Array<User>;
  total: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  createPost: Post;
  createPostMedia: PostMedia;
  createUser: LoginOutput;
  removeFollower: RemoveFollowerOutput;
  removePost: Post;
  removePostMedia: PostMedia;
  toggleFollow: FollowMutationOutput;
  updatePost: Post;
  updatePostMedia: PostMedia;
  updateSelf: User;
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<CreatePostInput>;
  medias?: InputMaybe<Array<Scalars['Upload']>>;
};


export type MutationCreatePostMediaArgs = {
  createPostMediaInput: CreatePostMediaInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveFollowerArgs = {
  followerId: Scalars['Int'];
};


export type MutationRemovePostArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePostMediaArgs = {
  id: Scalars['Int'];
};


export type MutationToggleFollowArgs = {
  followingId: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdatePostMediaArgs = {
  updatePostMediaInput: UpdatePostMediaInput;
};


export type MutationUpdateSelfArgs = {
  backgroundPictureFile?: InputMaybe<Scalars['Upload']>;
  profilePictureFile?: InputMaybe<Scalars['Upload']>;
  update?: InputMaybe<UpdateUserInput>;
};

export type Post = {
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isFollowOnly?: Maybe<Scalars['Boolean']>;
  medias: Array<PostMedia>;
  postParentId?: Maybe<Scalars['Int']>;
  user: User;
};

export type PostMedia = {
  id: Scalars['Int'];
  path: Scalars['String'];
  post: Post;
};

export type Profile = {
  backroundPicture?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  profilePicture?: Maybe<Scalars['String']>;
  user: User;
};

export type ProfileWithoutUser = {
  backroundPicture?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type Query = {
  isFollow: Scalars['Boolean'];
  login: LoginOutput;
  me: User;
  post: Post;
  postMedia: PostMedia;
  rememberMe: LoginOutput;
  user: User;
  users: FindAllUserOutput;
};


export type QueryIsFollowArgs = {
  followerId: Scalars['Int'];
  followingId: Scalars['Int'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostMediaArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<FindAllUserInput>;
};

export type RemoveFollowerOutput = {
  userId: Scalars['Int'];
};

export type Role = {
  label: Scalars['String'];
  level: Scalars['String'];
  users: User;
};

export type RoleWithoutUser = {
  label: Scalars['String'];
  level: Scalars['String'];
};

export type SubUpdateProfileInput = {
  backroundPicture?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  displayname?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  follow: FollowMutationOutput;
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isFollowOnly?: InputMaybe<Scalars['Boolean']>;
  postParentId?: InputMaybe<Scalars['Int']>;
};

export type UpdatePostMediaInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  isFollow?: InputMaybe<Scalars['Boolean']>;
  profile?: InputMaybe<SubUpdateProfileInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  followers: FollowOutput;
  followings: FollowOutput;
  id: Scalars['Int'];
  isFollow: Scalars['Boolean'];
  /** Get user post */
  posts: FindAllPostOutput;
  /** Get user profile */
  profile: ProfileWithoutUser;
  roles: Array<RoleWithoutUser>;
  username: Scalars['String'];
};


export type UserFollowersArgs = {
  input?: InputMaybe<FollowInput>;
};


export type UserFollowingsArgs = {
  input?: InputMaybe<FollowInput>;
};


export type UserPostsArgs = {
  input?: InputMaybe<FollowInput>;
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: number, username: string, email: string, createdAt: any, followings: { total: number }, followers: { total: number }, profile: { displayname?: string | null, bio?: string | null, profilePicture?: string | null, backroundPicture?: string | null }, roles: Array<{ level: string, label: string }> } };


export const MeDocument = gql`
    query Me {
  me {
    id
    username
    followings {
      total
    }
    followers {
      total
    }
    profile {
      displayname
      bio
      profilePicture
      backroundPicture
    }
    email
    createdAt
    roles {
      level
      label
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;