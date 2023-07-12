export type SpeciesType = {
  taxonid: number;
  class_name: string;
  scientific_name: string;
  category: string;
};

export type SpeciesTypeResponse = {
  count: number;
  species: SpeciesType[];
  page: number;
  pages: number;
};