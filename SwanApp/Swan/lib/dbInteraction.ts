import db from './db';

export const addWorkout = (startTime: number, endTime?: number) => {
    db.runSync(
        `INSERT INTO workouts (workout_start_time, workout_end_time) VALUES (?, ?);`,
        [startTime, endTime ?? null]
    );

    const row = db.getFirstSync<{ workout_id: number }>(
        `SELECT last_insert_rowid() as workout_id;  `
    );

    if (!row) {
        throw new Error("Failed getting last workout ID");
    }

    return row.workout_id;
};

export const addExercise = (exercise_name: string, muscle_group_id: number | null = null) => {
    db.runSync(
        `INSERT INTO exercises (exercise_name, muscle_group_id) VALUES (?, ?)`, [exercise_name, muscle_group_id]
    );
}

export const getAllExercises = (): { exercise_id: number; exercise_name: string }[] => {
    return db.getAllSync<{ exercise_id: number; exercise_name: string }>(
        `SELECT exercise_id, exercise_name FROM exercises`
    );
}