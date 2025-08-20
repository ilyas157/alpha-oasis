import {
  getTestimonials,
  getTestimonialById,
  sendTestimonial,
  deleteTestimonials,
  updateTestimonials,
} from '../controllers/testimonialsController.js';

import { Router } from 'express';
const router = Router();
router.get('/testimonials', getTestimonials);
router.get('/testimonials/:id', getTestimonialById);
router.post('/testimonials', sendTestimonial);
router.delete('/testimonials/:id', deleteTestimonials);
router.put('/testimonials/:id', updateTestimonials);
export default router;
