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

export type GetSavedPostsOutput = {
  list: Array<PostSave>;
  total: Scalars['Int'];
};

export type LikeMutationOutput = {
  post: Post;
  user: User;
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
  createPostMention: PostMention;
  createPostTag: PostTag;
  createTag: Tag;
  createUser: LoginOutput;
  deletePost: Scalars['Int'];
  removeFollower: RemoveFollowerOutput;
  removePostMention: PostMention;
  removePostTag: PostTag;
  removeTag: Tag;
  reportPost: PostReport;
  toggleFollow: FollowMutationOutput;
  toggleLike: PostLike;
  toggleSavePost: PostSave;
  updatePost: Post;
  updatePostMention: PostMention;
  updatePostTag: PostTag;
  updateSelf: User;
  updateTag: Tag;
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<CreatePostInput>;
  medias?: InputMaybe<Array<Scalars['Upload']>>;
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


export type MutationDeletePostArgs = {
  postId?: InputMaybe<Scalars['Float']>;
};


export type MutationRemoveFollowerArgs = {
  followerId: Scalars['Int'];
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


export type MutationToggleLikeArgs = {
  postId: Scalars['Float'];
};


export type MutationToggleSavePostArgs = {
  postId: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  input?: InputMaybe<UpdatePostInput>;
  medias?: InputMaybe<Array<Scalars['Upload']>>;
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
  likes: PostLikeOutput;
  medias: Array<PostMedia>;
  parents: PostPaginationOuput;
  replies: PostPaginationOuput;
  reports: GetPostReportsOutput;
  user: User;
};


export type PostLikesArgs = {
  input?: InputMaybe<PostLikeInput>;
};


export type PostParentsArgs = {
  input?: InputMaybe<PostPaginationInput>;
};


export type PostRepliesArgs = {
  input?: InputMaybe<PostPaginationInput>;
};


export type PostReportsArgs = {
  input?: InputMaybe<GetPostReportsInput>;
};

export type PostLike = {
  createdAt: Scalars['DateTime'];
  post: Post;
  user: User;
};

export type PostLikeInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PostLikeOutput = {
  list: Array<User>;
  total: Scalars['Int'];
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

export type PostPaginationInput = {
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PostPaginationOuput = {
  list: Array<Post>;
  total: Scalars['Int'];
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

export type PostSave = {
  createdAt: Scalars['DateTime'];
  post: Post;
  user: User;
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
  isLikedPost: Scalars['Boolean'];
  isSavedPost: Scalars['Boolean'];
  login: LoginOutput;
  me: User;
  post: Post;
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


export type QueryIsLikedPostArgs = {
  postId: Scalars['Int'];
};


export type QueryIsSavedPostArgs = {
  postId: Scalars['Int'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryPostArgs = {
  postId: Scalars['Int'];
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
  reportPost: PostReport;
  toggle_like: LikeMutationOutput;
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
  /** Get user post */
  savedPost: GetSavedPostsOutput;
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


export type UserSavedPostArgs = {
  input?: InputMaybe<GetPostsInput>;
};

export type ReportPostSubSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ReportPostSubSubscription = { reportPost: { reason: string, createdAt: any, post: { id: number, author: { id: number, username: string } } } };


export const ReportPostSubDocument = gql`
    subscription ReportPostSub {
  reportPost {
    reason
    createdAt
    post {
      id
      author {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useReportPostSubSubscription__
 *
 * To run a query within a React component, call `useReportPostSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReportPostSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportPostSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useReportPostSubSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ReportPostSubSubscription, ReportPostSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<ReportPostSubSubscription, ReportPostSubSubscriptionVariables>(ReportPostSubDocument, options);
      }
export type ReportPostSubSubscriptionHookResult = ReturnType<typeof useReportPostSubSubscription>;
export type ReportPostSubSubscriptionResult = Apollo.SubscriptionResult<ReportPostSubSubscription>;