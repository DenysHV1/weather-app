import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { weatherReducer } from "./weather/slice";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "weather",
  storage,
};

const persistedWeatherReducer = persistReducer(persistConfig, weatherReducer);

export const store = configureStore({
  reducer: {
    weather: persistedWeatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
