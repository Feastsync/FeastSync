import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from '../features/authslice'
import userReducer from '../features/userslice'
import vendorReducer from '../features/vendorslice'
import bookingReducer from '../features/Bookingslice'

const customStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
}
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  vendor: vendorReducer,
  booking: bookingReducer,
})

const rootReducer = (state, action) => {
  if (
    action.type === 'auth/logout' ||
    action.type === 'auth/logout/fulfilled'
  ) {
    state = undefined
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: customStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)