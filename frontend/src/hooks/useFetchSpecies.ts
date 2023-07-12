import { useEffect, useState } from 'react';
import api from '../api';
import { SpeciesType, SpeciesTypeResponse } from '@/types/SpeciesType';

const useFetchSpecies = (region: string, page: number = 1, category: string, className: string) => {
  const [data, setData] = useState<SpeciesTypeResponse>({
    count: 0,
    species: [],
    page: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const response = await api.getSpecies(region, page, category, className);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError('Error fetching table data');
        setLoading(false);
      }
    };

    fetchTableData();
  }, [region, page, category, className]);

  return { data, loading, error };
};

export default useFetchSpecies;
