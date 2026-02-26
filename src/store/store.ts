import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dataReducer from '@/features/dataSlice';
import uiReducer from '@/features/uiSlice';
import themeReducer from '@/features/themeSlice';

export const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
  theme: themeReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
