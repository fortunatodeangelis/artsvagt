import useFetchSpecies from '@/hooks/useFetchSpecies';
import {
  Table,
  Container,
  Skeleton,
  Pagination,
  ScrollArea,
  Badge,
  Button,
} from '@mantine/core';
import { memo, useState } from 'react';
import useStyles from './TableSpecies.styles';
import { SpeciesType } from '@/types/SpeciesType';
import { classSpecies, category } from '@/utils';
import { FileSearch } from 'tabler-icons-react';
import Link from 'next/link';

interface TableSpeciesProps {
  region: string;
}

function TableSpecies({ region }: TableSpeciesProps) {
  const { classes, cx } = useStyles();
  const [page, setPage] = useState(0);
  const { data, loading, error } = useFetchSpecies(region, page);

  if (error) {
    return <div>{error}</div>;
  }

  const ths = (
    <tr>
      <th>Class Name</th>
      <th>Scientific Name</th>
      <th>Category</th>
      <th>&ensp;</th>
    </tr>
  );

  return (
    <Container>
      <ScrollArea h={500}>
        <Table h={500} striped highlightOnHover withBorder>
          <thead className={classes.header}>{ths}</thead>
          <tbody>
            {loading
              ? [...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton height={10} mt={6} radius="xl" />
                    </td>
                    <td>
                      <Skeleton height={10} mt={6} radius="xl" />
                    </td>
                    <td>
                      <Skeleton height={10} mt={6} radius="xl" />
                    </td>
                    <td>
                      <Skeleton height={10} mt={6} radius="xl" />
                    </td>
                  </tr>
                ))
              : data.result.map((species: SpeciesType, index: number) => (
                  <tr key={index}>
                    <td>
                      {classSpecies[species.class_name] +
                        ' ' +
                        species.class_name}
                    </td>
                    <td>{species.scientific_name}</td>
                    <td>
                      <Badge
                        color={
                            category[species.category]
                            ? category[species.category]['color']
                            : 'gray'
                        }
                        variant="outline"
                      >
                        {category[species.category]
                          ? category[species.category]['text']
                          : species.category}
                      </Badge>
                    </td>
                    <td>
                      <Link
                        href={`/species/${species.scientific_name}-${region}`}
                      >
                        <Button
                          variant="outline"
                          leftIcon={<FileSearch size="1rem" />}
                        >
                          View Data
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </ScrollArea>
      <Pagination
        size={'md'}
        total={2}
        siblings={1}
        color="dark"
        mt="xl"
        withControls={false}
        defaultValue={1}
        onChange={(value) => setPage(value - 1)}
      />
    </Container>
  );
}

export default memo(TableSpecies);
