import {ETheme} from '../../types/types';
import {EThemeMode, IInitialState} from './types';

export const initialState: IInitialState = {
  type: localStorage.getItem(EThemeMode.IS)
    ? JSON.parse(localStorage.getItem(EThemeMode.IS)!) === ETheme.LIGHT
      ? ETheme.LIGHT
      : ETheme.DARK
    : ETheme.LIGHT,
};
