import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { reducers, store } from './index';

export type AppRootState = ReturnType<typeof reducers>;
export type AppDispatch = ThunkDispatch<AppRootState, any, Action<string>>;
export type GetStateType = () => AppRootState;
export type AppGetState = ReturnType<typeof store.getState>;
export type AppAction = {
  type: string;
  data?: object | string | number | boolean;
};

export interface IAction<T> {
  type: string;
  data?: T;
}
