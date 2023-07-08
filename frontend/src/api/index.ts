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
  getSpecies: async (region: string, page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getspecies?region=${region}&page=${page}`,
        {}
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default api;
