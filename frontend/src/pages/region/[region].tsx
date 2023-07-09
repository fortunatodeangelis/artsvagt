import Head from 'next/head';
import { HeaderNav } from '@/components/HeaderNav/HeaderNav';
import { useRouter } from 'next/router';
import TableSpecies from '@/components/TableSpecies/TableSpecies';
import DrawerSpecies from '@/components/DrawerSpecies/DrawerSpecies';
import { useState } from 'react';

const RegionPage = () => {
  const router = useRouter();
  const { region } = router.query;
  const [selectedTaxonId, setSelectedTaxonId] = useState<number | null>(null);

  if (region === undefined) {
    return <div>Regione non valida</div>;
  }

  const handleOpenDrawer = (speciesId: number) => {
    setSelectedTaxonId(speciesId);
  };

  const handleCloseDrawer = () => {
    setSelectedTaxonId(null);
  };

  return (
    <>
      <Head>
        <title>ArtSvagt - Species Vulnerability Assessment Tool</title>
        <meta
          name="description"
          content="ArtSvagt, Species Vulnerability Assessment Tool"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderNav />
      <TableSpecies
        region={region.toString()}
        handleOpenDrawer={handleOpenDrawer}
      />

      <DrawerSpecies
        region={region.toString()}
        taxonId={selectedTaxonId}
        openDrawer={selectedTaxonId !== null}
        closeDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default RegionPage;
