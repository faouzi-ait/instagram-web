import { apiSlice } from '../apiBaseService/baseApiQuery';

export const apiPostListing = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ searchTerm, page, pageSize = 2 }) => {
        const queryParams = new URLSearchParams({
          q: searchTerm,
          page,
          pageSize,
        });
        return `/listing-posts?${queryParams.toString()}`;
      },
      providesTags: ['Posts', 'Post', 'Search'],
      keepUnusedDataFor: 1,
      refetchOnMountOrArgChange: true,
    }),
    getSinglePost: builder.query({
      query: (id) => `/single-post/${id}`,
      providesTags: ['Post', 'Posts', 'User', 'Search'],
      keepUnusedDataFor: 1,
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/like-post/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: '/new-post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post', 'Search', 'User'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/delete-posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'User', 'Search'],
    }),
    favoritePost: builder.mutation({
      query: (id) => ({
        url: `/favorite-post/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Post', 'Posts', 'User', 'Search'],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: '/reviews',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Post', 'Search'],
    }),
    userFavoritePost: builder.mutation({
      query: (id) => ({
        url: `/user-likes/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Post', 'User'],
    }),
    viewedPost: builder.mutation({
      query: (id) => ({
        url: `/viewed-post/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Post', 'Search'],
    }),
  }),
  onError: (error /*, { dispatch, getState }*/) => {
    // console.error('Global error handler:', error);
  },
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useGetSinglePostDataQuery,
  useCreatePostMutation,
  useCreateReviewMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useViewedPostMutation,
  useFavoritePostMutation,
  useUserFavoritePostMutation,
} = apiPostListing;
