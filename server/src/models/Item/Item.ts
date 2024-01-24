import {UploadedFile} from 'express-fileupload';
import memoizee from 'memoizee';
import {IOptions} from '../../types/types';
import {Item as ItemMapping} from '../mapping';
import FileService from '../../services/FileService';
import {createdUpdated} from '../createdUpdated';
import {IData} from './types';
import {createProps} from './createProps';

class Item {
  constructor() {
    this.allItemsLength = memoizee(this.allItemsLength);
  }

  async allItemsLength() {
    const length = await ItemMapping.count();

    return length;
  }

  async getAll(options: IOptions) {
    const {limit, page} = options;
    const offset = page * limit;
    const items = await ItemMapping.findAll({
      offset,
      limit,
    });

    return {items, numberOfRecords: await this.allItemsLength()};
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

    createProps(collectionId, data, item.id);

    return item;
  }

  async getAllById(collectionId: string) {
    const where = {collectionId};
    const items = await ItemMapping.findAll({where, attributes: {exclude: createdUpdated}});

    return items;
  }
}

export default new Item();
