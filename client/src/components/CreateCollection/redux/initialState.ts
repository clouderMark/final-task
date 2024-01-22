import {EName, IInitialState} from './types';

export const initialState: IInitialState = {
  [EName.NAME]: '',
  [EName.DESCRIPTION]: '',
  [EName.THEME]: '',
  [EName.VISIBLE]: true,
  [EName.PROPS]: [],
  [EName.IMAGE]: {image: null, imageUrl: ''},
  [EName.TITLE]: '',
  [EName.ID]: undefined,
};
