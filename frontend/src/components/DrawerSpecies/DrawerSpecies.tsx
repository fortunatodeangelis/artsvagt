import { Drawer, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import useFetchThreatSpecies from '@/hooks/useFetchThreatSpecies';

interface DrawerSpeciesProps {
  openDrawer: boolean;
  region: string;
  taxonId: number | null;
  closeDrawer: () => void;
}

function DrawerSpecies({
  openDrawer,
  closeDrawer,
  region,
  taxonId,
}: DrawerSpeciesProps) {
  const [opened, { open, close }] = useDisclosure(openDrawer);
  const { data, loading, error } = useFetchThreatSpecies(region, taxonId || 0);

  useEffect(() => {
    if (openDrawer) {
      open();
    } else {
      close();
    }
  }, [openDrawer]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => {
          closeDrawer();
          close();
        }}
        title={'Threat - ' + region + ' ' + taxonId}
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        {loading
          ? [...Array(4)].map((_, index) => (
              <div key={'skeleton' + index}>
                <Skeleton height={10} mt={6} radius="xl" />
                <br />
              </div>
            ))
          : data.data &&
            data.data
              .split('\\n')
              .map((value: string, index: number) => (
                <Text key={'text' + index}>{value}</Text>
              ))}
      </Drawer>
    </>
  );
}

export default DrawerSpecies;
