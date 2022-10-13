import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_Reducer';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware ],
  })
