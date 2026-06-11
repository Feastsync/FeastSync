import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageModule from 'redux-persist/lib/storage';

import authReducer from '../features/authslice';
import userReducer from '../features/userslice';
import vendorReducer from '../features/vendorslice';

const storage = storageModule.default || storageModule;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  vendor: vendorReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'vendor'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);