import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { storage } from './persistConfig';
import authReducer from './auth/reducer'
import supportReducer from './support/reducer'

// 🔹 Combina slice reducers
const rootReducer = combineReducers({
  auth: authReducer,
  support: supportReducer
});

// 🔹 Config persist
const persistConfig = {
  key: 'root',
  storage,           // ✅ storage differenziato web/mobile
  whitelist: ['auth'] // persiste solo auth
};

// 🔹 Applica persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Crea store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// 🔹 Persistor
export const persistor = persistStore(store);

// 🔹 Reset automatico della persistenza al logout (se auth.isLoggedIn diventa false)
store.subscribe(() => {
  const state = store.getState() as any
  if (state.auth && state.auth.isLoggedIn === false) {
    persistor.purge() // cancella sessione persistita
  }
})

// Tipi utili per TS (ignorali se usi JS puro)
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
