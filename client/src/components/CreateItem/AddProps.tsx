import {ChangeEvent} from 'react';
import {Box, Switch} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  appendBool,
  appendDate,
  appendInt,
  appendStr,
  appendText,
  changeKeyBool,
  changeKeyDate,
  changeKeyInt,
  changeKeyStr,
  changeKeyText,
  changeValueBool,
  changeValueDate,
  changeValueInt,
  changeValueStr,
  changeValueText,
  removeBool,
  removeDate,
  removeInt,
  removeStr,
  removeText,
  selectItem,
} from './redux/createItemSlice';
import ThemedTextField from '../ThemedTextField';
import {EItemTypeProp} from '../../types/types';
import ThemedTypography from '../ThemedTypography';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import {selectCollection} from '../../redux/collectionApi';
import {styles} from './styles';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';

const AddProps = () => {
  const {str, bool, int, text, date} = useAppSelector(selectItem);
  const {itemPropTypes} = useAppSelector(selectCollection);
  const dispatch = useAppDispatch();
  const {lang} = useAppSelector(selectLang);

  return (
    <Box sx={{flexGrow: 1}}>
      {itemPropTypes.includes(EItemTypeProp.STR) ? (
        <>
          <Box sx={styles.title}>
            <ThemedTypography component="span">
              {content[lang].item.addString}
            </ThemedTypography>
            <AddButton action={appendStr} />
          </Box>
          {str.map((el) => (
            <Box sx={styles.inputBox} key={el.unique}>
              <ThemedTextField
                value={el.key}
                onChange={(e) => dispatch(changeKeyStr({key: e.target.value, unique: el.unique}))}
                multiline
                rows={2}
                sx={styles.firstInput}
              />
              <ThemedTextField
                value={el.value}
                onChange={(e) => dispatch(changeValueStr({value: e.target.value, unique: el.unique}))}
                multiline
                rows={2}
                sx={styles.secondInput}
              />
              <DeleteButton action={removeStr} payload={el.unique} />
            </Box>
          ))}
        </>
      ) : null}
      {itemPropTypes.includes(EItemTypeProp.BOOL) ? (
        <>
          <Box sx={styles.title}>
            <ThemedTypography component="span">{content[lang].item.addBool}</ThemedTypography>
            <AddButton action={appendBool} />
          </Box>
          {bool.map((el) => (
            <Box sx={styles.inputBox} key={el.unique}>
              <ThemedTextField
                value={el.key}
                onChange={(e) => dispatch(changeKeyBool({key: e.target.value, unique: el.unique}))}
                sx={styles.firstInput}
              />
              <Switch
                checked={el.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(changeValueBool({value: e.target.checked, unique: el.unique}))
                }
              />
              <DeleteButton action={removeBool} payload={el.unique} />
            </Box>
          ))}
        </>
      ) : null}
      {itemPropTypes.includes(EItemTypeProp.INT) ? (
        <>
          <Box sx={styles.title}>
            <ThemedTypography component="span">{content[lang].item.addInt}</ThemedTypography>
            <AddButton action={appendInt} />
          </Box>
          {int.map((el) => (
            <Box sx={styles.inputBox} key={el.unique}>
              <ThemedTextField
                value={el.key}
                onChange={(e) => dispatch(changeKeyInt({key: e.target.value, unique: el.unique}))}
                sx={styles.firstInput}
              />
              <ThemedTextField
                value={el.value}
                onChange={(e) => dispatch(changeValueInt({value: +e.target.value, unique: el.unique}))}
                type="number"
                sx={styles.secondInput}
              />
              <DeleteButton action={removeInt} payload={el.unique} />
            </Box>
          ))}
        </>
      ) : null}
      {itemPropTypes.includes(EItemTypeProp.TEXT) ? (
        <>
          <Box sx={styles.title}>
            <ThemedTypography component="span">{content[lang].item.addText}</ThemedTypography>
            <AddButton action={appendText} />
          </Box>
          {text.map((el) => (
            <Box sx={styles.inputBox} key={el.unique}>
              <ThemedTextField
                value={el.key}
                onChange={(e) => dispatch(changeKeyText({key: e.target.value, unique: el.unique}))}
                multiline
                rows={4}
                sx={styles.firstInput}
              />
              <ThemedTextField
                value={el.value}
                onChange={(e) => dispatch(changeValueText({value: e.target.value, unique: el.unique}))}
                multiline
                rows={4}
                sx={styles.secondInput}
              />
              <DeleteButton action={removeText} payload={el.unique} />
            </Box>
          ))}
        </>
      ) : null}
      {itemPropTypes.includes(EItemTypeProp.DATE) ? (
        <>
          <Box sx={styles.title}>
            <ThemedTypography component="span">{content[lang].item.addDate}</ThemedTypography>
            <AddButton action={appendDate} />
          </Box>
          {date.map((el) => (
            <Box sx={styles.inputBox} key={el.unique}>
              <ThemedTextField
                value={el.key}
                onChange={(e) => dispatch(changeKeyDate({key: e.target.value, unique: el.unique}))}
                sx={styles.firstInput}
              />
              <ThemedTextField
                value={el.value}
                onChange={(e) => dispatch(changeValueDate({value: e.target.value, unique: el.unique}))}
                type="date"
                sx={styles.secondInput}
              />
              <DeleteButton action={removeDate} payload={el.unique} />
            </Box>
          ))}
        </>
      ) : null}
    </Box>
  );
};

export default AddProps;
