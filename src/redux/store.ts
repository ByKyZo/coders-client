import api from '@redux/api';
import counterReducer from '@redux/reducers/counter.reducer';
import userReducer from '@redux/reducers/user.reducer';
import {
  configureStore,
  DeepPartial,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const reducers = {
  user: userReducer,
  counter: counterReducer,
  [api.reducerPath]: api.reducer,
};

// Initialise le store, aussi utiliser pour la custom function render() (react testing library) avec redux pour les tests : @helpers/test
export function initStore(preloadedState?: TPreloadedState) {
  return configureStore({
    reducer: reducers,
    // @ts-ignore
    preloadedState,
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
}

// Initialise le store de l'application
export const store = initStore();

// Refetch les données , au focus de la fenetre et à la connexion rétablie (redux RTK query)
setupListeners(store.dispatch);

export type TPreloadedState = DeepPartial<RootState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = StateFromReducersMapObject<typeof reducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
