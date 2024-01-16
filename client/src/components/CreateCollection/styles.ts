const mobile = 850;

export const styles = {
  box: {
    display: 'flex',

    [`@media (max-width: ${mobile}px)`]: {
      flexDirection: 'column',
    },
  },

  imgBox: {
    width: '335px',
    mr: 2,

    [`@media (max-width: ${mobile}px)`]: {
      width: '100%',
    },
  },

  switch: {
    ml: 'auto',
    width: '140px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};
