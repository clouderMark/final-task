import {IImage} from '../../../types/types';

export interface IInitialState {
  [EName.NAME]: string;
  [EName.DESCRIPTION]: string;
  [EName.THEME]: string;
  [EName.VISIBLE]: boolean;
  [EName.PROPS]: string[];
  [EName.IMAGE]: IImage;
}

export enum EName {
  NAME = 'name',
  DESCRIPTION = 'description',
  THEME = 'theme',
  IMAGE = 'image',
  VISIBLE = 'visible',
  PROPS = 'props',
}
