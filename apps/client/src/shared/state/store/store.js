import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/es/storage';

import userReducer from '@/features/auth/state/slices/userSlice.js';

import { AuthenticationApi } from '@/features/auth/state/redux-api/Authentication.api';
import { AdminApi } from '@/features/Roles/admin/state/redux-api/admin.api';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedUserReducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(AuthenticationApi.middleware, AdminApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
