import {Router} from 'express';
import {
  getDestinations,
  getDestinationsById,
  createDestination,
  updateDestinationById,
  deleteDestination,
} from '../controllers/destinationsController.js';


const router = Router();



router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationsById);
router.post('/destinations', createDestination);
router.put('/destinations/:id', updateDestinationById);
router.delete('/destinations/:id', deleteDestination);

export default router;