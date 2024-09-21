import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';// Use import instead of require

const router = Router();

router.post('/addreview', reviewController.addReview);
router.get('/allReviews', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router; // Export the router using ES module syntax
