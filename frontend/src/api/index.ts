import axios from 'axios';

console.log(process);
const api = {
  getRegions: async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/regions`, {});
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
        `${process.env.API_URL}/getspecies?region=${region}&page=${page}&category=${category}&class=${className}`,
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
        `${process.env.API_URL}/getthreats?region=${region}&speciesId=${taxonId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default api;
