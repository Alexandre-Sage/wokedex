import { create, getAll, getOne } from ".";
import {
  Image,
  ImageId,
  ImageRow,
  Transaction,
  WokemonId,
  WokemonImage,
} from "../../domain/types";

const table = "images";
const wokemon_images_table = "wokemons_images";
const createImages = (database: Transaction, image: Image) =>
  create(database, {
    table,
    data: image,
  });

const getImageById = (database: Transaction, id: ImageId) =>
  getOne<Image, ImageRow>(database, {
    table,
    where: {
      columnName: "id",
      searchValue: id,
      operator: "=",
    },
  });
const getWokemonImages = async (
  database: Transaction,
  wokemonId: WokemonId
) => {
  const wokemonImages = await getAll<WokemonImage>(database, {
    table: wokemon_images_table,
    where: {
      columnName: "wokemon_id",
      searchValue: wokemonId,
      operator: "=",
    },
  });
  return Promise.all(
    wokemonImages.map(({ imageId }) => getImageById(database, imageId))
  );
};
export { createImages, getWokemonImages, getImageById };
