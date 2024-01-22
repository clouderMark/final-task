import {IOptions} from 'src/types/types';
import {Item as ItemMapping} from './mapping';

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
}

export default new Item();
