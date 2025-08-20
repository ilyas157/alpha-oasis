import { Router } from 'express';
import { getVoyage, createVoyage, getVoyageByID, deleteVoyage, deleteAll, updateVoyage, getVoyageByIDNonP, getVoyageBasic } from '../controllers/voyageController.js';
import { validateBody, validateVoyageQuery } from '../middlewares/validateData.js';
import { PostVoyageValidSchema, VoyageQueryValidSchema , PutVoyageValidSchema} from '../validators/voyageValidator.js';
import toMongoFilters from '../middlewares/voyage/parsefilters.js';
const router = Router();

router.get("/voyage/", validateVoyageQuery(VoyageQueryValidSchema), toMongoFilters, getVoyage);
router.get("/voyage/admin", validateVoyageQuery(VoyageQueryValidSchema),toMongoFilters ,getVoyageBasic)
router.get("/voyage/:id", getVoyageByID);

router.get("/voyage/nonpopulated/:id", getVoyageByIDNonP);
router.post("/voyage/",  createVoyage);

router.patch(
  '/voyage/:id',
  //validateBody(PutVoyageValidSchema),
  updateVoyage
);

router.delete("/voyage/:id", deleteVoyage);
router.delete('/voyage/', deleteAll);
export default router;



//validateBody(PostVoyageValidSchema),