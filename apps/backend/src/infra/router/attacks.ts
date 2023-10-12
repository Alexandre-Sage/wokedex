import { Router } from "express";
import { getAll, getById } from "../../domain/services/attacks";

const router = Router();
const urlPrefix = "/attacks";

router.get(`${urlPrefix}`, async (req, res, next) => {
  try {
    const attacks = await getAll(req.database);
    res.json({
      success: true,
      payload: attacks,
    });
  } catch (error) {
    next(error);
  }
});

router.get(`${urlPrefix}/:id`, async (req, res, next) => {
  try {
    const attack = await getById(req.database, req.params.id);
    res.json({
      payload: attack,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

export { router as attackRouter };
