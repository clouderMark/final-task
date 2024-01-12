import {EItemTypeProp, IOptions, TId} from '../../types/types';
import {Collection as CollectionMapping, ItemPropType} from '../mapping';
import {IData} from './types';
import {allCollectionsAttributes, collectionInclude} from './value';

class Collection {
  async getAll(options: IOptions) {
    const {limit, page} = options;
    const offset = page * limit;
    const length = await CollectionMapping.count();
    const collections = await CollectionMapping.findAll({
      offset,
      limit,
      attributes: allCollectionsAttributes,
    });

    return {collections, numberOfRecords: length};
  }

  async getOne(id: TId) {
    const collection = await CollectionMapping.findByPk(id, collectionInclude);

    if (!collection) {
      throw new Error('Коллекция не найдена в БД');
    }

    return collection;
  }

  async create(data: IData, userId: TId) {
    const {name = '', description = '', theme = '', visible = true, image = ''} = data;

    const collection = await CollectionMapping.create({
      name,
      description,
      theme,
      visible,
      image,
      userId,
    });

    if (data.itemPropType) {
      let itemPropType: Array<string | EItemTypeProp> = JSON.parse(data.itemPropType);
      const typeProps = Object.values(EItemTypeProp) as string[];

      itemPropType = itemPropType.filter((el) => typeProps.indexOf(el) >= 0);

      for (const prop of itemPropType) {
        await ItemPropType.create({
          value: prop as EItemTypeProp,
          collectionId: collection.id,
        });
      }
    }

    const created = await CollectionMapping.findByPk(collection.id, collectionInclude);

    return created;
  }

  async update(id: TId, data: IData, userId: TId) {
    const where = {id, userId};
    const collection = await CollectionMapping.findOne({where});

    if (!collection) {
      throw new Error('Коллекция не найдена в БД');
    }

    const {
      name = collection.name,
      description = collection.description,
      theme = collection.theme,
      visible = collection.visible,
      image = collection.image,
    } = data;

    await collection.update({
      name,
      description,
      theme,
      visible,
      image,
    });

    if (data.itemPropType) {
      await ItemPropType.destroy({where: {collectionId: id}});
      let itemPropType: Array<string | EItemTypeProp> = JSON.parse(data.itemPropType);
      const typeProps = Object.values(EItemTypeProp) as string[];

      itemPropType = itemPropType.filter((el) => typeProps.indexOf(el) >= 0);

      for (const prop of itemPropType) {
        await ItemPropType.create({
          value: prop as EItemTypeProp,
          collectionId: collection.id,
        });
      }
    }

    return collection;
  }

  async delete(id: TId, userId: TId) {
    const where = {id, userId};
    const collection = await CollectionMapping.findOne({where});

    if (!collection) {
      throw new Error('Коллекция не найдена в БД');
    }

    await collection.destroy();

    return collection;
  }
}

export default new Collection();
