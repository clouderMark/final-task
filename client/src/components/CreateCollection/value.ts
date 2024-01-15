import {EItemTypeProp, ELang, IImage} from '../../types/types';
import {IValue} from '../ThemedMultiSelect';
import {content} from '../content/content';
import {EName, IDefaultValue} from './types';

export const defaultValue: IDefaultValue = {
  [EName.NAME]: '',
  [EName.DESCRIPTION]: '',
  [EName.THEME]: '',
  [EName.VISIBLE]: true,
};

export const imgeDefaultValue: IImage = {image: null, imageUrl: ''};

export const propsTypeValues: IValue[] = [
  {
    value: EItemTypeProp.STR,
    name: {
      [ELang.ENG]: content[ELang.ENG].string,
      [ELang.BEL]: content[ELang.BEL].string,
    },
  },
  {
    value: EItemTypeProp.BOOL,
    name: {
      [ELang.ENG]: content[ELang.ENG].bool,
      [ELang.BEL]: content[ELang.BEL].bool,
    },
  },
  {
    value: EItemTypeProp.INT,
    name: {
      [ELang.ENG]: content[ELang.ENG].int,
      [ELang.BEL]: content[ELang.BEL].int,
    },
  },
  {
    value: EItemTypeProp.TEXT,
    name: {
      [ELang.ENG]: content[ELang.ENG].text,
      [ELang.BEL]: content[ELang.BEL].text,
    },
  },
  {
    value: EItemTypeProp.DATE,
    name: {
      [ELang.ENG]: content[ELang.ENG].date,
      [ELang.BEL]: content[ELang.BEL].date,
    },
  },
];
