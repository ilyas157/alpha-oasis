import {
  getHotels,
  getHotelsById,
  createHotel,
  updateHotel,
  deleteAll,
  seedHotels,
} from '../controllers/hotelsController.js';
import { Router } from 'express';
import {createHotelValidSchema ,getHotelValidSchema} from '../validators/hotelValidator.js';
import parseHotel from '../middlewares/hotels/parseHotel.js';
import { validateFilters, validateBody } from '../middlewares/validateData.js';
import toMongooseFilters from '../middlewares/hotels/toMongooseFilters.js';
const router = Router();

router.get(
  '/hotels',
  parseHotel,
  validateFilters(getHotelValidSchema),
  toMongooseFilters,
  getHotels
);
router.get('/hotels/:id', getHotelsById);
router.put('/hotels/:id',validateBody(createHotelValidSchema), updateHotel);
router.post('/hotels', validateBody(createHotelValidSchema), createHotel);

router.delete('/hotels/deleteAll', deleteAll);
router.post('/hotels/seed', seedHotels);
export default router;
