import { Router } from "express";
import { ZodWokemon, zoddValidation } from "../../domain/validation";
import { httpStatus } from "../../modules/http";
import { create, getAll, getById } from "../../domain/services/wokemon";

const router = Router();
const urlPrefix = "/wokemons";

router.post(`${urlPrefix}`, async (req, res, next) => {
  console.log({ re: req.body });
  try {
    const validated = await zoddValidation(
      ZodWokemon,
      req.body.payload.wokemon
    );
    await create(req.database, validated, req.body.payload.types);
    res.status(httpStatus.CREATE).json({
      success: true,
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

export { router as wokemonRouter };
