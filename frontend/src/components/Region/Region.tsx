import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
} from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
import useStyles from './Region.styles';

interface RegionProps extends UnstyledButtonProps {
  image: string;
  name: string;
  identifier: string;
  readonly?: boolean;
}

export function Region({ name, identifier, image, readonly }: RegionProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.region}>
      <Group>
        <Avatar src={image} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {identifier}
          </Text>
        </div>
        { !readonly && <ChevronRight size="0.9rem" />}
      </Group>
    </UnstyledButton>
  );
}
