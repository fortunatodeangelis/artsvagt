import { Container, Grid, Title, Text, Skeleton } from '@mantine/core';
import { Region } from '@/components/Region/Region';
import useFetchRegions from '@/hooks/useFetchRegions';
import { memo } from 'react';
import { RegionType } from '@/types/RegionType';
import useStyles from './RegionsContainer.styles';
import Link from 'next/link';

function RegionsContainer() {
  const { classes } = useStyles();
  const { regions, loading, error } = useFetchRegions();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title order={2} className={classes.title} ta="center">
        Regions
      </Title>

      <Text
        c="dimmed"
        className={classes.description}
        ta="center"
        mt="md"
        mb="lg"
      >
        Select a region to get the citation for a given species assessment.
      </Text>
      <Grid gutter={20} justify="center">
        {loading
          ? [...Array(4)].map((_, index) => (
              <Grid.Col key={index} span={6}>
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Grid.Col>
            ))
          : regions.map((region: RegionType) => (
              <Grid.Col key={region.name} span={6}>
                <Link
                  className={classes.link}
                  href={`/region/${region.identifier}`}
                >
                  <Region
                    name={region.name}
                    identifier={region.identifier}
                    image={'/' + region.identifier + '.png'}
                  />
                </Link>
              </Grid.Col>
            ))}
      </Grid>
    </Container>
  );
}

export default memo(RegionsContainer);
