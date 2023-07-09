import { useState } from 'react';
import { Header, Group, ActionIcon, Container } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';
import { Logo } from '../Logo/Logo';
import useStyles from './HeaderNav.styles';
import Link from 'next/link';

export function HeaderNav() {
  const { classes } = useStyles();

  return (
    <Header height={56} mb={120}>
      <Container className={classes.inner}>
        <Link href="/">
          <Logo />
        </Link>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <Link
              className={classes.link}
              href="https://github.com/fortunatodeangelis/artsvagt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandGithub size="1.1rem" />
            </Link>
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}
