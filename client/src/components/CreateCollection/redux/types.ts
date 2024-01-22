import {IImage} from '../../../types/types';

export interface IInitialState {
  [EName.NAME]: string;
  [EName.DESCRIPTION]: string;
  [EName.THEME]: string;
  [EName.VISIBLE]: boolean;
  [EName.PROPS]: string[];
  [EName.IMAGE]: IImage;
  [EName.TITLE]: string;
  [EName.ID]?: number | undefined;
}

export enum EName {
  NAME = 'name',
  DESCRIPTION = 'description',
  THEME = 'theme',
  IMAGE = 'image',
  VISIBLE = 'visible',
  PROPS = 'props',
  TITLE = 'title',
  ID = 'id',
}
