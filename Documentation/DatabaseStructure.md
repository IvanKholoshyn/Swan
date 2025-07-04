# Database Structure

## Tables

Database of the Swan App has the following tables:
    Workouts - lists all the workouts of the user.
    Workout_exercises - lists all the exercised linked to the specified workout.
    Exercises - lists all the exercises that a user uses.
    Muscle_groups - lists all the muscle groups for better navigation through exercises.
    Sets - ists all the sets that the user was doing linked to a specified workout exercise.

## Tables Structures

### Workouts
    workout_id
    time_start
    time_end

### Muscle_group
    muscle_group_id
    muscle_group_name

### Exercises
    exercise_id
    exercise_name
    muscle_group_id

### Workout_exercises
    workout_exercise_id
    workout_id
    exercise_id
    workout_exercise_order

### Sets
    set_id
    workout_exercise_id
    set_order
    repetitions
    weight
