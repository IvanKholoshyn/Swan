import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('swan.db');

export const initDB = () => {
    try {
        db.execSync(`
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS workouts (
                workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_start_time INTEGER NOT NULL,
                workout_end_time INTEGER
            );

            CREATE TABLE IF NOT EXISTS muscle_groups (
                muscle_group_id INTEGER PRIMARY KEY AUTOINCREMENT,
                muscle_group_name TEXT
            );

            CREATE TABLE IF NOT EXISTS exercises (
                exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
                exercise_name TEXT,
                muscle_group_id INTEGER,
                FOREIGN KEY (muscle_group_id) REFERENCES muscle_groups(muscle_group_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS workout_exercises (
                workout_exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_id INTEGER NOT NULL,
                exercise_id INTEGER NOT NULL,
                workout_exercise_order INTEGER,
                FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
                FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS sets (
                set_id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_exercise_id INTEGER NOT NULL,
                set_order INTEGER,
                set_repetitions INTEGER,
                set_weight INTEGER,
                FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(workout_exercise_id) ON DELETE CASCADE
            );
        `);
        console.log('Database created succesfully');
    } catch (error) {
        console.error('Failed creating database: ', error);
    }
}
