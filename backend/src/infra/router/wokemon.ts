import { randomUUID } from "crypto";
import { Router } from "express";
import { mkdir, stat } from "fs";
import multer from "multer";
import {
  create,
  getAll,
  getById,
  createImage,
} from "../../domain/services/wokemon";
import { ZodWokemon, zoddValidation } from "../../domain/validation";
import { httpStatus } from "../../modules/http";
import { createImages } from "../repositories";
const router = Router();
const urlPrefix = "/wokemons";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const wokemon = await getById(req.database, req.params.id);
    const wokemonName = wokemon.name.split(" ").join("-");
    const originalName = file.originalname.split(".");
    stat(`${process.env.FILE_DIR}/${wokemonName}`, (err, stat) => {
      if (err) {
        mkdir(`${process.env.FILE_DIR}/${wokemonName}`, (err) => {
          if (err) throw err;
        });
      }
      cb(null, `${process.env.FILE_DIR}/${wokemonName}`);
    });
  },
  filename: async (req, file, cb) => {
    const wokemon = await getById(req.database, req.params.id);
    const wokemonName = wokemon.name.split(" ").join("-");
    const originalName = file.originalname.split(".");
    const name = originalName[0];
    const suffix = originalName[originalName.length - 1];
    const imageId = randomUUID();
    req.tmp = imageId;
    await createImages(req.database, {
      createdAt: new Date(),
      path: `${wokemonName}/${name}-${imageId}.${suffix}`,
      id: imageId,
    });
    cb(null, `${name}-${imageId}.${suffix}`);
  },
});

const file = multer({
  // dest: "./",
  storage: storage,
});

router.post(`${urlPrefix}`, async (req, res, next) => {
  const { height, weight, ...wokemon } = req.body.payload.wokemon;
  try {
    const validated = await zoddValidation(ZodWokemon, {
      ...wokemon,
      height: parseInt(height),
      weight: parseInt(weight),
    });
    const { id } = await create(
      req.database,
      validated,
      req.body.payload.types
    );
    res.status(httpStatus.CREATE).json({
      success: true,
      payload: { id },
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
});

router.get(`${urlPrefix}`, async (req, res, next) => {
  try {
    const wokemons = await getAll(req.database);
    res.status(httpStatus.GET).json({
      success: true,
      payload: wokemons,
    });
  } catch (error) {
    next(error);
  }
});

router.get(`${urlPrefix}/:id`, async (req, res, next) => {
  try {
    const wokemon = await getById(req.database, req.params.id);
    res.status(httpStatus.GET).json({
      success: true,
      payload: wokemon,
    });
  } catch (error) {
    next(error);
  }
});
router.post(
  `${urlPrefix}/images/:id`,
  multer({
    storage: storage,
  }).single("wokemonImage"),
  async (req, res, next) => {
    try {
      await createImage(req.database, req.params.id, req.tmp);
      res.json({
        success: true,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }
);
export { router as wokemonRouter };
