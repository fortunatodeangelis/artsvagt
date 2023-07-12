import useFetchSpecies from '@/hooks/useFetchSpecies';
import {
  Table,
  Container,
  Skeleton,
  Pagination,
  ScrollArea,
  Badge,
  Button,
  Grid,
  Select,
  ActionIcon,
} from '@mantine/core';
import { useState } from 'react';
import useStyles from './TableSpecies.styles';
import { SpeciesType } from '@/types/SpeciesType';
import { classSpecies, category } from '@/utils';
import { FileSearch } from 'tabler-icons-react';
import { Region } from '../Region/Region';

interface TableSpeciesProps {
  region: string;
  handleOpenDrawer?: (taxonId: number) => void;
}

function TableSpecies({ region, handleOpenDrawer }: TableSpeciesProps) {
  const { classes, cx } = useStyles();
  const [page, setPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data, loading, error } = useFetchSpecies(
    region,
    page,
    selectedCategory,
    selectedClass
  );

  if (error) {
    return <div>{error}</div>;
  }

  const selectClassSpecies = Object.entries(classSpecies).map(
    ([key, value]) => ({
      value: key,
      label: `${value}  ${key}`,
    })
  );

  selectClassSpecies.unshift({ value: 'all', label: 'All' });

  const selectCategory = Object.entries(category).map(([key, value]) => ({
    value: key,
    label: (value as { text: string }).text,
  }));

  selectCategory.unshift({ value: 'all', label: 'All' });

  return (
    <Container>
      <Grid mb="md">
        <Grid.Col lg={12} md={12} sm={12} xs={12}>
          <Region
            name={region}
            identifier={region}
            image={'/' + region + '.png'}
            readonly={true}
          />
        </Grid.Col>
        <Grid.Col md={6} sm={6}>
          <Select
            defaultValue={'all'}
            label="Select Category"
            placeholder="Pick one"
            data={selectCategory}
            onChange={(value) => {
              setPage(1);
              setSelectedCategory(value ?? 'all');
            }}
          />
        </Grid.Col>
        <Grid.Col md={6} sm={6}>
          <Select
            defaultValue={'all'}
            label="Select Class Name"
            placeholder="Pick one"
            data={selectClassSpecies}
            onChange={(value) => {
              setPage(1);
              setSelectedClass(value ?? 'all');
            }}
          />
        </Grid.Col>
      </Grid>

      <ScrollArea h={500}>
        <Table h={500} striped highlightOnHover>
          <thead className={classes.header}>
            <tr>
              <th>Class Name</th>
              <th>Scientific Name</th>
              <th>Category</th>
              <th>&ensp;</th>
            </tr>
          </thead>
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
              : data.species.map((speciesValue: SpeciesType, index: number) => (
                  <tr key={index}>
                    <td>
                      {classSpecies[speciesValue.class_name] +
                        ' ' +
                        speciesValue.class_name}
                    </td>
                    <td>{speciesValue.scientific_name}</td>
                    <td>
                      <Badge
                        color={
                          category[speciesValue.category]
                            ? category[speciesValue.category]['color']
                            : 'gray'
                        }
                        variant="outline"
                      >
                        {category[speciesValue.category]
                          ? category[speciesValue.category]['text']
                          : speciesValue.category}
                      </Badge>
                    </td>
                    <td>
                      <ActionIcon
                        onClick={() => {
                          handleOpenDrawer &&
                            handleOpenDrawer(speciesValue.taxonid);
                        }}
                        variant="default"
                      >
                        <FileSearch size="1rem" />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </ScrollArea>
      <Pagination
        size={'md'}
        total={data.pages}
        siblings={1}
        color="dark"
        mt="xl"
        value={page}
        withControls={false}
        defaultValue={page}
        onChange={(value) => setPage(value)}
      />
    </Container>
  );
}

export default TableSpecies;
