import { useEffect, useState } from 'react';
import api from '../api';
import { RegionType } from '../types/RegionType';
const useFetchRegions = () => {
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchRegions = async () => {
      try {
        const data = await api.getRegions();
        setRegions(data);
      } catch (error) {
        setError('Error fetching regions');
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);
  return { regions, loading, error };
};

export default useFetchRegions;
