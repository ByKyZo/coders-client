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
  /** Raw generated by Draft.js */
  draftRaw?: InputMaybe<Scalars['String']>;
  isFollowOnly?: InputMaybe<Scalars['Boolean']>;
  postParentId?: InputMaybe<Scalars['Int']>;
};

export type CreatePostMediaInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePostMentionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePostTagInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateTagInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FeedInput = {
  options?: InputMaybe<FeedOptions>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FeedOptions = {
  excludeFollowing?: InputMaybe<Scalars['Boolean']>;
};

export type FeedOuput = {
  list: Array<Post>;
  total: Scalars['Int'];
};

export type FindAllPostInput = {
  options?: InputMaybe<FindAllPostOptions>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FindAllPostOptions = {
  page?: InputMaybe<Scalars['Int']>;
};

export type FindAllPostOutput = {
  list: Array<Post>;
  total: Scalars['Int'];
};

export type FindAllPostReportInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FindAllPostReportOutput = {
  list?: Maybe<Array<PostReport>>;
  total?: Maybe<Scalars['Int']>;
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

export type GetPostReportsInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type GetPostReportsOutput = {
  list: Array<PostReport>;
  total: Scalars['Int'];
};

export type GetPostsInput = {
  options?: InputMaybe<GetPostsOptions>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type GetPostsOptions = {
  onlyWithMedia?: InputMaybe<Scalars['Boolean']>;
};

export type GetPostsOutput = {
  list: Array<Post>;
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
  createPostMention: PostMention;
  createPostTag: PostTag;
  createTag: Tag;
  createUser: LoginOutput;
  removeFollower: RemoveFollowerOutput;
  removePostMedia: PostMedia;
  removePostMention: PostMention;
  removePostTag: PostTag;
  removeTag: Tag;
  reportPost: PostReport;
  toggleFollow: FollowMutationOutput;
  updatePost: Post;
  updatePostMedia: PostMedia;
  updatePostMention: PostMention;
  updatePostTag: PostTag;
  updateSelf: User;
  updateTag: Tag;
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<CreatePostInput>;
  medias?: InputMaybe<Array<Scalars['Upload']>>;
};


export type MutationCreatePostMediaArgs = {
  createPostMediaInput: CreatePostMediaInput;
};


export type MutationCreatePostMentionArgs = {
  createPostMentionInput: CreatePostMentionInput;
};


export type MutationCreatePostTagArgs = {
  createPostTagInput: CreatePostTagInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveFollowerArgs = {
  followerId: Scalars['Int'];
};


export type MutationRemovePostMediaArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePostMentionArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePostTagArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['Int'];
};


export type MutationReportPostArgs = {
  input: PostReportInput;
};


export type MutationToggleFollowArgs = {
  followingId: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  input?: InputMaybe<UpdatePostInput>;
  medias?: InputMaybe<Array<Scalars['Upload']>>;
};


export type MutationUpdatePostMediaArgs = {
  updatePostMediaInput: UpdatePostMediaInput;
};


export type MutationUpdatePostMentionArgs = {
  updatePostMentionInput: UpdatePostMentionInput;
};


export type MutationUpdatePostTagArgs = {
  updatePostTagInput: UpdatePostTagInput;
};


export type MutationUpdateSelfArgs = {
  backgroundPictureFile?: InputMaybe<Scalars['Upload']>;
  profilePictureFile?: InputMaybe<Scalars['Upload']>;
  update?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateTagArgs = {
  updateTagInput: UpdateTagInput;
};

export type Post = {
  author: User;
  createdAt: Scalars['DateTime'];
  /** Raw generated by Draft.js */
  draftRaw?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isFollowOnly?: Maybe<Scalars['Boolean']>;
  medias: Array<PostMedia>;
  postParentId?: Maybe<Scalars['Int']>;
  reports: GetPostReportsOutput;
  user: User;
};


export type PostReportsArgs = {
  input?: InputMaybe<GetPostReportsInput>;
};

export type PostMedia = {
  id: Scalars['Int'];
  path: Scalars['String'];
  post: Post;
};

export type PostMention = {
  post: Post;
  user: User;
};

export type PostReport = {
  createdAt: Scalars['DateTime'];
  post: Post;
  reason: Scalars['String'];
  user: User;
};

export type PostReportInput = {
  postId: Scalars['Float'];
  reason: Scalars['String'];
};

export type PostTag = {
  post: Post;
  tag: Tag;
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
  feed: FeedOuput;
  isFollow: Scalars['Boolean'];
  login: LoginOutput;
  me: User;
  postMedia: PostMedia;
  postMention: PostMention;
  postReport: FindAllPostReportOutput;
  postTag: PostTag;
  posts: FindAllPostOutput;
  rememberMe: LoginOutput;
  tag: Tag;
  user: User;
  users: FindAllUserOutput;
};


export type QueryFeedArgs = {
  input?: InputMaybe<FeedInput>;
};


export type QueryIsFollowArgs = {
  followerId: Scalars['Int'];
  followingId: Scalars['Int'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryPostMediaArgs = {
  id: Scalars['Int'];
};


export type QueryPostMentionArgs = {
  id: Scalars['Int'];
};


export type QueryPostReportArgs = {
  input?: InputMaybe<FindAllPostReportInput>;
};


export type QueryPostTagArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  input?: InputMaybe<FindAllPostInput>;
};


export type QueryTagArgs = {
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
  level: Scalars['Int'];
  users: User;
};

export type RoleWithoutUser = {
  label: Scalars['String'];
  level: Scalars['Int'];
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

export type Tag = {
  createdAt: Scalars['DateTime'];
  tag: Scalars['String'];
};

export type UpdatePostInput = {
  /** Raw generated by Draft.js */
  draftRaw?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isFollowOnly?: InputMaybe<Scalars['Boolean']>;
  mediasRemovedIds?: InputMaybe<Array<Scalars['Int']>>;
  postParentId?: InputMaybe<Scalars['Int']>;
};

export type UpdatePostMediaInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePostMentionInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePostTagInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateTagInput = {
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
  posts: GetPostsOutput;
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
  input?: InputMaybe<GetPostsInput>;
};

export type PostsQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  input?: Types.InputMaybe<Types.GetPostsInput>;
}>;


export type PostsQuery = { user: { posts: { total: number, list: Array<{ id: number, draftRaw?: string | null, postParentId?: number | null, isFollowOnly?: boolean | null, createdAt: any, medias: Array<{ id: number, path: string }>, author: { id: number, username: string, profile: { profilePicture?: string | null, displayname?: string | null } } }> } } };


export const PostsDocument = gql`
    query Posts($username: String!, $input: GetPostsInput) {
  user(username: $username) {
    posts(input: $input) {
      total
      list {
        id
        draftRaw
        postParentId
        isFollowOnly
        createdAt
        medias {
          id
          path
        }
        author {
          id
          username
          profile {
            profilePicture
            displayname
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;