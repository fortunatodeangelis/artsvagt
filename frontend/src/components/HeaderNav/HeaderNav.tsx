import { useState } from 'react';
import { Header, Group, ActionIcon, Container } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';
import { Logo } from '../Logo/Logo';
import useStyles from './HeaderNav.styles';

export function HeaderNav() {
  const { classes } = useStyles();

  return (
    <Header height={56} mb={120}>
      <Container className={classes.inner}>
        <Logo />

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandGithub size="1.1rem" />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}
