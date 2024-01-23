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

  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputBox: {
    display: 'flex',
    alignItems: 'flex-start',
    mt: 2,
  },

  firstInput: {
    width: '100%',
    mr: 2,
  },

  secondInput: {
    width: '100%',
  },
};
