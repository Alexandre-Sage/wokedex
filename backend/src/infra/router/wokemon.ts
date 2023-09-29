import { Router } from "express";
import { httpStatus } from "../../modules/http";
import { createWokemon, getAllWokemon } from "../../domain/services";
import { ZodWokemon, zoddValidation } from "../../domain/validation";

const router = Router();
const urlPrefix = "/wokemons";

router.post(`${urlPrefix}`, async (req, res, next) => {
  try {
    // const validation = await zoddPartialApplication(ZodWokemon);
    const validated = await zoddValidation(ZodWokemon, req.body.payload);
    await createWokemon(req.database, validated);
    res.status(httpStatus.CREATE).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get(`${urlPrefix}`, async (req, res, next) => {
  try {
    const wokemons = await getAllWokemon(req.database);
    res.status(httpStatus.GET).json({
      success: true,
      payload: wokemons,
    });
  } catch (error) {
    next(error);
  }
});

export { router as wokemonRouter };
