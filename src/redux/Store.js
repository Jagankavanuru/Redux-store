import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slice/LoginSlice';
export const Store = configureStore({
    reducer: { login: loginReducer }
});