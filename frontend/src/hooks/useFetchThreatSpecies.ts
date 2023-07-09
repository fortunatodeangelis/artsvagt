import { useEffect, useState } from 'react';
import api from '../api';

const useFetchThreatSpecies = (region: string, taxonId: number) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       
        const response = await api.getThreats(region, taxonId);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError('Error fetching table data');
        setLoading(false);
      }
    };
    if (taxonId !== null) {
        fetchData();
    }
  }, [region, taxonId]);

  return { data, loading, error };
};

export default useFetchThreatSpecies;
