import util from 'util';
import {EItemTypeProp, IParagraphs} from '../../types/types';
import {ItemBoolProps, ItemDateProps, ItemIntProps, ItemPropType, ItemStrProps, ItemTextProps} from '../mapping';
import {IProps} from './types';

export const createProps = async (collectionId: string, data: IProps, itemId: number) => {
  const where = {collectionId: +collectionId};
  const propsType = await ItemPropType.findAll({where});

  if (propsType.length) {
    propsType.forEach(async (type) => {
      const {value} = type;

      if (value === EItemTypeProp.STR && data.strProps) {
        const props: IParagraphs<string>[] = JSON.parse(data.strProps);
        let count = 0;

        for (const prop of props) {
          if (count < 3) {
            await ItemStrProps.create({
              name: prop.key,
              value: prop.value,
              itemId,
            });
          }

          count++;
        }
      } else if (value === EItemTypeProp.BOOL && data.boolProps) {
        const props: IParagraphs<boolean>[] = JSON.parse(data.boolProps);
        let count = 0;

        for (const prop of props) {
          if (count < 3) {
            await ItemBoolProps.create({
              name: prop.key,
              value: prop.value,
              itemId,
            });
          }

          count++;
        }
      } else if (value === EItemTypeProp.INT && data.intProps) {
        const props: IParagraphs<number>[] = JSON.parse(data.intProps);
        let count = 0;

        for (const prop of props) {
          if (count < 3) {
            await ItemIntProps.create({
              name: prop.key,
              value: prop.value,
              itemId,
            });
          }

          count++;
        }
      } else if (value === EItemTypeProp.TEXT && data.textProps) {
        const props: IParagraphs<string>[] = JSON.parse(data.textProps);
        let count = 0;

        for (const prop of props) {
          if (count < 3) {
            await ItemTextProps.create({
              name: prop.key,
              value: prop.value,
              itemId,
            });
          }

          count++;
        }
      } else if (value === EItemTypeProp.DATE && data.dateProps) {
        const props: IParagraphs<string>[] = JSON.parse(data.dateProps);
        let count = 0;

        for (const prop of props) {
          if (count < 3) {
            const date = new Date(prop.value);

            if (util.types.isDate(date)) {
              await ItemDateProps.create({
                name: prop.key,
                value: date,
                itemId,
              });
            }
          }

          count++;
        }
      }
    });
  }
};
