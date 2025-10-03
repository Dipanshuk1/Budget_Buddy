import express from "express";
const router = express.Router();
import { body } from "express-validator";
import splitController from "../controllers/splitController.js";
import auth from "../middleware/auth.js";

// All routes require authentication
router.use(auth);

// Get splits
router.get('/', splitController.getSplits);

// Create split
router.post('/', [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be positive'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('splitWith').isArray({ min: 1 }).withMessage('Must split with at least one friend')
], splitController.createSplit);

// Settle up
router.post('/settle', [
  body('friendId').notEmpty().withMessage('Friend ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be positive')
], splitController.settleUp);

export default router;