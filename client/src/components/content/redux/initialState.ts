import {ELang} from '../../../types/types';
import {ELanguage, IInitialState} from './types';

export const initialState: IInitialState = {
  lang: localStorage.getItem(ELanguage.IS)
    ? JSON.parse(localStorage.getItem(ELanguage.IS)!) === ELang.BEL
      ? ELang.BEL
      : ELang.ENG
    : ELang.BEL,
};
