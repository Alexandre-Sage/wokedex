const baseUrl = "http://localhost:4447";
const urlRegistry = {
  wokemons: {
    base: `${baseUrl}/wokemons`,
    postImages: (id: string) => `${baseUrl}/wokemons/images/${id}`,
    getById: (id: string) => `${baseUrl}/wokemons/${id}`,
  },
  types: {
    base: `${baseUrl}/types`,
  },
  attack: {
    base: `${baseUrl}/attacks`,
  },
};
export { urlRegistry };
