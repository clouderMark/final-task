import {EItemTypeProp, IImage, IParagraphs} from '../../../types/types';

export interface IInitialState {
  [EName.NAME]: string;
  [EName.IMAGE]: IImage;
  [EName.TITLE]: string;
  [EName.ID]?: number | undefined;
  [EItemTypeProp.STR]: IParagraphs<string>[];
  [EItemTypeProp.BOOL]: IParagraphs<boolean>[];
  [EItemTypeProp.INT]: IParagraphs<number>[];
  [EItemTypeProp.TEXT]: IParagraphs<string>[];
  [EItemTypeProp.DATE]: IParagraphs<string>[];
}

export enum EName {
  NAME = 'name',
  IMAGE = 'image',
  TITLE = 'title',
  ID = 'id',
}
