export const baseUrl = "http://0.0.0.0:4447";
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
    getById: (id: string) => `${baseUrl}/attacks/${id}`,

  },
};
export { urlRegistry };
