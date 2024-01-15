export interface IDefaultValue {
  [EName.NAME]: string;
  [EName.DESCRIPTION]: string;
  [EName.THEME]: string;
  [EName.IMAGE]: string;
  [EName.VISIBLE]: boolean;
}

export enum EName {
  NAME = 'name',
  DESCRIPTION = 'description',
  THEME = 'theme',
  IMAGE = 'image',
  VISIBLE = 'visible',
}
