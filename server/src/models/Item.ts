import {UploadedFile} from 'express-fileupload';
import util from 'util';
import {EItemTypeProp, IOptions, IParagraphs} from '../types/types';
import {
  ItemBoolProps,
  ItemDateProps,
  ItemIntProps,
  Item as ItemMapping,
  ItemPropType,
  ItemStrProps,
  ItemTextProps,
} from './mapping';
import FileService from '../services/FileService';

interface IData {
  name: string;
  strProps: string;
  boolProps: string;
  intProps: string;
  textProps: string;
  dateProps: string;
  collectionId: string;
}

class Item {
  async getAll(options: IOptions) {
    const {limit, page} = options;
    const offset = page * limit;
    const length = await ItemMapping.count();
    const items = await ItemMapping.findAll({
      offset,
      limit,
    });

    return {items, numberOfRecords: length};
  }

  async create(data: IData, img: UploadedFile | UploadedFile[] | undefined) {
    const {name = '', collectionId = ''} = data;
    let image = '';

    if (img && !(img instanceof Array)) {
      image = await FileService.upload(img);
    }

    const item = await ItemMapping.create({
      name,
      image,
      collectionId: +collectionId,
    });

    const where = {collectionId: +collectionId};
    const propsType = await ItemPropType.findAll({where});

    if (propsType.length) {
      propsType.forEach(async (type) => {
        const {value} = type;

        if (value === EItemTypeProp.STR && data.strProps) {
          const props: IParagraphs<string>[] = JSON.parse(data.strProps);

          for (const prop of props) {
            await ItemStrProps.create({
              name: prop.key,
              value: prop.value,
              itemId: item.id,
            });
          }
        } else if (value === EItemTypeProp.BOOL && data.boolProps) {
          const props: IParagraphs<boolean>[] = JSON.parse(data.boolProps);

          for (const prop of props) {
            await ItemBoolProps.create({
              name: prop.key,
              value: prop.value,
              itemId: item.id,
            });
          }
        } else if (value === EItemTypeProp.INT && data.intProps) {
          const props: IParagraphs<number>[] = JSON.parse(data.intProps);

          for (const prop of props) {
            await ItemIntProps.create({
              name: prop.key,
              value: prop.value,
              itemId: item.id,
            });
          }
        } else if (value === EItemTypeProp.TEXT && data.textProps) {
          const props: IParagraphs<string>[] = JSON.parse(data.textProps);

          for (const prop of props) {
            await ItemTextProps.create({
              name: prop.key,
              value: prop.value,
              itemId: item.id,
            });
          }
        } else if (value === EItemTypeProp.DATE && data.dateProps) {
          const props: IParagraphs<string>[] = JSON.parse(data.dateProps);

          for (const prop of props) {
            const date = new Date(prop.value);

            if (util.types.isDate(date)) {
              await ItemDateProps.create({
                name: prop.key,
                value: date,
                itemId: item.id,
              });
            }
          }
        }
      });
    }

    return item;
  }
}

export default new Item();
