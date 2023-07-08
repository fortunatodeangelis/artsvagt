const classSpecies: any = {
  GASTROPODA: '🐌',
  ACTINOPTERYGII: '🐟',
  MAMMALIA: '🐘',
  INSECTA: '🐞',
  REPTILIA: '🐍',
  AMPHIBIA: '🐸',
  CHONDRICHTHYES: '🦈',
  ANTHOZOA: '🐠',
  CEPHALASPIDOMORPHI: '🐡',
  BIVALVIA: '🦪',
  MALACOSTRACA: '🦞',
  PINOPSIDA: '🌲',
  MAGNOLIOPSIDA: '🌸',
  LILIOPSIDA: '🌾',
  BRYOPSIDA: '🌿',
  JUNGERMANNIOPSIDA: '🍀',
  ANTHOCEROTOPSIDA: '🌺',
  MARCHANTIOPSIDA: '🍄',
  LYCOPODIOPSIDA: '🌿',
  POLYPODIOPSIDA: '🌿',
  SPHAGNOPSIDA: '🌿',
  POLYTRICHOPSIDA: '🌿',
  MYXINI: '🐍',
  GNETOPSIDA: '🌿',
};

const category: any = {
  EX: { text: 'Extinct', color: 'red' },
  EW: { text: 'Extinct in the Wild', color: 'red' },
  CR: { text: 'Critically Endangered', color: 'red' },
  EN: { text: 'Endangered', color: 'red' },
  NT: { text: 'Near Threatened', color: 'yellow' },
  LC: { text: 'Least Concern', color: 'gray' },
  DD: { text: 'Data Deficient', color: 'gray' },
  NE: { text: 'Not Evaluated', color: 'gray' },
};

export { classSpecies, category };