import { useEffect, useState } from 'react';
import api from '../api';

const useFetchSpecies = (region: string, page: number = 0, category: string, className: string) => {
  const [data, setData] = useState<any>([]);
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
