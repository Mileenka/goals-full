import express from 'express';
import goalControllers from '../controllers/goalController.js';

const router = express.Router();

router.get('/', goalControllers.getGoals);

router.post('/', goalControllers.setGoal);

router.put('/:id', goalControllers.updateGoal);

router.delete('/:id', goalControllers.deleteGoal);

export default router;