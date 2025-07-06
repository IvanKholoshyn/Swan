import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { addExercise, getAllExercises } from '@/lib/dbInteraction';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState<
        { exercise_id: number; exercise_name: string }[]
    >([]);
    
    const handleAddExercise = async () => {
        try {
            addExercise('test exercise');
            alert('Added exercise');
            setExercises(getAllExercises());
        } catch (error){
            console.error('Error: ', error);
            alert('Error');
        }
    };

    useEffect(() => {
        const data = getAllExercises();
        setExercises(data);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Exercises Tab</Text>
            <Button title="add exercise" onPress={ handleAddExercise } />
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.exercise_id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.text}>
                        #{item.exercise_id} - {item.exercise_name}
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
    }
});
