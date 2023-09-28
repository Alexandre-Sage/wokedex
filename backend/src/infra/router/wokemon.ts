import { Router } from "express";
import { httpStatus } from "../../modules/http";
import { createWokemon } from "../../domain/services";

const router = Router();
const urlPrefix = "/wokemons";

router.post(`${urlPrefix}`, async (req, res) => {
 console.log(req.body) 
 try {
    await createWokemon(req.database, req.body.payload);
    res.status(httpStatus.CREATE).json({
      success: true,
    });
  } catch (error) {
    throw error;
  }
});

export { router as wokemonRouter };
