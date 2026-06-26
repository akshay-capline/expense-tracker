import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth : authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch