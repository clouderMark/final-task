import {theme} from '../../styles/theme';

const tabletSize = 767;
const mobileSize = 575;

export const card = {
  card: {
    width: '31.66%',
    marginBottom: '40px',
    borderRadius: 0,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.first.main,
    },
    [`@media (max-width: ${tabletSize}px)`]: {
      width: '48.5%',
    },
    [`@media (max-width: ${mobileSize}px)`]: {
      width: '100%',
    },
  },
  img: {
    width: '100%',
    height: '230px',
    [`@media (max-width: ${tabletSize}px)`]: {
      maxHeight: '246px',
    },
    [`@media (max-width: ${mobileSize}px)`]: {
      maxHeight: '372px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '31px 21px 22px 28px',
  },
  title: {
    margin: '0 0 25px',
    fontSize: '27px',
    fontWeight: 500,
  },
  '@media (min-width: 767px)': {
    card: {
      width: '47.7%',
    },
  },
};
