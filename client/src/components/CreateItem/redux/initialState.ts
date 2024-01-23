import {EItemTypeProp} from '../../../types/types';
import {EName, IInitialState} from './types';

export const initialState: IInitialState = {
  [EName.NAME]: '',
  [EName.IMAGE]: {image: null, imageUrl: ''},
  [EName.TITLE]: '',
  [EName.ID]: undefined,

  [EItemTypeProp.STR]: [],
  [EItemTypeProp.BOOL]: [],
  [EItemTypeProp.INT]: [],
  [EItemTypeProp.TEXT]: [],
  [EItemTypeProp.DATE]: [],
};
