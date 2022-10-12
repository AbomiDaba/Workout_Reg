import Workout from '../models/workoutModel.js'
import mongoose from 'mongoose'

// Get all workouts
export const getAllWorkouts = async(req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.json(workouts)
}

// Get a single workout
export const getSingleWorkout =  async(req, res) => {
    const {id} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// POST a new workout
export const postWorkout = async(req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }

    if(!load) {
        emptyFields.push('load')
    }

    if(!reps) {
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in empty fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// UPDATE a workout
export const updateWorkout = async (req, res) => {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }

        const workout = await  Workout.findByIdAndUpdate(id, req.body)
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// DELETE a workout
export const deleteWorkout =  async (req, res) => {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await Workout.findByIdAndDelete(id)
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}





