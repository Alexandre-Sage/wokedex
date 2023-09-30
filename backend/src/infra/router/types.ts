import { Router } from "express";
import { getAll, getById } from "../../domain/services/types";
import { indexBy, prop } from "ramda";
import { typeById } from "../database/base/baseType";

const router = Router();
const urlPrefix = "/types";

router.get(`${urlPrefix}`, async (req, res, next) => {
  try {
    const types = await getAll(req.database);
    res.json({
      success: true,
      payload: types,
    });
  } catch (error) {
    next(error);
  }
});

router.get(`${urlPrefix}/:id`, async (req, res, next) => {
  try {
    const type = await getById(req.database, req.params.id);
    res.json({
      payload: type,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

export { router as typesRouter };
