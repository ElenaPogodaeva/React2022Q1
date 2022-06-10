import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice';
import detailReducer from '../features/detailSlice';
import formReducer from '../features/formSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    form: formReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
