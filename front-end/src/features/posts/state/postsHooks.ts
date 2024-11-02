import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { useEffect } from "react";
import { selectPosts, selectPostsCurrentResult } from "./postsSelector";
import { fetchPosts } from "./postSlice";
import { selectPostsStatus } from "./postsSelector";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSelectPosts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const status = useAppSelector(selectPostsStatus);

    useEffect(() => {
        if (status === 'idle' && posts.length === 0) {
            console.log("i am use effect")
            dispatch(fetchPosts());
        }
    }, [dispatch, status, posts.length]);

    return posts;
};



export const useSelectPostsCurrentResult = () => {

    return useAppSelector(selectPostsCurrentResult)
}