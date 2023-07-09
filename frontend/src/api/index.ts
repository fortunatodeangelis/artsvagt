import axios from 'axios';

const api = {
  getRegions: async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/regions', {});
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getSpecies: async (
    region: string,
    page: number,
    category: string,
    className: string
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getspecies?region=${region}&page=${page}&category=${category}&class=${className}`,
        {}
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getThreats: async (region: string, taxonId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getthreats?region=${region}&speciesId=${taxonId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default api;
