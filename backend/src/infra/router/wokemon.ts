import { Router } from "express";
import { create, getAll, getById } from "../../domain/services";
import { ZodWokemon, zoddValidation } from "../../domain/validation";
import { httpStatus } from "../../modules/http";

const router = Router();
const urlPrefix = "/wokemons";

router.post(`${urlPrefix}`, async (req, res, next) => {
  try {
    const validated = await zoddValidation(ZodWokemon, req.body.payload);
    await create(req.database, validated);
    res.status(httpStatus.CREATE).json({
      success: true,
    });
  } catch (error) {
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
