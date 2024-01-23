import {EField} from '../../types/types';
import {createdUpdated} from '../createdUpdated';
import {ItemPropType} from '../mapping';

export const allCollectionsAttributes = [EField.ID, EField.NAME, EField.IMAGE, EField.THEME];

export const collectionInclude = {
  include: [
    {
      model: ItemPropType,
      attributes: [EField.VALUE],
    },
  ],
  attributes: {
    exclude: createdUpdated,
  },
};
