import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },
  link: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&hover': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
  },
}));

export default useStyles;
