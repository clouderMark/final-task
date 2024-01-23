import database from 'sequelize';
import {
  ERole,
  IUserModel,
  EField,
  ICollectionModel,
  IItemModel,
  ITagModel,
  IItemIntModel,
  IItemStrModel,
  IItemBoolModel,
  IItemDateModel,
  IItemPropType,
  EItemTypeProp,
} from '../types/types';
import sequelize from '../sequelize';

const {DataTypes} = database;

const id = {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true};

const User = sequelize.define<IUserModel>(
  'user',
  {
    id,
    [EField.EMAIL]: {type: DataTypes.STRING, unique: true},
    [EField.PASSWORD]: {type: DataTypes.STRING},
    [EField.NAME]: {type: DataTypes.STRING, unique: true, allowNull: false},
    [EField.ROLE]: {type: DataTypes.ENUM(ERole.ADMIN, ERole.USER), defaultValue: ERole.USER},
    [EField.ISBLOCKED]: {type: DataTypes.BOOLEAN, defaultValue: false},
  },
  {},
);

const Collection = sequelize.define<ICollectionModel>('collection', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.DESCRIPTION]: {type: DataTypes.TEXT, allowNull: false},
  [EField.THEME]: {type: DataTypes.STRING, allowNull: false},
  [EField.IMAGE]: {type: DataTypes.STRING, allowNull: false},
  [EField.VISIBLE]: {type: DataTypes.BOOLEAN, defaultValue: true},
});

const ItemPropType = sequelize.define<IItemPropType>('item_prop_type', {
  id,
  [EField.VALUE]: {
    type: DataTypes.ENUM(...Object.values(EItemTypeProp)),
    defaultValue: EItemTypeProp.NULL,
    allowNull: false,
  },
});

const Item = sequelize.define<IItemModel>('item', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.IMAGE]: {type: DataTypes.STRING, allowNull: false},
});

const Tag = sequelize.define<ITagModel>('tag', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const ItemIntProps = sequelize.define<IItemIntModel>('item__int_prop', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.VALUE]: {type: DataTypes.INTEGER, allowNull: false},
});

const ItemStrProps = sequelize.define<IItemStrModel>('item__str_prop', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.VALUE]: {type: DataTypes.STRING, allowNull: false},
});

const ItemTextProps = sequelize.define<IItemStrModel>('item__text_prop', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.VALUE]: {type: DataTypes.TEXT, allowNull: false},
});

const ItemBoolProps = sequelize.define<IItemBoolModel>('item__bool_prop', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.VALUE]: {type: DataTypes.BOOLEAN, allowNull: false},
});

const ItemDateProps = sequelize.define<IItemDateModel>('item__date_prop', {
  id,
  [EField.NAME]: {type: DataTypes.STRING, allowNull: false},
  [EField.VALUE]: {type: DataTypes.DATE, allowNull: false},
});

User.hasMany(Collection, {onDelete: 'CASCADE'});
Collection.belongsTo(User);

Collection.hasMany(Item, {onDelete: 'CASCADE'});
Item.belongsTo(Collection);
Collection.hasMany(ItemPropType, {onDelete: 'CASCADE'});
ItemPropType.belongsTo(Collection);

Item.hasMany(Tag, {onDelete: 'CASCADE'});
Tag.belongsTo(Item);

Item.hasMany(ItemIntProps, {onDelete: 'CASCADE'});
ItemIntProps.belongsTo(Item);
Item.hasMany(ItemStrProps, {onDelete: 'CASCADE'});
ItemStrProps.belongsTo(Item);
Item.hasMany(ItemTextProps, {onDelete: 'CASCADE'});
ItemTextProps.belongsTo(Item);
Item.hasMany(ItemBoolProps, {onDelete: 'CASCADE'});
ItemBoolProps.belongsTo(Item);
Item.hasMany(ItemDateProps, {onDelete: 'CASCADE'});
ItemDateProps.belongsTo(Item);

export {
  User,
  Collection,
  ItemPropType,
  Item,
  Tag,
  ItemIntProps,
  ItemStrProps,
  ItemTextProps,
  ItemBoolProps,
  ItemDateProps,
};
