import {
  getHebergement,
  getHebergementById,
  createHebergement,
  deleteHebergement,
  updateHebergement,
  deleteAll,
  seedHebergement
} from '../controllers/hebergementController.js';
import {HebergementQueryValidSchema, PostHebergementValidSchema} from '../validators/hebergementValidator.js';
import { validateBody, validateQuery } from '../middlewares/validateData.js';
import toMongoFilters from '../middlewares/hebergement/parsefilters.js';
import { Router } from 'express';

const router = Router();

router.get('/hebergement', validateQuery(HebergementQueryValidSchema),toMongoFilters,getHebergement);
router.get('/hebergement/:id', getHebergementById);
router.post(
  '/hebergement',
  validateBody(PostHebergementValidSchema),
  createHebergement
);
router.delete('/hebergement/:id', deleteHebergement);
router.put(
  '/hebergement/:id',
  //validateBody(PostHebergementValidSchema),
  updateHebergement
);
router.delete('/hebergement', deleteAll);
router.post('/hebergement/seed', seedHebergement);
export default router;


const querying = "name=marr&room[roomType]=double&room[bedtype]=twin&room[price]=400&services=gym,spa,pet_friendly&status=libre"