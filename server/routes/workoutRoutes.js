import express from 'express';
import { deleteWorkout, 
        getAllWorkouts, 
        getSingleWorkout, 
        postWorkout, 
        updateWorkout } from '../controllers/workoutController.js'
import requireAuth from '../middleware/requireAuth.js';

//Require Auth for all workout routes
const router = express.Router()

router.use(requireAuth)

// GET all workouts
router.get('/', getAllWorkouts )

// GET a single workout
router.get('/:id', getSingleWorkout )

// POST a new workout
router.post('/', postWorkout )

// UPDATE a workout
router.put('/:id', updateWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

export default router