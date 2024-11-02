import { createSelector } from "@reduxjs/toolkit";
import { selectPostsState,  } from "./postSlice";

export const selectPosts = createSelector([selectPostsState], (postsState)=>postsState.posts)

export const selectPostsCurrentResult = createSelector([selectPostsState], (postState)=>postState.currentResult)
export const selectPostsStatus = createSelector([selectPostsState], (postsState) => postsState.status);

